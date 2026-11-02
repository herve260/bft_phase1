import type { Request, Response } from 'express';
import crypto from 'node:crypto';
import { env } from '../config/env.js';
import { one, query } from '../config/db.js';
import { HttpError } from '../utils/http-error.js';

const LEARNING_FEE = 50000;

export async function createTrainingCheckout(req: Request, res: Response) {
  if (!env.FLW_SECRET_KEY) throw new HttpError(503, 'Online payments are not configured yet. Please contact the administrator for payment instructions.');
  const userId = Number((req as any).user.id);
  const trainingId = Number(req.params.id);
  const training: any = await one("SELECT id,title FROM training_programs WHERE id=? AND status='PUBLISHED'", [trainingId]);
  if (!training) throw new HttpError(404, 'Training program not found');

  let registration: any = await one('SELECT id,status FROM training_registrations WHERE training_id=? AND user_id=?', [trainingId, userId]);
  if (!registration) {
    const created: any = await one('INSERT INTO training_registrations (training_id,user_id,status) VALUES (?,?,\'PENDING\')', [trainingId, userId]);
    registration = { id: created.insertId, status: 'PENDING' };
  } else if (registration.status === 'CONFIRMED') {
    throw new HttpError(409, 'Your registration is already confirmed.');
  }
  const txRef = `BFT-TR-${registration.id}-${crypto.randomUUID()}`;
  const user: any = await one('SELECT name,email,phone FROM users WHERE id=?', [userId]);
  const response = await fetch('https://api.flutterwave.com/v3/payments', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.FLW_SECRET_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tx_ref: txRef, amount: LEARNING_FEE, currency: 'RWF',
      redirect_url: env.FLW_REDIRECT_URL || `${env.FRONTEND_URL}/payment-result`,
      customer: { email: user.email, name: user.name, phonenumber: user.phone || undefined },
      customizations: { title: 'Build Future Tourism Learning', description: `Registration fee for ${training.title}`, logo: '' },
      meta: { userId, trainingId, registrationId: registration.id }
    })
  });
  const result: any = await response.json().catch(() => ({}));
  if (!response.ok || result.status !== 'success' || !result.data?.link) {
    throw new HttpError(502, result.message || 'The payment provider could not create a checkout session. Please try again.');
  }
  const inserted: any = await one('INSERT INTO training_payments (registration_id,user_id,training_id,amount,currency,tx_ref,status,checkout_url) VALUES (?,?,?,?,?,?,\'PENDING\',?)', [registration.id, userId, trainingId, LEARNING_FEE, 'RWF', txRef, result.data.link]);
  res.status(201).json({ success: true, data: { paymentId: inserted.insertId, txRef, amount: LEARNING_FEE, currency: 'RWF', checkoutUrl: result.data.link } });
}

export async function verifyTrainingCheckout(req: Request, res: Response) {
  if (!env.FLW_SECRET_KEY) throw new HttpError(503, 'Online payments are not configured.');
  const transactionId = String(req.query.transaction_id || '');
  const txRef = String(req.query.tx_ref || '');
  if (!transactionId || !txRef) throw new HttpError(400, 'Missing transaction_id or tx_ref');
  const payment: any = await one('SELECT * FROM training_payments WHERE tx_ref=? AND user_id=?', [txRef, Number((req as any).user.id)]);
  if (!payment) throw new HttpError(404, 'Payment record not found');
  const response = await fetch(`https://api.flutterwave.com/v3/transactions/${encodeURIComponent(transactionId)}/verify`, { headers: { Authorization: `Bearer ${env.FLW_SECRET_KEY}` } });
  const result: any = await response.json().catch(() => ({}));
  const verified = response.ok && result.status === 'success' && result.data?.status === 'successful' && result.data?.tx_ref === txRef && result.data?.currency === 'RWF' && Number(result.data?.amount) >= Number(payment.amount);
  if (!verified) {
    await query("UPDATE training_payments SET status='FAILED',provider_transaction_id=? WHERE id=? AND status='PENDING'", [transactionId, payment.id]);
    return res.status(400).json({ success: false, message: 'Payment could not be verified. Do not retry by sending money manually; contact support if you were charged.' });
  }
  await query("UPDATE training_payments SET status='SUCCESSFUL',provider_transaction_id=? WHERE id=?", [transactionId, payment.id]);
  await query("UPDATE training_registrations SET status='CONFIRMED' WHERE id=?", [payment.registration_id]);
  res.json({ success: true, data: { status: 'SUCCESSFUL', amount: Number(payment.amount), currency: 'RWF' } });
}

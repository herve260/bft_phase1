import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, CircleAlert, LoaderCircle } from 'lucide-react';
import api from '../services/api.js';

export default function PaymentResult() {
  const [params] = useSearchParams();
  const [state, setState] = useState({ loading: true, success: false, message: 'Verifying your payment securely…' });
  useEffect(() => {
    const transactionId = params.get('transaction_id');
    const txRef = params.get('tx_ref');
    if (!transactionId || !txRef) { setState({ loading: false, success: false, message: 'The payment provider did not return enough information to verify this payment.' }); return; }
    api.get('/training/payments/verify', { params: { transaction_id: transactionId, tx_ref: txRef } })
      .then(() => setState({ loading: false, success: true, message: 'Payment verified. Your training registration is now confirmed.' }))
      .catch((error) => setState({ loading: false, success: false, message: error.response?.data?.message || 'We could not verify this payment. Please contact support before trying again.' }));
  }, [params]);
  const Icon = state.loading ? LoaderCircle : state.success ? CheckCircle2 : CircleAlert;
  return <main className="mx-auto flex min-h-[65vh] max-w-2xl items-center justify-center px-4 py-16"><section className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12"><Icon size={52} className={`mx-auto ${state.loading ? 'animate-spin text-green-700' : state.success ? 'text-green-600' : 'text-amber-600'}`} /><h1 className="mt-5 text-3xl font-black">{state.loading ? 'Checking payment' : state.success ? 'Payment confirmed' : 'Payment not confirmed'}</h1><p className="mt-4 leading-7 text-slate-600">{state.message}</p><Link to="/training" className="mt-7 inline-flex rounded-full bg-green-700 px-6 py-3 font-bold text-white">Return to training</Link></section></main>;
}

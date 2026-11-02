import { Router } from "express";
import { listTraining, getTraining, registerTraining, listMyTraining } from "../controllers/training.controller.js";
import { createTrainingCheckout, verifyTrainingCheckout } from '../controllers/training-payment.controller.js';
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();
router.get("/", listTraining);
router.get("/registrations/me", requireAuth, listMyTraining);
router.post("/:id/checkout", requireAuth, createTrainingCheckout);
router.get("/payments/verify", requireAuth, verifyTrainingCheckout);
router.get("/:id", getTraining);
router.post("/:id/register", requireAuth, registerTraining);
export default router;

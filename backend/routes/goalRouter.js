import { Router } from 'express';
const router = Router();
import { getGoals } from '../controllers/goalController.js';

router
.route('/')
.get(getGoals);

export default router;
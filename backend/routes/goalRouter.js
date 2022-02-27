import { Router } from 'express';
const router = Router();
import { postGoal, getGoals, updateGoal, deleteGoal } from '../controllers/goalController.js';
import protect from '../middlewares/authMiddleware.js';

router.route('/').get(protect, getGoals).post(protect, postGoal);
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);
export default router;
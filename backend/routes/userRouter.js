import { Router } from 'express';
const router = Router();
import { registerUser, loginUser, getUser } from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';

router
.route('/register')
.post(registerUser);

router
.route('/login')
.post(loginUser);

router
.route('/getMe')
.get(protect, getUser);

export default router;
import express, { Request, Response } from 'express';
import UserController from '../controller/userController';

const router = express.Router();

// Route for user registration
router.post('/register', UserController.register);

// Route for user login
router.post('/login', UserController.login);

export default router;
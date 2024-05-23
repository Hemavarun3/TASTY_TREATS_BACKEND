import express from 'express'
import { signup } from '../Controllers/userController.js';
import { login } from '../Controllers/userController.js';

const userRouter=express.Router();

userRouter.post('/signup',signup);
userRouter.post('/login',login);

export default userRouter;
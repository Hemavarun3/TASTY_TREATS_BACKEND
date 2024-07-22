import express from 'express'
import { getuserOrders, logout, newToken, signup } from '../Controllers/userController.js';
import { login } from '../Controllers/userController.js';

const userRouter=express.Router();

userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.post('/logout',logout);
userRouter.post('/getuserorders',getuserOrders)
userRouter.post('/newToken',newToken)

export default userRouter;
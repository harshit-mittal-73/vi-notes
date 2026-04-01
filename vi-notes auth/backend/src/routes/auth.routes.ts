import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', authController.registerUserController);
authRouter.post('/login', authController.loginUserController);
authRouter.get('/logout', authController.logoutUserController);


export default authRouter;
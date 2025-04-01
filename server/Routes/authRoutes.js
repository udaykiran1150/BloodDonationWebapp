import express from 'express'
import { Login, Logout, Register } from '../controllers/authControllers.js';

const AuthRouter=express.Router();


AuthRouter.post('/registerdonar',Register);
AuthRouter.post('/loginuser',Login);
AuthRouter.get('/logout',Logout)
export default AuthRouter;
import express from 'express'
import { getWhoLoggedIn, Login, Logout, Register } from '../controllers/authControllers.js';
import {userAuth} from '../middleware/userAuth.js'

const AuthRouter=express.Router();


AuthRouter.post('/registerdonar',Register);
AuthRouter.post('/loginuser',Login);
AuthRouter.get('/logout',userAuth,Logout)
AuthRouter.get('/getcurrentuser',userAuth,getWhoLoggedIn);
export default AuthRouter;
import { Router } from 'express';
import authMiddleware from './app/middlewares/auth'

import sessionController from './app/controllers/SessionController';
import recipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.get('/',(req, res)=>{console.log("teste")});
routes.post('/session', sessionController.store);
routes.post('/teste', recipientController.store);
//routes.use(authMiddleware);

export default routes;

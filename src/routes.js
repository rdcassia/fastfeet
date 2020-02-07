import { Router } from 'express';
import authMiddleware from './app/middlewares/auth'

import sessionController from './app/controllers/SessionController';
import recipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.get('/',(req, res)=>{console.log("teste")});
routes.post('/sessions', sessionController.store);
routes.use(authMiddleware);
routes.post('/recipients', recipientController.store);

export default routes;

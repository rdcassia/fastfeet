import { Router } from 'express';
import authMiddleware from './app/middlewares/auth'

import sessionController from './app/controllers/SessionController';
import recipientController from './app/controllers/RecipientController';
import deliveryController from './app/controllers/DeliveryManController';

const routes = new Router();


routes.post('/sessions', sessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', recipientController.store);

routes.get('/deliverymans', deliveryController.index);
routes.post('/deliverymans', deliveryController.store);

export default routes;

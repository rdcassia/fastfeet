import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryController from './app/controllers/DeliveryManController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);

routes.get('/deliverymans', DeliveryController.index);
routes.post('/deliverymans', DeliveryController.store);
routes.delete('/deliverymans/:id', DeliveryController.delete);
routes.put('/deliverymans/:id', DeliveryController.update);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

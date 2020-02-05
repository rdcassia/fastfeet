import { Router } from 'express';

import UserController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/session', UserController.store);

export default routes;

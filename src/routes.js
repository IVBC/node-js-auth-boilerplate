import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import SessionsController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post(
  '/files/:id/signature',
  upload.single('file'),
  FileController.store
);

/**
 * File
 */
routes.post('/files', upload.single('file'), FileController.store);

routes.post('/sessions', SessionsController.store);

/**
 * users - signup
 */
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.use(authMiddleware);

/**
 * users
 */
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;

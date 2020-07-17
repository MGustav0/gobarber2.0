import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import routes from '@shared/infra/http/routes';

import '@shared/infra/orm';

const app = express();

app.use(cors());

app.use(express.json());

/** Servir arquivos estáticos com uma linha */
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  /** Caso o erro seja uma instância da aplicação, o erro foi originado pela
   * aplicação, um erro conhecido.
   */
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server started on port 3333!`);
});

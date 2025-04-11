import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import errorHandler from './middlewares/error-handler';
import { DB_ADDRESS } from './config';
import routes from './routes';

// Явно преобразуем PORT в число
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express();

async function startServer() {
  try {
    await mongoose.connect(DB_ADDRESS);
    console.log('Connected to MongoDB');

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Routes
    app.get('/crash-test', () => {
      setTimeout(() => {
        throw new Error('Сервер сейчас упадёт');
      }, 0);
    });

    app.use(routes);
    app.use(errors());
    app.use(errorHandler);

    // Запуск сервера
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server started on http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();

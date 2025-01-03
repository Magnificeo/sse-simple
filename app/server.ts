import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import {
  VIEW_ENGINE_NAME,
  VIEW_ENGINE,
  VIEW_DIR,
} from '#app/config/view.js';
import { PORT, HOST } from '#app/config/app.js';
import registerRoutes from '#app/routes/index.js';

const server = express();

/* для шаблонизатора */
server.engine(VIEW_ENGINE_NAME, VIEW_ENGINE);
server.set('views', VIEW_DIR);
server.set('view engine', VIEW_ENGINE_NAME);

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static('public'));

registerRoutes(server);

server.listen(PORT, () => {
  console.log(`Started on ${HOST}`);
});

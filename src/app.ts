// prettier-ignore
import {
  universalErrorHandler,
  addUniversalResponseHeaders,
  fourOhFour,
} from './middleware';
import express, { Express } from 'express';
import morgan from 'morgan';
import chalk from 'chalk';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import routes from './routes';
import connectDB from './db/db';
import * as swaggerDoc from './swagger.json';
import './passport';

const PORT = process.env.PORT;
const app: Express = express();

(async () => {
  await connectDB();

  app
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(
      session({
        secret: process.env.SESSION_SECRET!,
        saveUninitialized: false,
        resave: false,
        store: MongoStore.create({
          client: mongoose.connection.getClient(),
        }),
        cookie: { secure: false },
      })
    )
    .use(passport.initialize())
    .use(passport.session())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
    // .use(addUniversalResponseHeaders)
    .use('/', routes)
    .use(fourOhFour)
    .use(universalErrorHandler);

  const createServerMessage = () => {
    let logMessage = `⚡️[server]: Server is listening on port ${PORT}.`;
    if (process.env.NODE_ENV === 'dev') {
      const url = `http://localhost:${PORT}/api-docs`;
      const link = `\u001b]8;;${url}\u001b\\${url}\u001b]8;;\u001b\\`;
      logMessage += ` | ${chalk.blue(link)}`;
    }
    return logMessage;
  };

  app.listen(PORT, () => console.log(createServerMessage()));
})();

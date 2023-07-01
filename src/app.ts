// prettier-ignore
import {
  universalErrorHandler,
  addUniversalResponseHeaders,
  fourOhFour
} from './middleware';
import express, { Express } from 'express';
import morgan from 'morgan';
import chalk from 'chalk';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import * as swaggerDoc from './swagger.json';
import { initDb } from './db/connect';
import mongodb from 'mongodb';
import connectDB from './db/db';
import passport from 'passport';
import session from 'express-session';
import './passport';

const PORT = process.env.PORT;
const app: Express = express();

app
  .use(morgan('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
  .use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      // cookie: { secure: true }
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(addUniversalResponseHeaders)
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

initDb((err: any, db: mongodb.MongoClient) => {
  if (err) {
    console.log({ err });
  } else {
    app.listen(PORT, () => console.log(createServerMessage()));
  }
});

// (async () => {
//   await connectDB();
//   app.listen(PORT, () => console.log(createServerMessage()));
// })();

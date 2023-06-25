import express, { Express } from 'express';
import morgan from 'morgan';
import chalk from 'chalk';
import mongodb from 'mongodb';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import * as swaggerDoc from './swagger.json';
import { initDb } from './db/connect';
import { universalErrorHandler, addUniversalResponseHeaders, fourOhFour } from './middleware';

const PORT = process.env.PORT;
const app: Express = express();

app
  .use(morgan('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
  .use(addUniversalResponseHeaders)
  .use('/', routes)
  .use(fourOhFour)
  .use(universalErrorHandler);

initDb((err: any, db: mongodb.MongoClient) => {
  if (err) {
    console.log({ err });
  } else {
    let logMessage = `⚡️[server]: Server is listening on port ${PORT}.`;
    if (process.env.NODE_ENV === 'dev') {
      const url = `http://localhost:${PORT}/api-docs`;
      const link = `\u001b]8;;${url}\u001b\\${url}\u001b]8;;\u001b\\`;
      logMessage += ` | ${chalk.blue(link)}`;
    }
    app.listen(PORT, () => console.log(logMessage));
  }
});

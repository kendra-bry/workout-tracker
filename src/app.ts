import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import chalk from 'chalk';
import routes from './routes';

const PORT = process.env.PORT;
const app: Express = express();

app
  .use(morgan('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .use('/', routes);

let logMessage = `⚡️[server]: Server is listening on port ${PORT}.`;
if (process.env.NODE_ENV === 'dev') {
  const url = `http://localhost:${PORT}`;
  const link = `\u001b]8;;${url}\u001b\\${url}\u001b]8;;\u001b\\`;
  logMessage += ` | ${chalk.blue(link)}`;
}
app.listen(PORT, () => console.log(logMessage));

import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import routes from './routes';

const app: Express = express();
const port = process.env.PORT;

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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

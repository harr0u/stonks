import {Request, Response, Express, Router} from 'express';
import usersRoute from './routes/user-routes';
import stonksRoute from './routes/stonks-routes';

import express from 'express';


const PORT: number = 1487;
const app: Express = express();

app.use(express.json())
app.use('/users', usersRoute);
app.use('/stonks', stonksRoute);
app.get('/', (__, response: Response) => {
  response.statusCode = 200;
  response.setHeader('content-type', 'text/html; charset=utf-8');

  // language=HTML
  response.end(`
    <html>
      <body>
        <a href='/users'>Users</a>
        <a href='/stonks'>Stocks</a>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
});
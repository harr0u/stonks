import {Request, Response, Express, Router} from "express";
import usersRoute from './routes/userRoute'

import express from "express";


const PORT: number = 1487;
const app: Express = express();
const router: Router = Router();

app.use('/users', usersRoute);
app.get("/", (__, response: Response) => {
  response.statusCode = 200;
  response.setHeader('content-type', 'text/html; charset=utf-8');

  // language=HTML
  response.end(`
    <html>
      <body>
        <a href="/users">Users</a>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
});
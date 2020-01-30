import {Router, Request, Response, response, request} from "express";
import DummyUsersRepository from '../repos/dummy-users-repository';
import User from '../types/user';
import Repository from "../interfaces/repository";

const router: Router = Router();

const usersRepo: Repository<User> = new DummyUsersRepository();

router.get("/", async (request: Request, response: Response) => {
  try {
    const users = await usersRepo.get();

    response.statusCode = 200;
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(users));
  } catch (err) {
    response.statusCode = 500;
    response.end("Internal server Error :(");
  }
});

router.delete("/:id", async (request: Request, response: Response) => {
  const id = parseInt(request.params.id, 10);

  if (isNaN(id)) {
    response.statusCode = 500;
    response.end('Bad id');
  }
  try {
    await usersRepo.deleteById(id);
  } catch (err) {
    response.statusCode = 404;
    response.end()
  }

  response.statusCode = 200;
  response.end()
});

router.get('/:id', async (request: Request, response: Response) => {
  let user: User;

  const id = parseInt(request.params.id, 10);
  if (isNaN(id)) {
    // Internal Server Error
    response.statusCode = 500;
    response.end('Bad id bruh ');
    return;
  }

  try {
    user = await usersRepo.getById(id);
  } catch (err) {
    // Resource not found
    response.statusCode = 404;
    response.end();
    return;
  }

  // Prosto OK
  response.statusCode = 200;
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(user));
});

router.post('/', async (request: Request, response: Response) => {
  let user: User;
  try{
    user = request.body as User;
  } catch (err) {
    // Wrong Entity
    response.statusCode = 422;
    response.end();
    return;
  }

  try {
    user = await usersRepo.add(user);
  } catch (err) {
    // Conflict
    response.statusCode = 409;
    response.end();
  }

  response.statusCode = 200;
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(user));
});

export default router
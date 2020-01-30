import {Router, Request, Response, response, request} from "express";
import DummyUsersRepository from '../repos/dummyUsersRepository';
import User from '../common/types/user';
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
    response.statusCode = 200;
    response.end()
  } catch (err) {
    response.statusCode = 404;
    response.end()
  }
});

router.get('/:id', async (request: Request, response: Response) => {
  const id = parseInt(request.params.id, 10);
  let user: User;

  if (isNaN(id)) {
    response.statusCode = 500;
    response.end('Bad id');
    return;
  }

  try {
    user = await usersRepo.getById(id);
  } catch (err) {
    response.statusCode = 404;
    response.end();
    return;
  }


  response.statusCode = 200;
  response.setHeader('content-type', 'application/json');

  response.end(JSON.stringify(user));
});

router.post('/', async (request: Request, response: Response) => {
  let user: User;
  try{
    user = JSON.parse(request.body) as User;
    console.log(user)
  } catch (err) {
    response.statusCode = 422;
    response.end();
    return;
  }

  const updatedUser = await usersRepo.add(user);

  response.statusCode = 200;
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(updatedUser));
});

export default router
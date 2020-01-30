import {Router, Request, Response, response, request} from "express";
import {isProdEnv} from '../utils'
import Repository from "../interfaces/repository";

const router: Router = Router();

const defaultCompany = isProdEnv() ? 'IBM' : 'Pornhub';

// STEPS
// none => def
// (CompanyName by User) => NASDAQ unificirovanniy nazvanie
// NASDAQ => принципиально бесплатное апи => price
router.get('/:companyName', async (request: Request, response: Response) => {
  const companyName: string = request.params.companyName || defaultCompany;
  


});
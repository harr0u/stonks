import {Router, Request, Response, response, request} from 'express';
import {isProdEnv} from '../utils';
import StonksAdapter from '../interfaces/stonks-adapter';
import StonksAdapterAlphaVantage from '../integrations/stonks-adapter-alpha-vantage';
import Stonks from '../types/stonks';
import { Maybe, isNone } from '../lib/maybe';
import NasdaqDictionary from '../integrations/nasdaq-dictionary';

const router: Router = Router();

const defaultCompany = isProdEnv() ? 'IBM' : 'Pornhub';

// STEPS
// none => def
// (CompanyName by User) => NASDAQ unificirovanniy nazvanie
// NASDAQ => принципиально бесплатное апи => price
// TODO?: DI container, container.resolveDependencies(StonksAdapterAlphaVantage) шобы так писать¿
const stonksService: StonksAdapter = new StonksAdapterAlphaVantage(new NasdaqDictionary());


// TODO?: There is so much duplicative code
router.get('/current/:company', async (request: Request, response: Response) => {
  console.log(request.params.company);
  const companyName: string = request.params.company || defaultCompany;
  console.log(companyName);
  let stonks: Stonks;

  try {
    stonks = await stonksService.getCurrentStonksByCompanyName(companyName);
  } catch (err) {
    response.statusCode = 404;
    response.end('Try "Google" :(');
    return;
  }

  response.statusCode = 200;
  response.end(JSON.stringify(stonks));
});

router.get('/current/:symbol', async (request: Request, response: Response) => {
  console.log('D');
  const companySymbol: string = request.params.symbol || 'AAPL';
  let stonks: Stonks;

  try {
    stonks = await stonksService.getCurrentStonksByCompanySymbol(companySymbol);
  } catch (err) {
    response.statusCode = 404;
    response.end('Try "GOOG" or something like this :(');
    return;
  }

  response.statusCode = 200;
  response.end(JSON.stringify(stonks));
});

router.get('/:company', async (request: Request, response: Response) => {
  console.log('A');
  const companyName: string = request.params.company || defaultCompany;
  let stonks: Stonks[];

  try {
    stonks = await stonksService.getStonksSeriesByCompanyName(companyName);
  } catch (err) {
    response.statusCode = 404;
    response.end('Try "Google" :(');
    return;
  }

  response.statusCode = 200;
  response.end(JSON.stringify(stonks));
});

router.get('/:symbol', async (request: Request, response: Response) => {
  console.log('B');
  const companySymbol: string = request.params.symbol || 'AAPL';
  let stonks: Stonks[];

  try {
    stonks = await stonksService.getStonksSeriesByCompanySymbol(companySymbol);
  } catch (err) {
    response.statusCode = 404;
    response.end('Try "GOOG" or something like this :(');
    return;
  }

  response.statusCode = 200;
  response.end(JSON.stringify(stonks));
});


export default router;
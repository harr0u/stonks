// Should use wikipedia or other sources
// And provide company NASDAQ for company name
// Apple | Apple inc | apple -> Apple // Wikipedia
//   -> AAPL // https://www.advfn.com/nasdaq/nasdaq.asp?companies=A
// Alphabet -> GOOGL
// ...
import axios from 'axios';
import NasdaqAdapter from '../interfaces/nasdaq-adapter';

export default class NasdaqAdapterParser implements NasdaqAdapter {
  public async findNasdaqSymbolForCompanyName(companyName: string) : Promise<string> {
    throw new Error('Not implemented');

    const url: string = `https://www.advfn.com/nasdaq/nasdaq.asp?companies=${companyName.trim()}`;
    const rawHtml = axios.get(url);

    return Promise.resolve('');
  }
}
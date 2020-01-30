// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=QFR12788HE9WBJ8S'
import {readFileSync} from 'fs';
import Stonks from '../types/stonks';
import http, { IncomingMessage } from 'http';
import {curlGETJson} from '../express-utils';


class StonksService {
  constructor() {
    this.apiPrivateKey = readFileSync('../../../.stronkskey', 'utf-8').toString();
  }

  private readonly apiPrivateKey: string;
  private readonly apiURL: string = 'https://www.alphavantage.co/query';

  private async getStonksSeries(companyName: string): Promise<Stonks[]> {
    const url = this.buildApiURL(companyName);

    const rawJson = await curlGETJson(url);
    console.log(rawJson)

    return Promise.resolve([]);
  }

  private buildApiURL(companyName: string, func?: string): string {
    // make func enum? undefined and default are pretty nice for now for real
    func = func || 'TIME_SERIES_DAILY'
    return `${this.apiURL}?function=${func}&symbol=${companyName}&apikey=${this.apiPrivateKey}`
  }
}

export default StonksService;
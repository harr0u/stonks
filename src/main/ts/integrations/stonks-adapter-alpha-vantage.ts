// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=QFR12788HE9WBJ8S'
import {readFileSync} from 'fs';
import Stonks from '../types/stonks';
import NasdaqAdapter from '../interfaces/nasdaq-adapter';
import StonksAdapter from '../interfaces/stonks-adapter';
import NasdaqDictionary from './nasdaq-dictionary';
import Axios from 'axios';
import { eitherMap, Maybe} from '../lib/maybe';

type RawStonks = {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

export default class StonksAdapterAlphaVantage implements StonksAdapter {
  private readonly nasdaqAdapter: NasdaqAdapter;

  constructor(nasdaqAdapter: NasdaqAdapter) {
    this.nasdaqAdapter = nasdaqAdapter;
    this.apiPrivateKey = readFileSync('.stronkskey', 'utf-8').toString();
  }

  public async getCurrentStonksByCompanyName(companyName: string): Promise<Stonks> {
    return this.getStonksSeriesByCompanyName(companyName).then(this.getCurrentStonksFromSeriesPromise);
  }

  public async getCurrentStonksByCompanySymbol(symbol: string): Promise<Stonks> {
    return this.getStonksSeriesByCompanySymbol(symbol).then(this.getCurrentStonksFromSeriesPromise);
  }

  public async getStonksSeriesByCompanyName(companyName: string): Promise<Stonks[]> {
    let nasdaqSymbol: string;
    try {
      nasdaqSymbol = await this.nasdaqAdapter.findNasdaqSymbolForCompanyName(companyName);
    } catch (err) {
      console.log("Inside StonksAdapterAlphaVantage::getStonksSeries() ~> error = " + err);
      return Promise.reject("Couldn't find company in NASDAQ");
    }

    return await this.getStonksSeriesByCompanySymbol(nasdaqSymbol);
  }

  public async getStonksSeriesByCompanySymbol(symbol: string): Promise<Stonks[]> {
    const url = this.buildApiURL(symbol, 'TIME_SERIES_DAILY');

    const rawDataObject: any = (await Axios.get(url)).data['Time Series (Daily)'];
  
    let resultArray: Stonks[] = [];
    for (const [dateString, valuesDict] of Object.entries<RawStonks>(rawDataObject)) {
      const open = parseFloat(valuesDict["1. open"]),
            high = parseFloat(valuesDict["2. high"]),
            close = parseFloat(valuesDict["3. low"]),
            low = parseFloat(valuesDict["4. close"]),
            volume = parseInt(valuesDict["5. volume"]);

      if (isNaN(open) || isNaN(high) || isNaN(close) || isNaN(low) || isNaN(volume)) {
        continue;
      }

      resultArray.push({date: dateString, open: open, high: high, close: close, low: low, volume: volume});
    }

    return Promise.resolve(resultArray);
  }


  private readonly apiURL: string = 'https://www.alphavantage.co/query';
  private readonly apiPrivateKey: string;

  private buildApiURL(nasdaqSymbol: string, func?: string): string {
    // make func enum? undefined and default are pretty nice for now for real
    func = func || 'TIME_SERIES_DAILY'
    return `${this.apiURL}?function=${func}&symbol=${nasdaqSymbol}&apikey=${this.apiPrivateKey}`;
  }

  private getCurrentStonksFromSeriesPromise(stonks: Stonks[]): Promise<Stonks> {
    return eitherMap(
      this.getCurrentStonksFromSeriesMaybe(stonks),
      (s) => Promise.resolve(s),
      () => Promise.reject('Stonks series is empty')
    )
  }

  private getCurrentStonksFromSeriesMaybe(stonks: Stonks[]): Maybe<Stonks> {
    return stonks.length > 0 ? stonks[0] : undefined;
  }
}

import NasdaqAdapter from '../interfaces/nasdaq-adapter';
import { Maybe, maybeApply, isNone } from '../lib/maybe';
import { eitherMap } from '../lib/maybe';
import { readFileSync } from 'fs';

type KeyValue = {
  key: string,
  value: string
}

export default class NasdaqDictionary implements NasdaqAdapter {
  constructor() {
    this.readyToUseData = [];
    this.loadData();
  }

  private readonly keyValuesFilePath: string = 'nasdaq.keyvalues';
  private readyToUseData: KeyValue[];

  findNasdaqSymbolForCompanyName(companyName: string): Promise<string> {
    const symbolM: Maybe<string> = this.readyToUseData.reduce((symbolM: Maybe<string>, keyValue: KeyValue) => {
      if (isNone(symbolM)) {
        const nameLower: string = companyName.trim().toLowerCase();
        return keyValue.key.includes(nameLower) || nameLower.includes(keyValue.key) ? keyValue.value : undefined;
      } else {
        return symbolM;
      }
    }, undefined);

    return eitherMap(
      symbolM,
      (s) => Promise.resolve(s),
      () => Promise.reject(new Error(`Couldn't find '${companyName}' Company in NASDAQ`))
    );
  }

  private loadDummyData(): void {
    const add = (k: string, v: string) => this.readyToUseData.push({key: k, value: v});

    add('apple', 'AAPL');
    add('apple inc', 'AAPL');
    add('apple co', 'AAPL');

    add('teva pharmaceutical', 'TEVA');
    add('teva', 'TEVA');
    add('amazon', 'AMZN');
    add('amazon.com', 'AMZN');
    add('cleveland biolabs', 'CBLI');
  }

  private loadData(): void {
    let rawData: string;
    try {
      rawData = readFileSync(this.keyValuesFilePath).toString();
    } catch (err) {
      this.loadDummyData();
    }

    // "ABC inc aa->AAAA" => ["abc inc aa", "AAAA"]
    const rawKeyValue2obj: (kv: string) => Maybe<KeyValue> = (kv: string) => {
      const rawArr: string[] = kv.split('->').map((s) => s.trim().toLowerCase());
      if (rawArr.length < 2) {
        return undefined;
      } else {
        return {key: rawArr[0], value: rawArr[1]};
      }
    }

    const data: string[] = rawData.split('\n');

    data.forEach((rawKeyValue) => maybeApply(
      rawKeyValue2obj(rawKeyValue),
      (kv: KeyValue) => this.readyToUseData.push(kv)
    ))
  }
}
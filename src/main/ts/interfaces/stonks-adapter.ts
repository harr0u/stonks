import Stonks from "../types/stonks";

export default interface StonksAdapter {
  getStonksSeriesByCompanyName(companyName: string): Promise<Stonks[]>;
  getStonksSeriesByCompanySymbol(symbol: string): Promise<Stonks[]>;
  getCurrentStonksByCompanyName(companyName: string): Promise<Stonks>;
  getCurrentStonksByCompanySymbol(symbol: string): Promise<Stonks>;
}
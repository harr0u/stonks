export default interface NasdaqAdapter {
  findNasdaqSymbolForCompanyName(companyName: string): Promise<string>;
}
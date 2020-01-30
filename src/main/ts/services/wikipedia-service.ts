import { curlGETJson, curlGETRaw } from "../express-utils";

class WikipediaService {
  public async searchInWikipedia(needle: string, limit?: number): Promise<string[]> {
    const wikipediaURL = `https://ru.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search=${companyName}&namespace=0&limit=${limit}`;

}
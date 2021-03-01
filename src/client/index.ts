import { IPagination, ICharacter } from "../defs/types";

class HttpClient {
  url = "https://rickandmortyapi.com/api";

  /**
   * Fetch the lists of all characters
   *
   * @param page - index of the requested page
   */
  async getCharacters(page: number = 1): Promise<IPagination<ICharacter>> {
    const response = await fetch(`${this.url}/character?page=${page}`);
    return response.json();
  }
}

const httpClient = new HttpClient();

export default httpClient;

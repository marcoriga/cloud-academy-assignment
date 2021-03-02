import { IPagination, ICharacter, IEpisode, ILocation } from "../defs/types";

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

  /**
   * Fetch the details of the given episodes
   *
   * @param ids - ids of the requested episode(s)
   */
  async getEpisodes(ids: number | number[]): Promise<IEpisode | IEpisode[]> {
    const response = await fetch(`${this.url}/episode/${ids}`);
    return response.json();
  }

  /**
   * Get the data of the given location.
   * In input we have the whole url because of Character API response
   *
   * @param url - the url for the location
   */
  async getLocation(url: string): Promise<ILocation> {
    const response = await fetch(url);
    return response.json();
  }
}

const httpClient = new HttpClient();

export default httpClient;

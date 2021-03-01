export declare type Gender = "Female" | "Male" | "Genderless" | "unknown";

export declare type Status = "Alive" | "Dead" | "unknown";

/**
 * Character type
 */
export interface ICharacter {
  id: number;
  name: string;
  created: string;
  episode: string[];
  gender: Gender;
  image: string;
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: Status;
  type: string;
  url: string;
}

/**
 * Paginated API resource
 */
export interface IPagination<T> {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: T[];
}

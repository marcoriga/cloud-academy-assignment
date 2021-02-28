export interface ICharacter {
  id: number;
  name: string;
  created: string;
  episode: string[];
  gender: "Female" | "Male" | "Genderless" | "unknown";
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
  status: "Alive" | "Dead" | "unknown";
  type: string;
  url: string;
}

import { CharactersActionType } from "./actions";
import { ICharacter } from "../defs/character";
import { IPagination } from "../defs/pagination";

type CharactersActions =
  | { type: CharactersActionType.Load; payload: number }
  | { type: CharactersActionType.Success; payload: IPagination<ICharacter> }
  | { type: CharactersActionType.Error };

interface ICharactersState {
  loading: boolean;
  error: boolean;
  currentPage: number;
  pages: number;
  data: ICharacter[] | null;
}

export const initialState: ICharactersState = {
  loading: true,
  error: false,
  currentPage: 1,
  pages: 0,
  data: null,
};

export default function reducer(
  state: ICharactersState,
  action: CharactersActions
) {
  switch (action.type) {
    case CharactersActionType.Load:
      return {
        ...state,
        error: false,
        loading: true,
        currentPage: action.payload,
      };

    case CharactersActionType.Success:
      const {
        results,
        info: { pages },
      } = action.payload;

      return { ...state, loading: false, data: results, pages };

    case CharactersActionType.Error:
      return { ...initialState, loading: false, error: true };

    default:
      return state;
  }
}

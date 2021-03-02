import { CharacterActionType } from "./actions";
import { IEpisode, ILocation } from "../defs/types";

type CharacterActions =
  | { type: CharacterActionType.Load }
  | {
      type: CharacterActionType.Success;
      payload: [ILocation, ILocation, IEpisode[]];
    }
  | { type: CharacterActionType.Error }
  | { type: CharacterActionType.Reset };

interface ICharacterState {
  loading: boolean;
  location: ILocation | null;
  origin: ILocation | null;
  episodes: IEpisode[] | null;
  error: boolean;
}

export const initialState: ICharacterState = {
  loading: false,
  location: null,
  origin: null,
  episodes: null,
  error: false,
};

export default function reducer(
  state: ICharacterState,
  action: CharacterActions
) {
  switch (action.type) {
    case CharacterActionType.Load:
      return {
        ...state,
        error: false,
        loading: true,
      };

    case CharacterActionType.Success:
      return {
        ...state,
        loading: false,
        location: action.payload[0],
        origin: action.payload[1],
        episodes: action.payload[2],
      };

    case CharacterActionType.Error:
      return { ...initialState, loading: false, error: true };

    case CharacterActionType.Reset:
      return { ...initialState };

    default:
      return state;
  }
}

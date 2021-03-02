import { FC, useEffect, useReducer } from "react";

import httpClient from "../../client";

import Characters from "../../components/Characters";
import Container from "../../components/Container";
import ErrorWarning from "../../components/ErrorWarning";
import PageTitle from "../../components/PageTitle";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import Character from "../../containers/Character";

import reducer, { initialState } from "../../reducers/characters";
import { CharactersActionType } from "../../reducers/actions";

const Home: FC = () => {
  const [characters, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchCharacters(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCharacters = (page: number) => {
    dispatch({ type: CharactersActionType.Load, payload: page });

    httpClient
      .getCharacters(page)
      .then((data) =>
        dispatch({ type: CharactersActionType.Success, payload: data })
      )
      .catch(() => dispatch({ type: CharactersActionType.Error }));
  };

  return (
    <Container>
      <PageTitle title="Rick and Morty Characters" />
      {characters.error && <ErrorWarning />}
      {characters.loading ? (
        <Spinner />
      ) : (
        <>
          <Characters>
            {characters.data?.map((item) => (
              <Character key={item.id} data={item} />
            ))}
          </Characters>

          <Pagination
            pages={characters.pages}
            onNavigation={fetchCharacters}
            currentPage={characters.currentPage}
          />
        </>
      )}
    </Container>
  );
};

export default Home;

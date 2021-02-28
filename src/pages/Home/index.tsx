import { FC, useEffect, useState } from "react";
import httpClient from "../../client";
import Character from "../../components/Character";
import Characters from "../../components/Characters";
import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import Pagination from "../../components/Pagination";
import { ICharacter } from "../../defs/character";

const Home: FC = () => {
  const [characters, setCharacters] = useState<ICharacter[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchCharacters(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCharacters = (page: number) => {
    // If there are results, jumping to page start
    // So user can see the list from the beginning
    if (characters?.length) {
      window.scrollTo(0, 0);
    }

    httpClient.getCharacters(page).then((data) => {
      setCharacters(data.results);
      setLoading(false);
      setCurrentPage(page);
      setPages(data.info.pages);
    });
  };

  return (
    <Container>
      <PageTitle title="Rick and Morty Characters" />
      {!loading && (
        <>
          <Characters>
            {characters?.map((item) => (
              <Character key={item.id} data={item} />
            ))}
          </Characters>

          <Pagination
            pages={pages}
            currentPage={currentPage}
            onNavigation={fetchCharacters}
          />
        </>
      )}
    </Container>
  );
};

export default Home;

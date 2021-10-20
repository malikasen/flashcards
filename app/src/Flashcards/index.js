import * as React from "react";
import { useState } from "react";

import useApi from "../auth/useApi";

import Flashcard from "./Flashcard";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const { loading, apiClient } = useApi();

  const loadFlashcards = React.useCallback(
    async () => setFlashcards(await apiClient.getFlashcards()),
    [apiClient],
  );

  React.useEffect(() => {
    !loading && loadFlashcards();
  }, [loading, loadFlashcards]);

  return loading ? null : (
    <>
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} />;
      })}
    </>
  );
};

export default Flashcards;

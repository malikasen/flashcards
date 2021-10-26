import * as React from "react";

import Flashcard from "./Flashcard";

const Flashcards = ({ flashcards }) => {
  return (
    <>
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} />;
      })}
    </>
  );
};

export default Flashcards;

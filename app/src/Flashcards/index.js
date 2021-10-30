import * as React from "react";

import Flashcard from "./Flashcard";

const Flashcards = ({ flashcards }) => {
  return (
    <>
      <h3>
        These cards you haven't learnt yet. Total count:
        {flashcards.filter((flashcard) => flashcard.is_learnt === false).length}
      </h3>
      {flashcards
        .filter((flashcard) => flashcard.is_learnt === false)
        .map((flashcard) => {
          return <Flashcard flashcard={flashcard} />;
        })}
      <h3>
        You have mastered these cards! Total count:
        {flashcards.filter((flashcard) => flashcard.is_learnt === true).length}
      </h3>
      {flashcards
        .filter((flashcard) => flashcard.is_learnt === true)
        .map((flashcard) => {
          return <Flashcard flashcard={flashcard} />;
        })}
    </>
  );
};

export default Flashcards;

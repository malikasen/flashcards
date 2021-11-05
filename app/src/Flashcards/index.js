import * as React from "react";

import Flashcard from "./Flashcard";
import styles from "./styles.module.scss";

const Flashcards = ({ flashcards, loadFlashcards }) => {
  const unlearntFlashcards = flashcards.filter(
    (flashcard) => flashcard.is_learnt === false,
  );
  const learntFlashcards = flashcards.filter(
    (flashcard) => flashcard.is_learnt === true,
  );
  return (
    <>
      <h3>
        These cards you haven't learnt yet. Total count:
        {unlearntFlashcards.length}
      </h3>
      <div className={styles.homepageFlashcardContainer}>
        {unlearntFlashcards.map((flashcard) => {
          return (
            <Flashcard flashcard={flashcard} loadFlashcards={loadFlashcards} />
          );
        })}
      </div>
      <h3>
        You have mastered these cards! Total count:
        {learntFlashcards.length}
      </h3>
      <div className={styles.homepageFlashcardContainer}>
        {learntFlashcards.map((flashcard) => {
          return (
            <Flashcard flashcard={flashcard} loadFlashcards={loadFlashcards} />
          );
        })}
      </div>
    </>
  );
};

export default Flashcards;

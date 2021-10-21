import * as React from "react";
import { useState } from "react";

import useApi from "../auth/useApi";

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

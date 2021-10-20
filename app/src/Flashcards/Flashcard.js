import * as React from "react";

const Flashcard = ({ flashcard }) => {
  return (
    <>
      <div>{flashcard.front_of_card}</div>
      <div>{flashcard.back_of_card}</div>
    </>
  );
};
export default Flashcard;

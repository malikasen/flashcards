import * as React from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import styles from "./styles.module.scss";

const ResultFlashcard = ({ flashcard, apiClient }) => {
  const editIsLearnt = () => {
    apiClient.editIsLearnt(flashcard);
  };
  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        className={flashcard.is_learnt ? styles.greenStack : styles.redStack}
      >
        <div className={styles.sideList}>{flashcard.front_of_card}</div>
        <div className={styles.sideList}>{flashcard.back_of_card}</div>
        {flashcard.is_learnt ? (
          <Button
            variant="contained"
            className={styles.slideButton}
            id={styles.masteredBtn}
            onClick={editIsLearnt}
          >
            Practice more
          </Button>
        ) : (
          <Button
            variant="contained"
            className={styles.slideButton}
            id={styles.practiceMoreBtn}
            onClick={editIsLearnt}
          >
            Mastered
          </Button>
        )}
      </Stack>
    </>
  );
};
export default ResultFlashcard;

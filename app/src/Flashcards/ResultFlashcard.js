import * as React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

import styles from "./styles.module.scss";

const ResultFlashcard = ({ flashcard, flashcardApi }) => {
  const editIsLearnt = () => {
    flashcardApi.editIsLearnt(flashcard);
  };
  return (
    <>
      {/* <Stack
        spacing={2}
        direction="row"
        className={flashcard.is_learnt ? styles.greenStack : styles.redStack}
      > */}
      <Card
        sx={{
          minWidth: 400,
          maxWidth: 400,
          minHeight: 350,
          maxHeight: 350,
          marginLeft: 4,
          marginRight: 4,
          marginBottom: 8,
        }}
      >
        <CardContent>
          <div className={styles.cardContent}>
            <div>
              <h3 className={styles.resultCardFront}>
                {flashcard.front_of_card}
              </h3>
              <p className={styles.resultCardBack}>{flashcard.back_of_card}</p>
            </div>
            <div>
              {flashcard.is_learnt ? (
                <Button
                  variant="contained"
                  className={styles.slideButton}
                  id={styles.masteredBtn}
                  onClick={editIsLearnt}
                >
                  Mark as not learnt
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={styles.slideButton}
                  id={styles.practiceMoreBtn}
                  onClick={editIsLearnt}
                >
                  Mark as learnt
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* </Stack> */}
    </>
  );
};
export default ResultFlashcard;

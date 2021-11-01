import * as React from "react";

import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

import flashcardApiClient from "../apiClient/flashcardApiClient";

import styles from "./styles.module.scss";

const Flashcard = ({ flashcard, loadFlashcards }) => {
  const { flashcardApi } = flashcardApiClient();
  const editIsLearnt = async () => {
    await flashcardApi.editIsLearnt(flashcard);
    loadFlashcards();
  };
  return (
    <>
      <Stack spacing={2} direction="row" className={styles.stack}>
        <div className={styles.sideList}>{flashcard.front_of_card}</div>
        <div className={styles.sideList}>{flashcard.back_of_card}</div>
        <Link to={`edit-card/${flashcard.id}`}>
          <IconButton to="create-edit-card" aria-label="edit the flashcard">
            <EditIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Link>
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
      </Stack>
    </>
  );
};
export default Flashcard;

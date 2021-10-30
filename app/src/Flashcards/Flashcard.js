import * as React from "react";

import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

import useApi from "../auth/useApi";

import styles from "./styles.module.scss";

const Flashcard = ({ flashcard }) => {
  const { apiClient } = useApi();
  const editIsLearnt = () => {
    apiClient.editIsLearnt(flashcard);
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
export default Flashcard;

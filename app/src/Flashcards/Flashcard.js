import * as React from "react";

import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

import flashcardApiClient from "../apiClient/useFlashcardApiClient";

import styles from "./styles.module.scss";

const Flashcard = ({ flashcard, loadFlashcards }) => {
  const { flashcardApi } = flashcardApiClient();
  const editIsLearnt = async () => {
    await flashcardApi.editIsLearnt(flashcard);
    loadFlashcards();
  };
  return (
    <>
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
              <h3 className={styles.homepageCardFront}>
                {flashcard.front_of_card}
              </h3>
              <p className={styles.homepageCardBack}>
                {flashcard.back_of_card}
              </p>
            </div>
            <div>
              <Link to={`edit-card/${flashcard.id}`}>
                <IconButton
                  to="create-edit-card"
                  aria-label="edit the flashcard"
                >
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
            </div>
          </div>
        </CardContent>
      </Card>
      <br></br>
    </>
  );
};
export default Flashcard;

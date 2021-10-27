import * as React from "react";
import { useState, useEffect } from "react";

import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// import { useNavigate } from "react-router-dom";

import useApi from "../auth/useApi";

import styles from "./styles.module.scss";

const EmptySides = ({ cardId, front_of_card, back_of_card }) => {
  const { apiClient } = useApi();
  const [front, setFront] = useState();
  const [back, setBack] = useState();
  const [id, setId] = useState();
  // const navigate = useNavigate();
  useEffect(() => {
    setId(cardId);
    setFront(front_of_card);
    setBack(back_of_card);
  }, [cardId, front_of_card, back_of_card]);
  const deleteCard = async () => {
    await apiClient.deleteFlashcard(id);
    // navigate("/");
    window.location.href = "/";
  };
  const saveCard = async () => {
    const card = {
      id: id,
      front: front,
      back: back,
    };
    await apiClient.saveFlashcard(card);
    window.location.href = "/";
  };
  const saveAndAddCard = () => {
    return apiClient.saveAndAddFlashcard(id, front, back);
  };
  return (
    <>
      <form>
        <Stack spacing={2} direction="row" className={styles.stack}>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={deleteCard}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            startIcon={<SaveAltIcon />}
            onClick={saveCard}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddToPhotosIcon />}
            onClick={saveAndAddCard}
          >
            Save and add more
          </Button>
        </Stack>
        <Stack spacing={2} direction="column" className={styles.stack2}>
          <input
            className={styles.side}
            value={front}
            // placeholder={front}
            onChange={(e) => setFront(e.target.value)}
            required
          ></input>
          <input
            className={styles.side}
            value={back}
            // placeholder={back}
            onChange={(e) => setBack(e.target.value)}
            required
          ></input>
        </Stack>
      </form>
    </>
  );
};
export default EmptySides;

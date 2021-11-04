import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";

import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import DictionarySearch from "./DictionarySearch";
import styles from "./styles.module.scss";

const EmptySides = ({
  cardId,
  front_of_card,
  back_of_card,
  onClickSave,
  onClickSaveAndAddCard,
  onClickDeleteCard,
}) => {
  const [front, setFront] = useState();
  const [back, setBack] = useState();
  const [id, setId] = useState();
  const location = useLocation();

  // const navigate = useNavigate();
  useEffect(() => {
    setId(cardId);
    setFront(front_of_card);
    setBack(back_of_card);
  }, [cardId, front_of_card, back_of_card]);
  // const deleteCard = async () => {
  //   await apiClient.deleteFlashcard(id);
  //   // navigate("/");
  //   window.location.href = "/";
  // };
  const card = useMemo(() => {
    return {
      id,
      front,
      back,
    };
  }, [id, front, back]);
  const onClickSaveWrapper = useCallback(() => {
    onClickSave(card);
  }, [card, onClickSave]);
  const saveAndAddCardWrapper = useCallback(async () => {
    await onClickSaveAndAddCard(card);
    setId("");
    setFront("");
    setBack("");
  }, [card, onClickSaveAndAddCard, setId, setBack, setFront]);
  const deleteCardWrapper = useCallback(() => {
    onClickDeleteCard(id);
  }, [id, onClickDeleteCard]);
  return (
    <div className={styles.emptySidesContainer}>
      {location.pathname === "/new-card" && (
        <DictionarySearch
          front={front}
          setFront={setFront}
          back={back}
          setBack={setBack}
        />
      )}
      <form>
        <Stack spacing={2} direction="row" className={styles.buttonStack}>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={deleteCardWrapper}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            startIcon={<SaveAltIcon />}
            onClick={onClickSaveWrapper}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddToPhotosIcon />}
            onClick={saveAndAddCardWrapper}
          >
            Save and add more
          </Button>
        </Stack>
        <Stack spacing={2} direction="column" className={styles.emptyCardStack}>
          <textarea
            className={styles.emptySide}
            type="text"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="front side information goes here"
            required
          ></textarea>
          <textarea
            className={styles.emptySide}
            type="text"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="back side information goes here"
            required
          ></textarea>
        </Stack>
      </form>
    </div>
  );
};
export default EmptySides;

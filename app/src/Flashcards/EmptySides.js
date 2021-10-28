import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";

import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// import { useNavigate } from "react-router-dom";

import useApi from "../auth/useApi";

import DictionarySearch from "./DictionarySearch";
import styles from "./styles.module.scss";

const EmptySides = ({ cardId, front_of_card, back_of_card, onClickSave }) => {
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
  const card = useMemo(() => {
    return {
      id,
      front,
      back,
    };
  }, [id, front, back]);
  const onClickSaveWrapper = useCallback(() => {
    console.log("inside Save Wrapper");
    onClickSave(card);
  }, [card, onClickSave]);
  const saveAndAddCard = () => {
    return apiClient.saveAndAddFlashcard(id, front, back);
  };
  return (
    <>
      <DictionarySearch />
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
            onClick={onClickSaveWrapper}
            // onClick={saveCard}
            // onClick={editCard}
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

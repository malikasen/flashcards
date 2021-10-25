import * as React from "react";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { NavLink } from "react-router-dom";

import styles from "./styles.module.scss";

const Flashcard = ({ flashcard }) => {
  // const editFlashcard = () => {

  // };
  return (
    <>
      <Stack spacing={2} direction="row" className={styles.stack}>
        <div className={styles.sideList}>{flashcard.front_of_card}</div>
        <div className={styles.sideList}>{flashcard.back_of_card}</div>
        <NavLink to="create-edit-card">
          <IconButton to="create-edit-card" aria-label="edit the flashcard">
            <EditIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </NavLink>
      </Stack>
    </>
  );
};
export default Flashcard;

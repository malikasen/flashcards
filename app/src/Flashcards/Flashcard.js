import * as React from "react";

// import { ModeEdit } from "@mui/icons-material/ModeEdit";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import styles from "./styles.module.scss";

const Flashcard = ({ flashcard }) => {
  return (
    <>
      <Stack spacing={2} direction="row" className={styles.stack}>
        <div className={styles.sideList}>{flashcard.front_of_card}</div>
        <div className={styles.sideList}>{flashcard.back_of_card}</div>
        <IconButton aria-label="edit the flashcard">
          <EditIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Stack>
    </>
  );
};
export default Flashcard;

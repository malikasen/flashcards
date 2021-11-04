import * as React from "react";

import Button from "@mui/material/Button";

import styles from "./styles.module.scss";

const Side = ({ text, toggleSide }) => {
  return (
    <div className={styles.practiceCardContainer}>
      <Button
        variant="outlined"
        size="large"
        className={styles.practiceCard}
        onClick={toggleSide}
      >
        {text}
      </Button>
    </div>
  );
};
export default Side;

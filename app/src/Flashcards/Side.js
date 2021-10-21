import * as React from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import styles from "./styles.module.scss";

const Side = ({ text, toggleSide }) => {
  return (
    <Stack spacing={2} direction="row" className={styles.stack}>
      <Button variant="outlined" size="large" onClick={toggleSide}>
        {text}
      </Button>
    </Stack>
  );
};
export default Side;

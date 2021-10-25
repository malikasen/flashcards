import * as React from "react";
import { useState } from "react";

import Stack from "@mui/material/Stack";

import styles from "./styles.module.scss";

const EmptySides = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  return (
    <Stack spacing={2} direction="column" className={styles.stack2}>
      <input
        className={styles.side}
        value={front}
        onChange={(e) => setFront(e.target.value)}
      ></input>
      <input
        className={styles.side}
        value={back}
        onChange={(e) => setBack(e.target.value)}
      ></input>
    </Stack>
  );
};
export default EmptySides;

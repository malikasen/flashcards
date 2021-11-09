import * as React from "react";

import styles from "./styles.module.scss";

const Side = ({ text, toggleSide }) => {
  return (
    <div className={styles.practiceCardContainer}>
      <button
        variant="outlined"
        size="large"
        className={styles.practiceCard}
        onClick={toggleSide}
      >
        {text}
      </button>
    </div>
  );
};
export default Side;

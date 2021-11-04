import * as React from "react";

import dictionaryApiClient from "../apiClient/useDictionaryApiClient";

import styles from "./styles.module.scss";

const DictionarySearch = ({ front, setFront, back, setBack }) => {
  const { dictionaryApi } = dictionaryApiClient();
  const getDefinition = async (event) => {
    event.preventDefault();
    const result = await dictionaryApi.getDefinition(front);
    setBack(result);
  };
  return (
    <>
      <form onSubmit={getDefinition} className={styles.searchForm}>
        <label htmlFor="definition" className={styles.searchLabel}>
          Check out dictionary definitions
        </label>
        <input
          className={styles.searchField}
          name="defintitionSearch"
          type="text"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder="search for a word"
          required
        ></input>
        <input
          className={styles.searchButton}
          type="submit"
          value="search"
        ></input>
      </form>
    </>
  );
};
export default DictionarySearch;

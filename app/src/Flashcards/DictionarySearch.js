import * as React from "react";
import { useState } from "react";

import useApi from "../auth/useApi";

const DictionarySearch = ({ front, setFront, back, setBack }) => {
  const { apiClient } = useApi();
  const getDefinition = async (event) => {
    event.preventDefault();
    const result = await apiClient.getDefinition(front);
    setBack(result);
  };
  return (
    <>
      <form onSubmit={getDefinition}>
        <input
          type="text"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder="search"
          required
        ></input>
        <input type="submit" value="search"></input>
      </form>
    </>
  );
};
export default DictionarySearch;

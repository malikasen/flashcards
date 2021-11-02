import * as React from "react";

import dictionaryApiClient from "../apiClient/useDictionaryApiClient";

const DictionarySearch = ({ front, setFront, back, setBack }) => {
  const { dictionaryApi } = dictionaryApiClient();
  const getDefinition = async (event) => {
    event.preventDefault();
    const result = await dictionaryApi.getDefinition(front);
    setBack(result);
  };
  return (
    <>
      <form onSubmit={getDefinition}>
        <label htmlFor="definition">Check out dictionary definitions</label>
        <input
          id="definition"
          name="defintitionSearch"
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

import * as React from "react";
import { useState } from "react";

import useApi from "../auth/useApi";

const DictionarySearch = () => {
  const { apiClient } = useApi();
  const [definition, setDefinition] = useState([]);
  const [word, setWord] = useState("");
  const getDefinition = async (event) => {
    event.preventDefault();
    const result = await apiClient.getDefinition(word);
    setDefinition(result);
    setWord("");
  };
  return (
    <>
      <form onSubmit={getDefinition}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="search"
          required
        ></input>
        ;<input type="submit" value="search"></input>
      </form>
      {definition && <div>{definition}</div>}
    </>
  );
};
export default DictionarySearch;

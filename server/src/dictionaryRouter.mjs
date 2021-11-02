import express from "express";
import fetch from "node-fetch";

const router = express.Router();
router.use(express.json());

router.get("/", (request, response) => {
  const word = request.query.word;
  fetch(
    "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" +
      word +
      "?key=" +
      process.env.DICTIONARY_API_KEY,
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return response.json(json[0].shortdef.join("; "));
    })
    .catch((error) => console.log(error));
});

export default router;

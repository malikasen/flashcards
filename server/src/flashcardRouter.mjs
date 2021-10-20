import express from "express";

import * as db from "./db.mjs";

const router = express.Router();

router.get("/", async (request, response) => {
  const flashcards = await db.getFlashcards(request.user.sub);
  response.json(flashcards);
});

router.use(express.json());

export default router;
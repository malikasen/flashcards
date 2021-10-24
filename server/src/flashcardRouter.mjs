import express from "express";

import * as db from "./db.mjs";

const router = express.Router();

router.get("/", async (request, response) => {
  const flashcards = await db.getFlashcards(request.user.sub);
  response.json(flashcards);
});
router.put("/:cardId", async (request, response) => {
  const updatedFlashcard = await db.editIsLearnt(request.params.cardId);
  response.status(201).json(updatedFlashcard);
})

router.use(express.json());

export default router;
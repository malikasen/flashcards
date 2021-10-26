import express from "express";

import * as db from "./db.mjs";

const router = express.Router();

router.get("/", async (request, response) => {
  const flashcards = await db.getFlashcards(request.user.sub);
  response.json(flashcards);
});
router.get("/:cardId", async (request, response) => {
  const flashcard = await db.getFlashcard(request.user.sub, request.params.cardId);
  response.json(flashcard);
});
router.post("/", async (request, response) => {
  params = {
    front: request.body.front,
    back: request.body.back,
  }
  const flashcards = await db.addFlashcard(request.user.sub, params);
  response.json(flashcards);
});
router.put("/:cardId", async (request, response) => {
  const updatedFlashcard = await db.editIsLearnt(request.params.cardId);
  response.status(201).json(updatedFlashcard);
});
router.delete("/:id", async (request, response) => {
  console.log(request);
  const updatedFlashcard = await db.deleteFlashcard(request.params.id);
  response.status(201).json(updatedFlashcard);
});

router.use(express.json());

export default router;
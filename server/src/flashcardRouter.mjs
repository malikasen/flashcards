import express from "express";

import * as db from "./db.mjs";

const router = express.Router();
router.use(express.json());
router.get("/", async (request, response) => {
  const flashcards = await db.getFlashcards(request.user.sub);
  response.json(flashcards);
});
router.get("/:cardId", async (request, response) => {
  const flashcard = await db.getFlashcard(
    request.user.sub,
    request.params.cardId,
  );
  response.json(flashcard);
});
router.post("/", async (request, response) => {
  const params = {
    front: request.body.card.front,
    back: request.body.card.back,
  };
  const newFlashcard = await db.addFlashcard(request.user.sub, params);
  response.json(newFlashcard);
});
router.put("/edit/:cardId", async (request, response) => {
  console.log(request.body);
  const params = {
    id: request.body.card.id,
    front: request.body.card.front,
    back: request.body.card.back,
  };
  const updatedFlashcard = await db.editFlashcard(params);
  response.json(updatedFlashcard);
});
router.put("/:cardId", async (request, response) => {
  const updatedFlashcard = await db.editIsLearnt(request.body.card.id);
  response.status(200).json(updatedFlashcard);
});
router.delete("/:id", async (request, response) => {
  const updatedFlashcard = await db.deleteFlashcard(request.params.id);
  response.status(200).json(updatedFlashcard);
});

export default router;
import dotenv from "dotenv";
import pgp from "pg-promise";

import { DOTENV_FILE } from "./constants.mjs";

const db = initDb();

export const getTasks = (sub) =>
  db.any(
    "SELECT tasks.* FROM tasks LEFT JOIN users on user_id=users.id WHERE sub=$<sub>",
    { sub },
  );

export const getFlashcards = (sub) => 
  db.any(
    "SELECT flashcards.* from flashcards LEFT JOIN users on user_id=users.id WHERE sub=$<sub>",
    { sub },
  )

export const getFlashcard = (sub, cardId) => 
  db.one(
    "SELECT flashcards.* from flashcards LEFT JOIN users on user_id=users.id WHERE sub=$<sub> and flashcards.id=$<cardId>",
    { sub, cardId },
  )

export const addTask = (sub, name) =>
  db.one(
    `INSERT INTO tasks(user_id, name)
      VALUES((SELECT id FROM users WHERE sub=$<sub>), $<name>)
      RETURNING *`,
    { sub, name },
  );

export const addFlashcard = (sub, params) =>
  db.one(
    `INSERT INTO flashcards(user_id, front_of_card, back_of_card)
      VALUES((SELECT id FROM users WHERE sub=$<sub>), $<params.front>, $<params.back>)
      RETURNING *`,
    { sub, params },
  );

export const editFlashcard = (card) =>
  db.one(
    `UPDATE flashcards
      SET front_of_card=$<card.front>, back_of_card=$<card.back>
      WHERE id=$<card.id>
      RETURNING *`,
    { card },
  );

export const editIsLearnt = (cardId) =>
  db.one(
    `UPDATE flashcards
      SET is_learnt=!is_learnt
      WHERE id=$<cardId>
      RETURNING *`,
    { cardId },
  );

export const deleteFlashcard = (cardId) =>
  db.one(
    `DELETE FROM flashcards
      WHERE id=$<cardId>
      RETURNING *`,
    { cardId },
  );

export const addOrUpdateUser = (user) =>
  db.one(
    `INSERT INTO users(given_name, family_name, picture, email, sub)
      VALUES($<given_name>, $<family_name>, $<picture>, $<email>, $<sub>)
      ON CONFLICT (sub) DO
        UPDATE SET given_name = $<given_name>, family_name = $<family_name>,
          picture = $<picture>, email=$<email>
      RETURNING *`,
    user,
  );

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: DOTENV_FILE });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}

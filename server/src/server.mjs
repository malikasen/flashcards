import express from "express";
import mime from "mime-types";

import dictionaryRouter from "./dictionaryRouter.mjs";
import flashcardRouter from "./flashcardRouter.mjs";
import jwtCheck from "./jwtCheck.mjs";
import userRouter from "./userRouter.mjs";

const app = express();

app.use("/api/users", jwtCheck, userRouter);
app.use("/api/flashcards", jwtCheck, flashcardRouter);
app.use("/api/dictionary", jwtCheck, dictionaryRouter);

// Do not comment out or delete this end point. The React development server
// won't start until it pings this end point successfully.
app.get("/api/ping", (request, response) =>
  response.json({ response: "pong" }),
);

if (process.env?.SERVE_REACT?.toLowerCase() === "true") {
  app.use(
    express.static("/app", {
      maxAge: "1d",
      setHeaders: (res, path) =>
        ["application/json", "text/html"].includes(mime.lookup(path)) &&
        res.setHeader("Cache-Control", "public, max-age=0"),
    }),
  );

  app.get("*", (req, res) => {
    res.sendFile("/app/index.html");
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.info(`Example server listening at http://localhost:${port}`);
});

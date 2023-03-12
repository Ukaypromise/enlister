import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import env from "./util/validateEnv";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World");
});

const port = env.PORT || 5000;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });



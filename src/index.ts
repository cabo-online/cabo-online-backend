import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
import { connectDb } from "./lib";
const PORT = process.env.PORT || 5002;

import router from "./routes";

app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

connectDb().then(async () => {
  const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

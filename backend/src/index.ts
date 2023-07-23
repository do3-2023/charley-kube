import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

const dbConfig = {
  host: "postgres-service.db.svc.cluster.local",
  port: 5432,
  database: "kubernetes",
  user: "charley",
  password: "password",
};

const db = new Pool(dbConfig);

app.get("/healthz", async (_, res) => {
  try {
    const client = await db.connect();
    await client.query("SELECT 1");
    client.release();

    const jsonResponse = {
      status: "success",
      message: "Everything is good. The database is reachable!",
    };
    res.status(200).json(jsonResponse);
  } catch (err) {
    console.error("Unable to ping the database:", err);

    const jsonResponse = {
      status: "error",
      message: `API is UP but it's unable to ping the database: ${err.message}`,
    };
    res.status(500).json(jsonResponse);
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));

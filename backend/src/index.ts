import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const db = new Pool(dbConfig);

app.get("/healthz", async (_, res) => {
  try {
    const client = await db.connect();
    await client.query("SELECT 1");
    client.release();

    // Respond with a JSON object indicating success
    const jsonResponse = {
      status: "success",
      message: "Everything is good. The database is reachable!",
    };
    res.status(200).json(jsonResponse);
  } catch (err) {
    console.error("Unable to ping the database:", err);

    // Respond with a JSON object indicating error
    const jsonResponse = {
      status: "error",
      message: `API is UP but it's unable to ping the database: ${err.message}`,
    };
    res.status(500).json(jsonResponse);
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));

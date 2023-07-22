import express from "express";
import { Pool } from "pg"; // Assuming you are using PostgreSQL
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 5000;

// Create a PostgreSQL pool (adjust the connection configuration accordingly)
const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const db = new Pool(dbConfig);

// Health check
app.get("/healthz", async (_, res) => {
  try {
    const client = await db.connect();
    await client.query("SELECT 1"); // Ping the database
    client.release(); // Release the client back to the pool
    res.status(200).send("Everything is good you can reach the database!");
  } catch (err) {
    console.error("Unable to ping the database:", err);
    res.status(500).send(`Unable to ping the database: ${err.message}`);
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));

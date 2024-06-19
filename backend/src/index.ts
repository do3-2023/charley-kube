import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);

const port = 5000;

const dbConfig = {
  host: "localhost",
  port: 5432,
  database: "kubernetes",
  user: "postgres",
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

app.get("/person", async (_, res) => {
  try {
    const client = await db.connect();
    const { rows } = await client.query("SELECT * FROM person");
    client.release();

    res.status(200).json({
      personList: rows,
    });
  } catch (err) {
    console.error("Unable to fetch data from the database:", err);

    res.status(500).json([]);
  }
});

app.post("/random-person", async (req, res) => {
  try {
    const client = await db.connect();
    const cities = [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose",
    ];
    const name = [
      "John",
      "Jane",
      "Alice",
      "Bob",
      "Charlie",
      "David",
      "Eve",
      "Frank",
      "Grace",
      "Heidi",
    ];

    const phone = Math.floor(Math.random() * 10000000);
    const lastName = name[Math.floor(Math.random() * name.length)];
    const location = cities[Math.floor(Math.random() * cities.length)];

    console.log("Adding person:", lastName, phone, location);

    await client.query(
      "INSERT INTO person (last_name, phone_number, location) VALUES ($1, $2, $3)",
      [lastName, phone, location]
    );

    client.release();

    res.status(201).json({ message: "Person added successfully" });
  } catch (err) {
    console.error(`Unable to add data to the database:`, err);

    res.status(500).json({ message: "Unable to add person" });
  }
});

app.delete("/random-person", async (req, res) => {
  try {
    console.log("Deleting random person....");
    const client = await db.connect();
    const { rows } = await client.query("SELECT * FROM person");
    const randomPerson = rows[Math.floor(Math.random() * rows.length)];

    console.log("Deleting person:", randomPerson.last_name);

    await client.query("DELETE FROM person WHERE last_name = $1", [
      randomPerson.last_name,
    ]);

    client.release();

    res.status(200).json({ message: "Person deleted successfully" });
  } catch (err) {
    console.error(`Unable to delete data from the database:`, err);

    res.status(500).json({ message: "Unable to delete person" });
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));

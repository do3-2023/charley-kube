"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configure CORS to allow requests from your frontend
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Update this with the origin of your frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
}));
const port = 5000;
const dbConfig = {
    host: "localhost",
    port: 5432,
    database: "kubernetes",
    user: "postgres",
    password: "password",
};
const db = new pg_1.Pool(dbConfig);
app.get("/healthz", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield db.connect();
        yield client.query("SELECT 1");
        client.release();
        const jsonResponse = {
            status: "success",
            message: "Everything is good. The database is reachable!",
        };
        res.status(200).json(jsonResponse);
    }
    catch (err) {
        console.error("Unable to ping the database:", err);
        const jsonResponse = {
            status: "error",
            message: `API is UP but it's unable to ping the database: ${err.message}`,
        };
        res.status(500).json(jsonResponse);
    }
}));
app.get("/person", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield db.connect();
        const { rows } = yield client.query("SELECT * FROM person");
        client.release();
        res.status(200).json({
            personList: rows,
        });
    }
    catch (err) {
        console.error("Unable to fetch data from the database:", err);
        res.status(500).json([]);
    }
}));
app.post("/random-person", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield db.connect();
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
        yield client.query("INSERT INTO person (last_name, phone_number, location) VALUES ($1, $2, $3)", [lastName, phone, location]);
        client.release();
        res.status(201).json({ message: "Person added successfully" });
    }
    catch (err) {
        console.error(`Unable to add data to the database:`, err);
        res.status(500).json({ message: "Unable to add person" });
    }
}));
app.delete("/random-person", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Deleting random person....");
        const client = yield db.connect();
        const { rows } = yield client.query("SELECT * FROM person");
        const randomPerson = rows[Math.floor(Math.random() * rows.length)];
        console.log("Deleting person:", randomPerson.last_name);
        yield client.query("DELETE FROM person WHERE last_name = $1", [
            randomPerson.last_name,
        ]);
        client.release();
        res.status(200).json({ message: "Person deleted successfully" });
    }
    catch (err) {
        console.error(`Unable to delete data from the database:`, err);
        res.status(500).json({ message: "Unable to delete person" });
    }
}));
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map
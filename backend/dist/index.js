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
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
const dbConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};
const db = new pg_1.Pool(dbConfig);
app.get("/healthz", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield db.connect();
        yield client.query("SELECT 1");
        client.release();
        // Respond with a JSON object indicating success
        const jsonResponse = {
            status: "success",
            message: "Everything is good. The database is reachable!",
        };
        res.status(200).json(jsonResponse);
    }
    catch (err) {
        console.error("Unable to ping the database:", err);
        // Respond with a JSON object indicating error
        const jsonResponse = {
            status: "error",
            message: `API is UP but it's unable to ping the database: ${err.message}`,
        };
        res.status(500).json(jsonResponse);
    }
}));
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map
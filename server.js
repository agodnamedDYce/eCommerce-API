import express from "express";
import cors from "cors";
import bodyParser from "body-parser"; 
import dotenv from "dotenv"; 
import route from "./SRC/routes/index.js";
import connectDB from "./SRC/database/db.js";


dotenv.config();

const app = express();
const PORT = 2000;

app.get("/", (req, res) => {
    res.send('API IS RUNNING');
});

app.listen(PORT, () => {
    console.log(`ecommerce site running on http://localhost:${PORT}`);
});

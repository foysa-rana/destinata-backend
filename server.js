"use strict";
import express from "express";
import dotenv from "dotenv";
import connect from "./db/connectDB.js";
import carRouter from "./router/carRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Destinara Backend");
});

// car routes
app.use("/api/v1/car", carRouter)

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connect(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`server running at http://localhost:${port}`)
        })
    } catch (error) {
        console.error(error.message)
    }
}

start()

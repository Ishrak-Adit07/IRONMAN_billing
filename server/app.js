import express from "express";
import cors from 'cors';
const app = express();

import mongoose from "mongoose";
import { mongodbURL } from "./config.js";

import dotenv from "dotenv";
dotenv.config();

const allowedOrigins = ['http://localhost:8081'];
const options= {
  origin: allowedOrigins
};
app.use(cors(options));
// For parsing json
app.use(express.json());

//Importing the routes
import userRoute from "./routes/user.route.js";
app.use("/api/user", userRoute);

import productRoute from "./routes/product.route.js";
app.use("/api/product", productRoute);

import billRoute from "./routes/bill.route.js";
app.use("/api/bill", billRoute);

//Default URL
app.use("/", (req, res) => {
  res.send("Invalid URL!");
});

export default app;

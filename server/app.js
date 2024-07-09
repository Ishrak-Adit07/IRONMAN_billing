import express from "express";
const app = express();

import mongoose from 'mongoose'
import { mongodbURL } from './config';

import dotenv from 'dotenv';
dotenv.config();

// For parsing json
app.use(express.json());

//Importing the routes
import productRoute from "./routes/product.route.js";
app.use("/api/product", productRoute);

import userRoute from "./routes/user.route.js";
app.use("/api/user", userRoute);

//Default URL
app.use("/", (req, res) => {
  res.send("Invalid URL!");
});

export default app;
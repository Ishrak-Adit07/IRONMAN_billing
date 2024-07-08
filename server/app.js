import express from "express";
const app = express();

import mongoose from 'mongoose'
import { mongodbURL } from './config';

// For parsing json
app.use(express.json());

mongoose
    .connect(mongodbURL, {dbName: "IronmanDB"})
    .then(() =>{
        console.log("App connected to database");
    })
    .catch((err)=>{
        console.log(err);
    });

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

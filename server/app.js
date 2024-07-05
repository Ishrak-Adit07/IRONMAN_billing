import express from 'express'
const app = express();

// For parsing json
app.use(express.json());

import mongoose from 'mongoose'
import { mongodbURL } from './config';

mongoose
    .connect(mongodbURL, {dbName: "postDB"})
    .then(() =>{
        console.log("App connected to database");
    })
    .catch((err)=>{
        console.log(err);
    });

//Importing the routes
import postsRoute from './routes/posts.route';
app.use("/api/post", postsRoute);

import userRoute from './routes/user.route';
app.use("/api/user", userRoute);

//Default URL
app.use("/", (req, res)=>{
    res.send("Invalid URL!");
});

export default app;
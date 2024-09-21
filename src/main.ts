import express, { NextFunction, Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { newPostRouter } from "./routers/post/new";

dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

declare global {
  interface CustomError extends Error {
    status?: number;
  }
}

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
);

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Failed to connect to MongoDB");
  }
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(newPostRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

start();

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./src/routes/product.routes.js";
import Order from "./src/routes/order.routes.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandlers.js";
import {router} from "./src/routes/user.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(errorHandlerMiddleware);


app.use(Product);
app.use(Order);
app.use('/', router);


await mongoose.connect(mongoURI);


app.listen(PORT, () => {
  console.log(`express app is running on ${PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected with db"))
  .catch(err => console.log(err));

app.listen(3000, () => {
  console.log("Server is runing on port 3000");
});

app.use("/api/user", userRoute);
app.use("/auth/user", authRoute);

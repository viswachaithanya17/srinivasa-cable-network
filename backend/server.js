import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import recordRoutes from "./routes/recordRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.json({Health:"Working fine"});
});
app.use("/uploads", express.static("uploads"));
app.use("/api/records", recordRoutes);

app.listen(5000, () => console.log("Server running on 5000"));

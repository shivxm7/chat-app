import express from "express";

// importing routes for authorization
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use("/api/auth", authRoutes);

app.listen(5001, () => {
  console.log("App is listening on PORT 3001");
});

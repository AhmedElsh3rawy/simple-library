import express from "express";
import "dotenv/config";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/v1/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

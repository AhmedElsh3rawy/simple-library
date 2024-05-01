import express from "express";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

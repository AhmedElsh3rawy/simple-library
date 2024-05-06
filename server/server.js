import express from "express";
import cors from "cors";
import "dotenv/config";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import bookRoutes from "./routes/bookRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

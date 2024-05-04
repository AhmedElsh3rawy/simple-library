import express from "express";
import cors from "cors";
import "dotenv/config";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import bookRoutes from "./routes/bookRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";

const app = express();

const PORT = process.env.PORT || 8080;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API with Swagger",
      version: "0.1.0",
      description:
        "A simple Library API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

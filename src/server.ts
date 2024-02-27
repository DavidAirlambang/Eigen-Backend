import express from "express";

// routers
import bookRoutes from "./router/bookRoutes";
import memberRoutes from "./router/memberRoutes";
import loanRoutes from "./router/loanRoutes";
import bodyParser from "body-parser";

// swagger
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/members", memberRoutes);
app.use("/api/v1/loans", loanRoutes);

app.use(express.json());
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

try {
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

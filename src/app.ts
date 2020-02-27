import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";

// Controllers (route handlers)
import * as indexController from "./controllers/index";
import * as merchantDashboardController from "./controllers/merchantDashboard";
import * as createInvoiceController from "./controllers/createInvoice";
import * as userController from "./controllers/user";

const app = express();

// Express configuration
app.set("port", process.env.PORT || 9000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/** In a real-world app, we would NOT use CORS! But for simplicity here, to allow for a response to be
  * sent to the locally-run front-end, we will use CORS.
 */
app.use(cors());
app.use(
  express.static(path.join(__dirname, "dist"))
);

//Primary app routes
app.get("/", indexController.index);
app.post("/user", userController.create);
app.get("/user", userController.getAll);
app.get("/merchant-dashboard/:id", merchantDashboardController.index);
app.post("/invoice", createInvoiceController.create);

export default app;
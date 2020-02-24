import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";

// Controllers (route handlers)
import * as indexController from "./controllers/index";

const app = express();

// Express configuration
app.set("port", process.env.PORT || 9000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/** In a real-world app, we would NOT use CORS! But for simplicity here, to allow for a response to be
  * sent to the locally-run front-end, we will use CORS.
 */
app.use(cors());
app.use(
  express.static(path.join(__dirname, "dist"))
);

//Primary app routes
app.get("/", indexController.index);

export default app;
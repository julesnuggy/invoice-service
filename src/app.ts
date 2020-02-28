import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import session from "express-session";
import okta from "@okta/okta-sdk-nodejs";
import { ExpressOIDC } from "@okta/oidc-middleware";
import dotenv from "dotenv";

// Controllers (route handlers)
import * as indexController from "./controllers/index";
import * as merchantDashboardController from "./controllers/merchantDashboard";
import * as createInvoiceController from "./controllers/createInvoice";
import * as userController from "./controllers/user";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// Okta auth / login setup
const oktaClient = new okta.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_AERARIUM_LOGIN_TOKEN
});

const oidc = new ExpressOIDC({
  appBaseUrl: "http://localhost:3000",
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  redirect_uri: "http://localhost:3000/users/callback",
  scope: "openid profile",
  routes: {
    login: {
      path: "/users/login"
    },
    callback: {
      path: "/users/callback",
      defaultRedirect: "/dashboard"
    }
  }
});

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
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));
app.use(oidc.router);

app.use(({req, res, next}: any) => {
  if (!req?.userinfo) {
    return next();
  }

  oktaClient.getUser(req.userinfo.sub)
    .then((user: any) => {
      req.user = user;
      res.locals.user = user;
      next();
    }).catch((err: any) => {
    next(err);
  });
});


//Primary app routes
app.get("/", indexController.index);
app.post("/user", userController.create);
app.get("/users", userController.getAll);
app.get("/merchant-dashboard/:id", merchantDashboardController.index);
app.post("/invoice", createInvoiceController.create);

export default app;
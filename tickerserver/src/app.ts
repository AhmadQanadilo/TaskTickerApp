import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import "express-async-errors";
import { json } from "body-parser";
import { NotFoundError } from "./errors/NotFoundError";
import { errorHandler } from "./middleware/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import cookieSession from "cookie-session";

dotenv.config();

const app: Express = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({
  signed: false,
}));
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };

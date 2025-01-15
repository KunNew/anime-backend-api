import { Elysia } from "elysia";
import { setupRoutes } from "./routes";
import { middlewares } from "./middlewares";

const app = new Elysia();

const port = process.env.PORT || 8080;

middlewares(app);

setupRoutes(app);

app.listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

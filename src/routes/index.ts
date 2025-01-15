import Elysia from "elysia";
import v1 from "../modules/v1";
import { v1Routes } from "./v1";

export function setupRoutes(app: Elysia) {
  app
    .get(
      "/",
      () => ({
        code: 200,
        message: "",
      }),
      {
        tags: [""],
      }
    )
    .get("/health", async () => "ok", {
      tags: [""],
    });
  // routes
  v1Routes(app);
}

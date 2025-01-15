import swagger from "@elysiajs/swagger";
import Elysia from "elysia";

export function middlewares(app: Elysia) {
  return app.use(
    swagger({
      autoDarkMode: true,
      scalarVersion: "1.25.50",
      documentation: {
        info: {
          title: "anime API",
          version: "1.0.0",
        },
      },
    })
  );
}

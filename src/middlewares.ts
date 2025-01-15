import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { HttpStatusCode } from "elysia-http-status-code";

export const errorHandler = ({ code, httpStatus, error }) => {
  switch (code) {
    case "NOT_FOUND":
      return { code: httpStatus.HTTP_404_NOT_FOUND, message: error.message };
    case "BAD_REQUEST":
      return { code: httpStatus.HTTP_400_BAD_REQUEST, message: error.message };
    case "UNAUTHORIZED":
      return { code: httpStatus.HTTP_401_UNAUTHORIZED, message: error.message };
    case "FORBIDDEN":
      return { code: httpStatus.HTTP_403_FORBIDDEN, message: error.message };
    case "INTERNAL_SERVER_ERROR":
      return {
        code: httpStatus.HTTP_500_INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    default:
      return {
        code: httpStatus.HTTP_500_INTERNAL_SERVER_ERROR,
        message: "Something went wrong",
      };
  }
};

export function middlewares(app: Elysia) {
  return app
    .use(
      swagger({
        autoDarkMode: true,
        scalarVersion: "1.25.50",
        documentation: {
          info: {
            title: "anime API",
            version: "1.0.0",
          },
          tags: [
            {
              name: "v1",
              description: "V1 endpoints provided data from Gogoanime",
            },
          ],
        },
        scalarConfig: {
          layout: "classic",
          spec: {
            url: "/swagger/json",
          },
          theme: "deepSpace",
        },
      })
    )
    .use(HttpStatusCode())
    .onError(errorHandler);
}

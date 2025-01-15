import Elysia from "elysia";
import v1 from "../modules/v1";

export const v1Routes = (app: Elysia) => {
  app.group("/api/v1", (app) =>
    app.get("/popular", async ({ query, set }) => {
      try {
        const data = await v1.popular(
          query.p ? parseInt(query.p) : 1,
          query.limit ? parseInt(query.limit) : 20
        );

        return {
          code: 200,
          message: "success",
          page: data.pageInfo,
          results: data.results,
        };
      } catch (err) {
        set.status = err.code || 500;
        return err;
      }
    })
  );
};

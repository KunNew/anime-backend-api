import Elysia, { t } from "elysia";
import v1 from "../modules/v1";
import { createAnimeId } from "../utils";
import {
  getAnimeEpisodesStream,
  getSearchedAnime,
  scrapeEpisodes,
} from "../utils/amvstrm";

export const v1Routes = (app: Elysia) => {
  app.group("/api/v1", (app) =>
    app
      .get(
        "/trending",
        async ({ query, set }) => {
          try {
            const data = await v1.trending(
              query.p ? parseInt(query.p) : 1,
              query.limit ? parseInt(query.limit) : 20
            );

            const filterOutNotReleasedAnime = data.results.filter(
              (anime) =>
                anime.status !== "NOT_YET_RELEASED" &&
                anime.format !== "SPECIAL"
            );

            const trending = filterOutNotReleasedAnime.map((result) => {
              const animeId = createAnimeId(
                result.title.userPreferred,
                result.title.english,
                result.id
              );

              return { ...result, animeId: animeId };
            });

            return {
              code: 200,
              message: "success",
              page: data.page,
              results: trending,
            };
          } catch (err) {
            set.status = err.code || 500;
            return err;
          }
        },
        {
          query: t.Object({
            p: t.Optional(t.String({ description: "Page number" })),
            limit: t.Optional(
              t.String({ description: "Number of results per page" })
            ),
          }),
          tags: ["v1"],
          detail: {
            description: "Get trending anime from Anilist",
          },
        }
      )
      .get(
        "/popular",
        async ({ query, set }) => {
          try {
            const data = await v1.popular(
              query.p ? parseInt(query.p) : 1,
              query.limit ? parseInt(query.limit) : 20
            );
            return {
              code: 200,
              message: "success",
              page: data.page,
              results: data.results,
            };
          } catch (err) {
            set.status = err.code || 500;
            return err;
          }
        },
        {
          query: t.Object({
            p: t.Optional(t.String({ description: "Page number" })),
            limit: t.Optional(
              t.String({ description: "Number of results per page" })
            ),
          }),
          tags: ["v1"],
          detail: {
            description: "Get popular anime from Anilist",
          },
        }
      )
      .get("/info/:id", async ({ params, query, set }) => {
        try {
          const animeInfo = await v1.animeInfo(params.id);
          if (!animeInfo) {
            set.status = 404;
            return {
              code: 404,
              message: "Not found",
            };
          }

          const animeId = createAnimeId(
            animeInfo.title.userPreferred,
            animeInfo.title.english,
            animeInfo.id
          );
          const animeGogoId = animeInfo.id_provider.idGogo;
          let episodes = [];
          // getting the episodes
          if (animeGogoId) {
            episodes = await scrapeEpisodes(animeGogoId);
          }

          return {
            code: 200,
            message: "success",
            ...animeInfo,
            animeId,
            anime_episodes: episodes.reverse(),
          };
        } catch (err) {
          set.status = err.code || 500;
          return err;
        }
      })
      .get("/stream/:id/:ep", async ({ params, set }) => {
        try {
          const streamingLinks = await getAnimeEpisodesStream(
            params.id,
            parseInt(params.ep)
          );
          if (!streamingLinks) {
            set.status = 404;
            return {
              code: 404,
              message: "Not a streaming episode",
            };
          }
          return streamingLinks;
        } catch (err) {
          set.status = err.code || 500;
          return {
            code: err.code || 500,
            message: err.message || "error",
          };
        }
      })
      .get(
        "/search",
        async ({ query, set }) => {
          const searchAnime = await v1.animeSearch(
            query.q ?? "",
            parseInt(query.p) ?? 1,
            parseInt(query.limit) ?? 20
          );
          if (!searchAnime) {
            set.status = 404;
            return {
              code: 404,
              message: "No searched query found!",
            };
          }
          const anime = searchAnime.results.map((anime) => {
            const animeId = createAnimeId(
              anime.title.userPreferred,
              anime.title.english,
              anime.id
            );
            return { ...anime, animeId };
          });

          return {
            code: 200,
            message: "success",
            page: searchAnime.page,
            results: anime,
          };
        },
        {
          query: t.Object({
            q: t.String({ description: "Search query" }),
            p: t.Optional(t.String({ description: "Page number" })),
            limit: t.Optional(
              t.String({ description: "Number of results per page" })
            ),
          }),
          tags: ["v1"],
          detail: {
            description: "Query anime with Anilist",
          },
        }
      )
  );
};

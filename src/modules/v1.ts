import httpStatus from "http-status";

import {
  getAnimeInfoById,
  getPopularAnime,
  getSearchedAnime,
  getTrendingAnime,
} from "../utils/amvstrm";
import { IAnimeInfo, IPopular, ISearchedAnime, ITrending } from "../types/v1";
import { META } from "@consumet/extensions";
import axios, { AxiosResponse } from "axios";
import { env } from "../utils/env";
import { SearchQ } from "../utils/aniquery";

const meta = new META.Anilist();

const FetchAnilist = axios.create({
  baseURL: env.ANILIST_PROXY,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


const trending = async (p: number, limit: number): Promise<ITrending> => {
  try {
    const data = await getTrendingAnime(p, limit);
    return data;
  } catch (err: any) {
    if (err.response) {
      return {
        code: err.response.status,
        message: httpStatus[`${err.response.status}_MESSAGE`] || err.message,
      } as any;
    }
    throw err;
  }
};

const popular = async (p: number, limit: number): Promise<IPopular> => {
  try {
    const data = await getPopularAnime(p, limit);

    return data;
  } catch (err: any) {
    if (err.response) {
      return {
        code: err.response.status,
        message: httpStatus[`${err.response.status}_MESSAGE`] || err.message,
      } as any;
    }
    throw err;
  }
};
const animeInfo = async (id: string): Promise<IAnimeInfo> => {
  try {
    const animeInfo = await getAnimeInfoById(id as string);


    return animeInfo;
  } catch (err) {
    if (err.response || err.response.data) {
      return {
        code: err.response.status,
        message: httpStatus[`${err.response.status}_MESSAGE`] || err.message,
      } as any;
    }
    throw err;
  }
};
const animeSearch = async (
  query: string,
  page: number,
  limit: number
): Promise<ISearchedAnime> => {
  try {
    const { data }: AxiosResponse<{ data: { Page: any } }> =
      await FetchAnilist.post("", {
        query: SearchQ(),
        variables: {
          search: query,
          page: page,
          size: limit,
          type: "ANIME",
        },
      });
    return {
      code: 200,
      message: "success",
      page: data.data.Page.pageInfo,
      results: data.data.Page.media,
    };
  } catch (err) {
    if (err.response) {
      return {
        code: err.response.status,
        message: httpStatus[`${err.response.status}_MESSAGE`] || err.message,
      } as any;
    }
    throw err;
  }
};
export default {
  trending,
  popular,
  animeInfo,
  animeSearch,
};

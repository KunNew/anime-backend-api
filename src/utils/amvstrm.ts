import axios from "axios";
import httpStatus from "http-status";
import { Episode, IAnimeInfo, IPopular, ISearchedAnime, ITrending } from "../types/v1";
import { env } from "./env";

const baseUrl: string = env.BACKEND_URL;

export const getTrendingAnime = async (page: number, limit: number) => {
  try {
    const { data } = await axios.get(
      baseUrl + `/trending?limit=${limit}&p=${page}`,
      {
        headers: { Accept: "application/json" },
      }
    );
    return data as ITrending;
  } catch (err: any) {
    if (err.response || err.response.data) {
      return {
        code: err.response.status,
        message: httpStatus[`${err.response.status}_MESSAGE`] || err.message,
      } as any;
    }
    throw err;
  }
};


export const getPopularAnime = async (page: number, limit: number) => {
  try {
    const { data } = await axios.get(
      baseUrl + `/popular?limit=${limit}&p=${page}`,
      {
        headers: { Accept: "application/json" },
      }
    );
    return data as IPopular;
  } catch (err: any) {
    if (err.response || err.response.data) {
      return {
        code: err.response.status,
        message: httpStatus[`${err.response.status}_MESSAGE`] || err.message,
      } as any;
    }
    throw err;
  }
};

/**
 * A helper function to get the information about the anime. it take only one parameter which is the anilist id and returns the information about the anime.
 * @param id anilist id should be numeric but in string format. eg: 21,
 * @returns information related to the anime as AnimeInfo.
 */
export const getAnimeInfoById = async (id: string) => {
  try {
  
    
    // const { data } = await axios.get(baseUrl + `/info/${id}`);
    const response = await fetch(baseUrl + `/info/${id}`);
    const data = await response.json();

    
    return data as IAnimeInfo;
  } catch (err) {
  
    
    throw err;
  }
};

export const scrapeEpisodes = async (id: string): Promise<Episode[]> => {
  try {
    const { data } = await axios.get(
      `${env.BASE_BACKEND_URL}/api/v1/episode/${id}`
    );
    return data.episodes;
  } catch (error) {
    throw error;
  }
};

export const getAnimeEpisodesStream = async (id: string, ep: number) => {
  try {
    const streamUrl: string = process.env.CONSUMET_URL as string;
    // const { data } = await axios.get(baseUrl + `/stream/${id}`, {
    //   headers: { Accept: "application/json" },
    // });
    const { data } = await axios.get(baseUrl + `/stream/${id}/${ep}`, {
      headers: {
        Accept: "application/json",
      },
    });

    return data;
  } catch (error) {
    throw Error;
  }
};

export const getSearchedAnime = async (
  query: string,
  page: number,
  limit: number
) => {
  try {
    const { data } = await axios.get(
      baseUrl + `/search?q=${query}&p=${page}&limit=${limit}`,
      {
        headers: { Accept: "application/json" },
      }
    );
    return data as ISearchedAnime;
  } catch (error) {
    throw error;
  }
};

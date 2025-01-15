import httpStatus from "http-status";
import { AnimeResult } from "../types/v1";
import { getPopularAnime } from "../utils/amvstrm";

const popular = async (p: number, limit: number): Promise<AnimeResult> => {
  try {
    const data = await getPopularAnime(p, limit);
    return {
      pageInfo: data.pageInfo,
      results: data.results,
    };
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

export default {
  popular,
};

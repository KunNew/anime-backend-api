import axios from "axios";
import httpStatus from "http-status";
import { AnimeResult } from "../types/v1";

const baseUrl: string = process.env.BACKEND_URL as string;

// base backend url
const BASE_BACKEND_URL: string = process.env.BASE_BACKEND_URL as string;

export const getPopularAnime = async (
  limit: number,
  page: number
): Promise<AnimeResult> => {
  try {
    const { data } = await axios.get(
      baseUrl + `/popular?limit=${limit}&p=${page}`
    );
    return data;
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

import axios from "axios";
import httpStatus from "http-status";
import { IPopular } from "../types/v1";
import { env } from "./env";

const baseUrl: string = env.BACKEND_URL;

export const getPopularAnime = async (
  limit: number,
  page: number
): Promise<IPopular> => {
  try {
    const { data } = await axios.get(
      baseUrl + `/popular?limit=${limit}&p=${page}`,
      {
        headers: { Accept: "application/json" },
      }
    );
console.log('datadata',data);

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

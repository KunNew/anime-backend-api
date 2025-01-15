import httpStatus from "http-status";

import { getPopularAnime } from "../utils/amvstrm";
import { IPopular } from "../types/v1";

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

export default {
  popular,
};

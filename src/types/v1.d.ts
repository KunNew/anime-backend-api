
export type ITitle = {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
};


export type IPage = {
  total: number;
  perPage: number;
  lastPage: number;
  currentPage: number;
  hasNextPage: boolean;
};


export type ITag = {
  id: number;
  name: string;
};

export type IPopular = {
  code: number;
  message: string;
  page: IPage;
  results: IAnime[];
};

export type ICoverImage = {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
};

export type INextAiringEpisode = {
  airingAt: number;
  timeUntilAiring: number;
  episode: number;
};

export type IAnime = {
  animeId: string;
  id: string;
  malId: number;
  title: ITitle;
  image: string;
  description: string;
  status: string;
  cover: string;
  rating: number;
  releaseData: number;
  color: string;
  genres: string[];
  totalEpisodes: number;
  duration: number;
  type: string;
  tags: ITag[];
  format: string;
  bannerImage: string;
  coverImage: ICoverImage;
  season: string;
  seasonYear: number;
  averageScore: number;
  nextAiringEpisode: INextAiringEpisode;
};

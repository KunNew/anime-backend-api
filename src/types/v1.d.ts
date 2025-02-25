
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

export type IDate = {
  year: number;
  month: number;
  day: number;
};

export type IProvider = {
  idGogo: string;
  idGogoDub: string;
  idZoro: string;
  idPahe: string;
};

export type ITrending = {
  code: number;
  message: string;
  page: IPage;
  results: IAnime[];
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

export type IScore = {
  averageScore: number;
  decimalScore: number;
};

export type IStudios = {
  name: string;
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


export type IAnimeInfo = {
  bannerImage: string;
  coverImage: ICoverImage;
  description: string;
  dub: boolean;
  duration: number;
  endIn: IDate;
  episodes: number;
  format: string;
  genres: string[];
  id: string;
  id_provider: IProvider;
  nextair: INextAiringEpisode;
  popularity: number;
  relation: IAnime[];
  season: string;
  siteUrl: string;
  studios: IStudios[];
  tags: ITag[];
  title: ITitle;
  year: number;
  score: IScore;
};

interface Episode {
  episodeNumber: number;
  episodeId: string;
}

export type ISearchedAnime = {
  code: number;
  message: string;
  page: IPage;
  results: IAnime[];
};
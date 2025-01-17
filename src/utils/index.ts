export const createAnimeId = (
    userPreferred: string,
    english: string,
    id: string
  )  => {
    const animeId =
      (userPreferred.toLowerCase().replace(/[?!&]/g, "").split(" ").join("-") ??
        english.toLowerCase().replace(/[?!&]/g, "").split(" ").join("-")) +
      "-" +
      id;
  
    return animeId as string;
  }
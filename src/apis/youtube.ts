import axios from "axios";

const API_KEY = "AIzaSyDEactWivViYG_5AMhKe0ySg_jvR3smw8w";

export const getVideosInfo = async (
  videoIds: string[]
): Promise<any | null> => {
  try {
    const videoIdsInString = videoIds?.toString();
    const response = await axios.get("videos", {
      baseURL: "https://www.googleapis.com/youtube/v3/",
      params: {
        part: "snippet",
        key: API_KEY,
        id: videoIdsInString,
      },
    });
    const videosInfo = response.data;
    return videosInfo;
  } catch (err) {
    throw new Error(err);
  }
};

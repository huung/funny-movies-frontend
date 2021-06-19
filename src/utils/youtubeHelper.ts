import { VideoData } from "../defines/video";
import _ from "lodash";

export const getYoutubeVideoIdFromUrl = (url: string): string => {
  var p =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return url.match(p) ? RegExp.$1 : "";
};

export const convertVideoInfo = (
  res: any,
  videoIdSharerMap: Pick<VideoData, "videoId" | "sharer">[]
): VideoData[] | null => {
  if (!res || !res.items) return null;

  const videoData = res.items.map((item: any): VideoData => {
    const data = {
      videoId: "",
      videoYoutubeId: item.id,
      title: item.snippet.title,
      sharer: "",
      description: item.snippet.description,
      votes: [],
    };
    return data;
  });
  return _.merge([], videoData, videoIdSharerMap);
};

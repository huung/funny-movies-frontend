import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@apollo/client";
import Container from "@material-ui/core/Container";

import { Video, VideoData } from "../defines/video";
import { getVideosInfo } from "../apis/youtube";
import {
  getYoutubeVideoIdFromUrl,
  convertVideoInfo,
} from "../utils/youtubeHelper";
import { FETCH_VIDEOS_QUERY } from "../defines/graphql";
import VideoList from "../components/VideoList";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Home(): React.ReactElement {
  const { loading, data } = useQuery(FETCH_VIDEOS_QUERY);

  const [videosData, setVideosData] = useState<VideoData[] | null>(null);

  const videoIds = useMemo((): string[] => {
    const videos: Video[] = data?.getVideos;
    return videos?.map((video) => getYoutubeVideoIdFromUrl(video.url));
  }, [data]);

  const videoIdSharerMap = useMemo((): Pick<
    VideoData,
    "videoId" | "sharer"
  >[] => {
    const videos: Video[] = data?.getVideos;
    return videos?.map((video) => {
      const abc = {
        videoId: video.id,
        videoYoutubeId: getYoutubeVideoIdFromUrl(video.url),
        sharer: video.email,
        votes: video.votes,
      };
      return abc;
    });
  }, [data]);

  const fetchVideosData = useCallback(async (): Promise<void> => {
    if (videoIds) {
      try {
        let res = await getVideosInfo(videoIds);
        console.log("data", convertVideoInfo(res, videoIdSharerMap));
        setVideosData(convertVideoInfo(res, videoIdSharerMap));
      } catch (err) {
        console.error("Fetching video data error:", err);
        return;
      }
    }
  }, [videoIds, videoIdSharerMap]);

  useEffect(() => {
    fetchVideosData();
  }, [fetchVideosData]);

  return (
    <Container maxWidth="lg">
      {loading || videosData === null ? (
        <LoadingOverlay show={true} />
      ) : (
        <VideoList videosData={videosData} />
      )}
    </Container>
  );
}

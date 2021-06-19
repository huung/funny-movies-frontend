import React, { useState, useEffect, useCallback, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import Container from "@material-ui/core/Container";

import { Video, VideoData } from "../defines/video";
import { getVideosInfo } from "../apis/youtube";
import {
  getYoutubeVideoIdFromUrl,
  convertVideoInfo,
} from "../utils/youtubeHelper";

import VideoList from "../components/VideoList";

const FETCH_VIDEOS_QUERY = gql`
  {
    getVideos {
      id
      url
      createdAt
      email
      votes {
        email
        status
      }
    }
  }
`;

export default function Home(): React.ReactElement {
  const { loading, data } = useQuery(FETCH_VIDEOS_QUERY);

  let [videosData, setVideosData] = useState<VideoData[] | null>(null);

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
        videoId: getYoutubeVideoIdFromUrl(video.url),
        sharer: video.email,
      };
      return abc;
    });
  }, [data]);

  const fetchVideosData = useCallback(async (): Promise<void> => {
    if (videoIds) {
      try {
        let res = await getVideosInfo(videoIds);
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
      {loading ? <h1>Loading... Please wait...</h1> : <></>}
      <VideoList videosData={videosData} />
    </Container>
  );
}

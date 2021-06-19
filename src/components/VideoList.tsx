import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";

import { VideoData } from "../defines/video";
import VideoCard from "./VideoCard";

const useStyles = makeStyles(() => ({
  videoListContainer: {
    paddingLeft: 80,
    paddingRight: 80,
  },
  videoList: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

interface VideoListProps {
  videosData: VideoData[] | null;
}

export default function VideoList(props: VideoListProps): React.ReactElement {
  const classes = useStyles();

  const { videosData } = props;

  return (
    <div className={classes.videoListContainer}>
      <Grid container className={classes.videoList}>
        {videosData &&
          videosData.map((video: VideoData) => (
            <VideoCard key={video.videoId} data={video} />
          ))}
      </Grid>
    </div>
  );
}

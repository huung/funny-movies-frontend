import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";

import { VideoData } from "../defines/video";
import VideoPlayer from "./VideoPlayer";
import ThumbButtons from "./ThumbButtons";

const useStyles = makeStyles(() => ({
  videoCard: {
    marginTop: 35,
    marginBottom: 35,
  },
  infoSection: {
    paddingLeft: 50,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
    marginBottom: 25,
  },
  sharer: {
    fontSize: 14,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
}));

export interface VideoCardProps {
  data: VideoData;
}

export default function VideoCard(props: VideoCardProps): React.ReactElement {
  const classes = useStyles();

  const {
    data: { videoId, videoYoutubeId, title, sharer, description, votes },
  } = props;

  return (
    <Grid container className={classes.videoCard}>
      <Grid container item xs={6}>
        <VideoPlayer videoId={videoYoutubeId} />
      </Grid>
      <Grid container item xs={6} className={classes.infoSection}>
        <div className={classes.title}>{title}</div>
        <div className={classes.sharer}>Shared by: {sharer}</div>
        <div className={classes.sharer}>
          <ThumbButtons videoId={videoId} votes={votes} />
        </div>
        <div className={classes.description}>
          Description:{" "}
          <div>
            {_.truncate(description, {
              length: 400,
              omission: "...",
            })}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

import React from "react";
import Container from "@material-ui/core/Container";
import YouTube from "react-youtube";

interface VideoPlayerProps {
  videoId: string;
}

const opts = {
  width: "500",
  height: "300",
};

export default function VideoPlayer(
  props: VideoPlayerProps
): React.ReactElement {
  const { videoId } = props;

  const _onReady = (event: any): void => {
    event.target.pauseVideo();
  };

  return (
    <Container maxWidth="lg">
      <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
    </Container>
  );
}

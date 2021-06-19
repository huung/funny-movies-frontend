import React, { useState, useContext, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { Vote } from "../defines/video";
import { VOTE_VIDEO_MUTATION } from "../defines/graphql";

const useStyles = makeStyles(() => ({
  buttonsContainer: {
    width: "100%",
    display: "flex",
  },
  space: {
    width: 50,
  },
  likeIconContainer: {
    "&:hover $icon": {
      color: "green",
    },
  },
  dislikeIconContainer: {
    "&:hover $icon": {
      color: "red",
    },
  },
  icon: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  upButton: {
    color: "green",
  },
  downButton: {
    color: "red",
  },
}));

interface ThumbButtonsProps {
  votes: Vote[];
  videoId: any;
}

export default function ThumbButtons(
  props: ThumbButtonsProps
): React.ReactElement {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const { videoId, votes } = props;

  const [buttonStatus, setButtonStatus] = useState<string>("none");
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);

  const [voteVideo] = useMutation(VOTE_VIDEO_MUTATION, {
    variables: { videoId: videoId, status: buttonStatus },
  });

  const onThumbButtonClicked = (event: React.MouseEvent<HTMLElement>): void => {
    if (!user || !user.email) return;

    let newStatus = "";
    if (event.currentTarget.id === "like") {
      newStatus = buttonStatus === "up" ? "none" : "up";
    }
    if (event.currentTarget.id === "dislike") {
      newStatus = buttonStatus === "down" ? "none" : "down";
    }
    setButtonStatus(newStatus);
    setIsButtonPressed(true)
  };

  useEffect(() => {
    if (user && votes) {
      const foundVote = votes.find((vote) => vote.email === user.email);
      if (foundVote) {
        const voteStatus = foundVote.status;
        switch (voteStatus) {
          case "up":
            setButtonStatus("up");
            break;
          case "down":
            setButtonStatus("down");
            break;
          default:
            break;
        }
      }
    }
  }, [votes, user]);

  useEffect(() => {
    if (isButtonPressed) {
      voteVideo()
    }
  }, [buttonStatus, voteVideo, isButtonPressed]);

  return (
    <div className={classes.buttonsContainer}>
      <IconButton
        id="like"
        aria-label="Like"
        classes={{
          root: classes.likeIconContainer,
        }}
        onClick={onThumbButtonClicked}
      >
        <ThumbUpIcon
          className={`${classes.icon} ${buttonStatus === "up" ? classes.upButton : ""
            } `}
        />
      </IconButton>
      <div className={classes.space}></div>
      <IconButton
        id="dislike"
        aria-label="Dislike"
        classes={{
          root: classes.dislikeIconContainer,
        }}
        onClick={onThumbButtonClicked}
      >
        <ThumbDownIcon
          className={`${classes.icon} ${buttonStatus === "down" ? classes.downButton : ""
            } `}
        />
      </IconButton>
    </div>
  );
}

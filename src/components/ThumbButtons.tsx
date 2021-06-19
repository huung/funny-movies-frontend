import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

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
}));

interface ThumbButtonsProps {}

export default function ThumbButtons(
  props: ThumbButtonsProps
): React.ReactElement {
  const classes = useStyles();

  //   const {} = props;

  const onThumbButtonClicked = (event: React.MouseEvent<HTMLElement>) => {
    console.log("id:", event.currentTarget.id);
  };

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
        <ThumbUpIcon className={classes.icon} />
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
        <ThumbDownIcon className={classes.icon} />
      </IconButton>
    </div>
  );
}

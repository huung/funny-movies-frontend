import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

interface LoadingOverlayProps {
  show: boolean;
}

export default function LoadingOverlay(
  props: LoadingOverlayProps
): React.ReactElement {
  const classes = useStyles();

  const { show } = props;

  return (
    <Backdrop className={classes.backdrop} open={show}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

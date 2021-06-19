import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

import { AuthContext } from "../context/auth";
import { getYoutubeVideoIdFromUrl } from "../utils/youtubeHelper";
import { FETCH_VIDEOS_QUERY, SHARE_VIDEO_MUTATION } from "../defines/graphql";
import LoadingOverlay from "../components/LoadingOverlay";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    shareContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    shareBox: {
      minHeight: 300,
      width: "100%",
      border: "1px solid grey",
      flexDirection: "column",
    },
    inputSection: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 75,
      marginBottom: 50,
    },
    input: {
      width: "100%",
    },
    shareButton: {
      padding: "8px 24px",
    },
    buttonSetion: {
      justifyContent: "center",
      alignSelf: "center",
    },
  })
);

export default function Share(): React.ReactElement {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(event.target.value);
  };

  const onUrlSubmit = (event: React.MouseEvent) => {
    if (getYoutubeVideoIdFromUrl(url) === "") {
      enqueueSnackbar("URL is not a valid YouTube URL", {
        variant: "error",
      });
    } else shareVideo();
  };

  const [shareVideo, { loading: shareLoading }] = useMutation(
    SHARE_VIDEO_MUTATION,
    {
      variables: { url: url },
      update(proxy, result) {
        const data: any = proxy.readQuery({
          query: FETCH_VIDEOS_QUERY,
        });

        let updatedData = [...data.getVideos];
        updatedData = [result.data.shareVideo, ...updatedData];
        proxy.writeQuery({
          query: FETCH_VIDEOS_QUERY,
          data: {
            ...data,
            getVideos: {
              updatedData,
            },
          },
        });
        setUrl("");
        history.push("/");
        enqueueSnackbar("Video shared successfully!", {
          variant: "success",
        });
      },
      onError(err) {
        if (err?.graphQLErrors[0]?.message)
          setError(err.graphQLErrors[0].message);
        else {
          console.error("Error: ", err);
          enqueueSnackbar("Share video failed", {
            variant: "error",
          });
        }
      },
    }
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
    }
  }, [error, enqueueSnackbar]);

  return (
    <Container maxWidth="lg">
      <LoadingOverlay show={shareLoading} />
      {user && (
        <Grid container className={classes.shareContainer}>
          <Grid item xs={6}>
            <h1>Share a YouTube video</h1>
          </Grid>
          <Grid container item xs={6} className={classes.shareBox}>
            <Grid container item xs={12} className={classes.inputSection}>
              <Grid item xs={3}>
                YouTube URL:
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="url"
                  size="small"
                  type="url"
                  InputProps={{
                    className: classes.input,
                  }}
                  value={url}
                  onChange={onUrlChange}
                />
              </Grid>
            </Grid>
            <Grid container item xs={4} className={classes.buttonSetion}>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                className={classes.shareButton}
                onClick={onUrlSubmit}
              >
                Share
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

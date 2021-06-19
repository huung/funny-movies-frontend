import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import {
  LOGIN_USER_MUTATION,
  REGISTER_USER_MUTATION,
} from "../defines/graphql";
import LoadingOverlay from "../components/LoadingOverlay";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topMenu: {
      borderBottom: "2px solid black",
      paddingTop: 15,
      paddingBottom: 15,
      marginBottom: 50,
    },
    title: {
      cursor: "pointer",
    },
    titleText: {
      display: "flex",
      alignItems: "center",
      fontSize: 40,
      marginLeft: 10,
    },
    authSection: {
      alignItems: "center",
      justifyContent: "flex-end",
    },
    marginLeft25: {
      marginLeft: 25,
    },
    button: {
      padding: "8px 12px",
    },
    shareButton: {
      padding: "8px 24px",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

type Errors = { [key: string]: string };

export default function TopMenu(): React.ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const context = useContext(AuthContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [registerUser, { loading: registerLoading }] = useMutation(
    REGISTER_USER_MUTATION,
    {
      update(_, result) {
        context.login(result.data.register);
        setErrors(null);
      },
      onError(err) {
        setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
      variables: values,
    }
  );

  const [loginUser, { loading: loginLoading }] = useMutation(
    LOGIN_USER_MUTATION,
    {
      update(_, result) {
        context.login(result.data.login);
        setErrors(null);
      },
      onError(err) {
        const errors = err?.graphQLErrors[0]?.extensions?.errors;
        if (errors.general === "User not found") registerUser();
        else setErrors(errors);
      },
      variables: values,
    }
  );

  const onSubmit = (event: React.MouseEvent) => {
    loginUser();
  };

  const onTitleClicked = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    history.push("/");
  };

  const onShareClicked = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    history.push("/share");
  };

  const onLogoutClicked = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    history.push("/");
    context.logout();
  };

  useEffect(() => {
    if (errors) {
      Object.values(errors).forEach((err) => {
        enqueueSnackbar(err, {
          variant: "error",
        });
      });
    }
  }, [errors, enqueueSnackbar]);

  return (
    <Container maxWidth="lg" className={classes.topMenu}>
      <LoadingOverlay show={loginLoading || registerLoading} />
      <Grid container>
        <Grid
          container
          item
          xs={6}
          className={classes.title}
          onClick={onTitleClicked}
        >
          <div>
            <HomeIcon style={{ fontSize: 80 }} />
          </div>
          <div className={classes.titleText}>Funny Movies</div>
        </Grid>
        <Grid container item xs={6} className={classes.authSection}>
          {context.user ? (
            <>
              <Grid item xs={6}>
                <div>
                  Welcome <b>{context.user ? context.user?.email : ""}</b>
                </div>
              </Grid>
              <Grid item xs={2} className={classes.marginLeft25}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.shareButton}
                  onClick={onShareClicked}
                >
                  Share
                </Button>
              </Grid>
              <Grid item xs={2} className={classes.marginLeft25}>
                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.button}
                  onClick={onLogoutClicked}
                >
                  Log out
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  size="small"
                  type="email"
                  variant="outlined"
                  value={values.email}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={3} className={classes.marginLeft25}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                  value={values.password}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={3} className={classes.marginLeft25}>
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  className={classes.button}
                  onClick={onSubmit}
                >
                  Log in / Register
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

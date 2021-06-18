import React from "react";
import { useHistory } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles(() => ({
  topMenu: {
    borderBottom: "2px solid black",
    paddingTop: 15,
    paddingBottom: 15,
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
  loginButton: {
    padding: "8px 12px",
  },
}));

export default function TopMenu(): React.ReactElement {
  const classes = useStyles();
  const history = useHistory();

  const onTitleClicked = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    history.push("/home");
  };

  return (
    <Container maxWidth="lg" className={classes.topMenu}>
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
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              size="small"
              type="email"
              variant="outlined"
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
            />
          </Grid>
          <Grid item xs={3} className={classes.marginLeft25}>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              className={classes.loginButton}
            >
              Log in / Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

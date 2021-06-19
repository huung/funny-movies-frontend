import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/authRoute";
import TopMenu from "./components/TopMenu";
import Home from "./pages/Home";
import Share from "./pages/Share";

function App() {
  return (
    <AuthProvider>
      <Router>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <TopMenu />
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/share" component={Share} />
          </Switch>
        </SnackbarProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;

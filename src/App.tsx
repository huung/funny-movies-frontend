import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import TopMenu from "./components/TopMenu";
import Home from "./pages/Home";
import Share from "./pages/Share";

function App() {
  return (
    <Router>
      <TopMenu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/share" component={Share} />
      </Switch>
    </Router>
  );
}

export default App;

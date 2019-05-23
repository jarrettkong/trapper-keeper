import React from "react";
import "./App.scss";
import HomeScreen from "../HomeScreen/HomeScreen";
import ListInput from "../../containers/ListInput/ListInput";

import { Route } from "react-router-dom";

const App = () => {
  return (
    <main>
      <Route path="/" component={HomeScreen} />
      <Route path="/new-note" component={ListInput} />
      <Route path="/notes/:id" component={ListInput} />
    </main>
  );
}

export default App;

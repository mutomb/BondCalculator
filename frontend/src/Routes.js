import React from "react";
import { Route, Switch } from "react-router-dom";

import Calculator from "./pages/Calculator";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Calculator} />        
        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;

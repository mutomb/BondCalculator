import React, { Component } from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Calculator from "./pages/Calculator";
import NavPage from "./pages/NavPage";
import Footer from "./pages/Footer";
class App extends Component {
 
  constructor(props){
      super(props);
  }
  state = {
    collapseID: ""
  };
  
  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () => {
    window.scrollTo(0, 0);
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });
  };
  render() {
     
    return (
    <BrowserRouter>
      <NavPage/>
      <Switch>
        <Route path = "/" component ={Calculator} exact/>
      </Switch>
      <Footer/>
    </BrowserRouter>
    );
  }
}

export default App;

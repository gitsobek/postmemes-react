import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import PostNew from "./posts/PostNew";
import PostShow from "./posts/PostShow";
import Creator from "./Creator";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/posts/new" component={PostNew} />
              <Route exact path="/posts/:_id" component={PostShow} />
              <Route path="/posts" component={Dashboard} />
              <Route path="/memer" component={Creator} />
              <Route exact path="/" component={Landing} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);

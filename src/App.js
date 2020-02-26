import React, {useState, useEffect} from "react";
import fire from "firebase";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Dashboard from "./routes/Dashboard";
import firebase from "./config/firebase";
import withAuth from "./hoc/withAuth";

function App() {
  return (
    <div className="App">
      <>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={withAuth(Dashboard)} />
          <Route path="/" component={() => <Redirect to="/dashboard" />} />
        </Switch>
      </>
    </div>
  );
}

export default () => (
  <BrowserRouter>
    <App />
    <ToastContainer hideProgressBar />
  </BrowserRouter>
);

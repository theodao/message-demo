import React, {useState, useEffect, Suspense, lazy} from "react";
import firebase from "./config/firebase";
import {BrowserRouter, Route, Switch, Redirect, withRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import fire from "firebase";
import StyledFirebaseauth from "react-firebaseui";

const Login = lazy(() => import("./routes/Login"));
const Dashboard = lazy(() => import("./routes/Dashboard"));

function App() {
  let [user, setUser] = useState(null);

  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/" component={() => <Redirect to="/dashboard" />} />
            </Switch>
          </Suspense>
        </>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={() => <Redirect to="login" />} />
          </Switch>
        </Suspense>
      )}
    </div>
  );
}

export default () => (
  <BrowserRouter>
    <App />
    <ToastContainer hideProgressBar />
  </BrowserRouter>
);

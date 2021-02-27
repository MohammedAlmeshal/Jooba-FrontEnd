import React, { useEffect } from "react";

import Home from './pages'
import Profile from "./pages/profile";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./flux/actions/authActions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Nav from "./components/Nav";


function App() {
  const history = createBrowserHistory();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router history={history}>
          <Nav/>
          <Switch>
          <Route exact path="/" component={Home}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/:username" component={Profile}></Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

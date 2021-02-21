import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// import "./app.css";
import { useAuth } from "./store/Auth";
import ChannelMain from "./sections/ChannelMain";
import Login from "./sections/Login";
import Members from "./sections/Members";
import Nav from "./sections/Nav";
import Loading from "./components/Loading";

const RedirectToChannel: React.FC = () => {
  return <Redirect to="/channel/general" />;
};

const App: React.FC = () => {
  const { data, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return data ? (
    <div className="App">
      <Router>
        <Nav />
        <div className="Channel">
          <Switch>
            <Route exact path="/channel/:id" component={ChannelMain} />
            <Route path="*" component={RedirectToChannel} />
          </Switch>
          {/* <ChannelMain /> */}
          <Members />
        </div>
      </Router>
    </div>
  ) : (
    <Login />
  );
};

export default App;

import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveUser } from "./store/auth/slice";
import {
  selectIsAuthenticated,
  selectActiveUser,
} from "./store/auth/selectors";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GuestRoute from "./components/routes/GuestRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import Galleries from "./pages/Galleries";
import Gallery from "./pages/Gallery";
import CreateGallery from "./pages/CreateGallery";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getActiveUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <GuestRoute exact path="/register">
            <Register />
          </GuestRoute>
          <GuestRoute exact path="/login">
            <Login />
          </GuestRoute>
          <Route exact path="/">
            <Redirect to="/galleries" />
          </Route>
          <Route exact path="/galleries">
            <Galleries />
          </Route>
          <PrivateRoute exact path="/galleries/me">
            <Galleries selfId={isAuthenticated ? activeUser?.id : null} />
          </PrivateRoute>
          <PrivateRoute exact path="/galleries/create">
            <CreateGallery />
          </PrivateRoute>
          <Route exact path="/galleries/:id">
            <Gallery />
          </Route>
          <Route exact path="/authors/:id">
            <Galleries />
          </Route>
          <PrivateRoute exact path="/edit-gallery/:id">
            <CreateGallery />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import './App.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveUser } from "./store/auth/slice";
import { IsAuthenticated, selectActiveUser } from "./store/auth/selectors";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GuestRoute from './components/routes/GuestRoute';
import PrivateRoute from './components/routes/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(IsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getActiveUser());
    }
  }, 
  [dispatch, isAuthenticated]);

  return (
    <div className="App">
      <Router>
       
        <Switch>
          <GuestRoute exact path="/register">
            <Register/>
          </GuestRoute>
          <GuestRoute exact path="/login">
            <Login/>
          </GuestRoute>
         
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
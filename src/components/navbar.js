import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/auth/slice";
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "../store/auth/selectors";
import "../App.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div>
      <nav class="navbar navbar-expand-sm  navbar-dark bg-dark main-nav justify-content-center">
        <ul class="navbar-nav">
          {isAuthenticated ? (
            <h3 style={{ color: "red" }}>
              User: {activeUser && activeUser.first_name}{" "}
              {activeUser && activeUser.last_name}
            </h3>
          ) : (
            <h3 style={{ color: "red" }}>Guest</h3>
          )}
          <li class="nav-item active ">
            <Link class="nav-link " to="/galleries">
              All Galleries
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li class="nav-item active">
                <Link class="nav-link" to="/galleries/create">
                  Create New Gallery
                </Link>
              </li>
              <li class="nav-item active">
                <Link class="nav-link" to="/galleries/me">
                  My Galleries
                </Link>
              </li>
              <button class="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <li class="nav-item active">
                <Link class="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li class="nav-item active">
                <Link class="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

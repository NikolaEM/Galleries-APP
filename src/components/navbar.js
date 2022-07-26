import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/auth/slice";
import { selectActiveUser, selectIsAuthenticated } from "../store/auth/selectors";
import '../App.css';

export default function Navbar(){
    const dispatch = useDispatch();
    const activeUser = useSelector(selectActiveUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    function handleLogout(){
        dispatch(logout());
    }

    return (
        <div>
            <nav>
                <ul >
                {isAuthenticated ? (
                    <h3>
                        User: {activeUser && activeUser.first_name} {activeUser && activeUser.last_name}  
                    </h3>
                ) : (
                    <h3>
                        Guest
                    </h3>
                )}
                <li>
                    <Link to="/galleries">All Galleries</Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/galleries/create">Create New Gallery</Link>
                        </li>
                        <li>
                        <Link to="/galleries/me">My Galleries</Link>
                        </li>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
                </ul>
            </nav> 
        </div>
    );
} 
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { IsAuthenticated} from "../../store/auth/selectors";

export default function PrivateRoute({ children, ...props }){
    const isAuthenticated = useSelector(IsAuthenticated);

    return (
        <Route {...props}>
            {isAuthenticated ? children : <Redirect to="/login"/>}
        </Route>
    )
}
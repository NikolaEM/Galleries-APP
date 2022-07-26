import { useDispatch } from "react-redux";
import { useState } from "react";
import {register} from "../store/auth/slice";

export default function Register(){
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        terms: false
    });

    function handleSubmit(e){
        e.preventDefault();

        if (!e.target.terms.checked){
          alert("You need to accept Terms and Conditions for registration.");
          return;
        }

        dispatch(register(userData));
    }

    return (
        <div>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                required placeholder="First name" value={userData.first_name}
                onChange={({ target }) => setUserData({ ...userData, first_name: target.value })}/>
            </div>
            <div>
              <input required placeholder="Last name" value={userData.last_name}
                onChange={({ target }) => setUserData({ ...userData, last_name: target.value })}/>
            </div>
            <div>
              <input required type="email" placeholder="Email" value={userData.email}
                onChange={({ target }) => setUserData({ ...userData, email: target.value })}/>
            </div>
            <div>
              <input required type="password" placeholder="Password" value={userData.password}
                onChange={({ target }) => setUserData({ ...userData, password: target.value })}/>
            </div>
            <div>
              <input required type="password" placeholder="Confirm password" value={userData.password_confirmation}
                onChange={({ target }) => setUserData({ ...userData, password_confirmation: target.value })}/>
            </div>
            <div>
              <label>
                Accept Terms and Conditions before registration.
              </label>
              <input required type="checkbox" name="terms" value={true}
                onChange={({ target }) => setUserData({ ...userData, terms: target.checked })}/>
            </div>
            <button>Register</button>
          </form>
        </div>
    );


} 
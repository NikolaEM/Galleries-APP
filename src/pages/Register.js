import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { register } from "../store/auth/slice";
import { selectRegistrationErrors } from "../store/auth/selectors";

export default function Register() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: false,
  });

  const errors = useSelector(selectRegistrationErrors);

  function handleSubmit(e) {
    e.preventDefault();

    if (!e.target.terms.checked) {
      alert("You have to accept Terms and Conditions to register.");
      return;
    }

    dispatch(register(userData));
  }

  return (
    <div>
      <h2
        style={{
          color: "black",
          backgroundColor: "DodgerBlue",
          padding: "10px",
          marginBottom: "50px",
        }}
      >
        Register
      </h2>
      <form class="justify-content-center " onSubmit={handleSubmit}>
        <div class="form-group">
          <input
            class="form-control"
            required
            placeholder="First name"
            value={userData.first_name}
            onChange={({ target }) =>
              setUserData({ ...userData, first_name: target.value })
            }
          />
          {errors?.first_name?.length && (
            <span style={{ color: "red" }}>{errors.first_name[0]}</span>
          )}

          <input
            class="form-control"
            required
            placeholder="Last name"
            value={userData.last_name}
            onChange={({ target }) =>
              setUserData({ ...userData, last_name: target.value })
            }
          />
          {errors?.last_name?.length && (
            <span style={{ color: "red" }}>{errors.last_name[0]}</span>
          )}

          <input
            class="form-control"
            required
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={({ target }) =>
              setUserData({ ...userData, email: target.value })
            }
          />
          {errors?.email?.length && (
            <span style={{ color: "red" }}>{errors.email[0]}</span>
          )}

          <input
            class="form-control"
            required
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={({ target }) =>
              setUserData({ ...userData, password: target.value })
            }
          />
          {errors?.password?.length && (
            <span style={{ color: "red" }}>{errors.password[0]}</span>
          )}

          <input
            class="form-control"
            required
            type="password"
            placeholder="Confirm password"
            value={userData.password_confirmation}
            onChange={({ target }) =>
              setUserData({ ...userData, password_confirmation: target.value })
            }
          />
          {errors?.password_confirmation?.length && (
            <span style={{ color: "red" }}>
              {errors.password_confirmation[0]}
            </span>
          )}

          <label>
            Please read and accept Terms and Conditions before registering!
          </label>
          <input
            class="form-check-input"
            required
            type="checkbox"
            name="terms"
            value={true}
            onChange={({ target }) =>
              setUserData({ ...userData, terms: target.checked })
            }
          />
        </div>
        <br />
        <div>
          <button class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
}

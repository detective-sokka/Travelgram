import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState(false);

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      alert("Invalid email");
      return;
    }

    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log("signing in", data);
          setWarning(true);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          alert("Signed in sucessfully");

          if (data.user.admin) {
            navigate("/adminhome");
            console.log("Admin login");
            setWarning(false);
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="login-btn waves-effect waves-light #3f51b5 indigo align-self-center mt-2"
          onClick={() => PostData()}
        >
          Login
        </button>
        <h6 className="mt-2">
          <Link to="/signup">Don't have an account? </Link>
        </h6>
      </div>
      {warning && (
        <div
          class="alert alert-warning auth-card card input-field"
          role="alert"
        >
          Invalid details
        </div>
      )}
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import "./Login.css";
import { useStateValue } from "./StateProvider";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { Link } from "react-router-dom";
import "./RaiseTicket.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [{ user }, dispatch] = useStateValue();

  const navigate = useNavigate();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })

      .catch((error) => alert(error.messsage));
  };

  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // it successfully created a new user with email and password
        //  navigate("/homepage");
        navigate("/customer");
      })

      .catch((error) => alert(error.message));
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          uid: authUser.uid,
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="login">
      <img
        className="login_logo "
        src=" https://avatars.dicebear.com/api/human/:matiru5810.svg"
      />
      <h1> Welcome To Tickly</h1>
      <div className="login_container">
        <h1>Sign In</h1>
        <form>
          <h5>Email</h5>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
          <h5>Password</h5>

          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />

          <button onClick={login} type="submit" className="login_signIn_button">
            Sign In
          </button>
        </form>
        <p>Don't have an account? Click create!</p>
        <Link to="/custo" className="create_account">
          <span className="span_create_account">
            create your Tickly Account
          </span>
        </Link>
      </div>
    </div>
  );
}
export default Login;
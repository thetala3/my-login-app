import React, { useState, useEffect, useRef, useContext } from "react";
import "./LoginForm.css"; // Import your CSS file here
import { FaUser, FaLock } from "react-icons/fa";
import AuthContext from "../../context/AuthProvider";
import { useConfig } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const LoginForm = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const config = useConfig();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleLogin = async (event) => {
    event.preventDefault();
    // Add logic for authentication here
    console.log("Logging in with", user, password);

    try {
      //for mapping change user, password like in the backend model
      const response = await Axios.post(
        config.LOGIN_URL,
        JSON.stringify(user, password)
      );

      console.log(JSON.stringify(response?.data));

      //const accessToken = response?.data?.accessToken;
      //const roles = response?.data?.roles;

      //later you can add accessToken and roles
      setAuth({ user, password });
      setUser("");
      setPassword("");
      setSuccess(true);
      setErrMsg("");
      navigate("/home");
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Resposne");
      } else if (errMsg.response.status === 400) {
        setErrMsg("Missing UserName or Password");
      } else if (errMsg.response.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
    // Dummy check for username and password
    if (user === "admin" && password === "admin") {
      setSuccess(true);
      setErrMsg("");
    } else {
      setErrMsg("Invalid username or password");
    }
  };

  return (
    <>
      <div className="login-body">
        {success ? (
          navigate("/home")
        ) : (
          <div className="wrapper">
            <img src="" alt="Company Logo" className="login-logo" />
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form action="" onSubmit={handleLogin}>
              <h1>Mortgage System</h1>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Username"
                  ref={userRef}
                  value={user}
                  required={true}
                  onChange={(e) => setUser(e.target.value)}
                />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className="icon" />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginForm;

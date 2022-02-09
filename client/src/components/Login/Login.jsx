import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Cancel, Map } from "@material-ui/icons";
import axios from "axios";

import { URL } from "../../App";

import "./Login.css";

const Login = ({ setShowLogin, storage, setCurrentUser, currentUser }) => {
  const [failure, setfailure] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const registerHandler = async (e) => {
    e.preventDefault();
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(`${URL}/api/users/login`, user);
      console.log("res", res);
      setfailure(false);
      storage.setItem("username", res.data.username);
      setCurrentUser(res.data.username);
      setShowLogin(false);
      toast.success("Welcoome back");
    } catch (err) {
      console.log(err);
      toast.error("One of the fields is incorrect");
      setfailure(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Map />
        <span> </span>
        Points To Remeber
      </div>
      <form onSubmit={registerHandler}>
        <input type="text" placeholder="emaiil" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="loginBtn">Login</button>
        {failure && <span className="failure">One of the inputs is wrong</span>}
      </form>
      <Cancel onClick={() => setShowLogin(false)} className="loginCancel" />
    </div>
  );
};

export default Login;

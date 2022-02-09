import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Cancel, Map } from "@material-ui/icons";
import axios from "axios";

import { URL } from "../../App";

import "./Register.css";

const Register = ({ setShowRegister }) => {
  const [success, setSuccess] = useState(false);
  const [failure, setfailure] = useState(false);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const registerHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post(`${URL}/api/users/register`, newUser);
      setfailure(false);
      setSuccess(true);
      setShowRegister(false);
      toast.success("Alright, let's see now if you know how to login");
    } catch (err) {
      console.log(err);
      setfailure(true);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Map />
        Points To Remeber
      </div>
      <form onSubmit={registerHandler}>
        <input type="text" placeholder="username" ref={usernameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="registerBtn">Register</button>
        {success && <span className="success">Successfully</span>}
        {failure && (
          <span className="failure">One of the inputs was wrong</span>
        )}
      </form>
      <Cancel
        onClick={() => setShowRegister(false)}
        className="registerCancel"
      />
    </div>
  );
};

export default Register;

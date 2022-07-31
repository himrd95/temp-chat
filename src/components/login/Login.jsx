import React, { useState } from "react";
import "../login/login.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setItem } from "../../Helpers/LocalStorage";
import { KEYS } from "../../utils/constants";


const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });

  const userData = useSelector((state) => state.reducers.userData);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSuccess = (user) => {
    navigate("/chat");
    setItem(KEYS.CURRENTUSER, user.id)
  }

  const handleClick = () => {
    if (user.email === "" && user.password === "") {
      alert('Please Enter Your Email and Password')
      return;
    }
    const alreadyUser = userData?.find((item) => item?.email === user?.email);
    !alreadyUser && alert("user is not registered");
    !alreadyUser
      ? navigate("/signup")
      : alreadyUser.password === user.password
        ? onSuccess(alreadyUser)
        : alert("password is wrong");
  };

  const Register = () => {
    navigate('./')
  }
  return (

    <div className="loginpage">
      <form className="box loginbox">
        <h1><b> AVTAR </b></h1>


        <div className="field sign_in">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field sign_in">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="********"
            />
          </div>
        </div>
        <button onClick={handleClick} className="button is rounded is-small is-fullwidth btn  ">
          SIGN IN
        </button>
        <span className="span">Dont have an Account ?  </span>
        <a
          onClick={() => navigate("/signup")}
        >
          <strong>Register</strong>
        </a>
      </form>
    </div>
  );
};

export default Login;

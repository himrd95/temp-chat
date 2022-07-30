import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../signup/signup.css'
import { useNavigate } from "react-router-dom";
import { createUser } from "../../actions/action";

const Signup = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.reducers.userData);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }



  const handleClick = () => {
    const payload = { ...user, id: Date.now().toLocaleString(), messages: [] }
    const alreadyUser = userData?.find((item) => item?.email === user?.email)
    alreadyUser && alert('user already exists')
    alreadyUser ? navigate('/') : dispatch(createUser(payload))
    setUser({ username: '', email: '', password: '' })
    console.log(userData, 'userdatatat')
    alert('User Registered Successfully')
    navigate('/')

  }

  return (
    <div className="signup-box">
      <form className="box">
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" name='username' value={user.username} onChange={handleChange} type="text" placeholder="User Name" />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" name='email' value={user.email} onChange={handleChange} type="email" placeholder="Email" />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" name='password' value={user.password} onChange={handleChange} type="password" placeholder="Password" />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button onClick={handleClick} className="button is-success is-fullwidth">Sign UP</button>
          </p>
        </div>
        <span>Already User ?  </span>
        <a onClick={() => navigate("/")}>
          Log in
        </a>
      </form>
    </div>
  );
};

export default Signup;

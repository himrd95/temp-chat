import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../signup/signup.css';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../actions/action';
import { v4 as uuidv4 } from 'uuid';
import { changeTheme } from '../../actions/action';

const Signup = () => {
	const [user, setUser] = useState({});
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const userData = useSelector((state) => state.reducers.userData);

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleClick = () => {
		const payload = { ...user, id: uuidv4(), messages: [] };
		const alreadyUser = userData?.find(
			(item) => item?.email === user?.email,
		);
		alreadyUser && alert('User Already Exist');
		alreadyUser ? navigate('/') : dispatch(createUser(payload));
		setUser({ username: '', email: '', password: '' });
		//(userData, 'userdatatat')
		alert('User Registered successfully');
		navigate('/');
	};

	return (
		<div className='signup-box'>
			<form className='box signup'>
				<h1><b> AVTAR </b></h1>
				<label className='checkbox navbar-end'>
					<input
						type='checkbox'
						onChange={(e) =>
							e.target.checked
								? dispatch(changeTheme('dark'))
								: dispatch(changeTheme('light'))
						}
					/>
					Enable Dark Mode
				</label>
				<div className='field'>
					<p className='control has-icons-left'>
						<label className="label">User Name</label>
						<input
							className='input'
							name='username'
							value={user.username}
							onChange={handleChange}
							type='text'
							placeholder='User Name'
						/>
						<span className='icon is-small is-left'>
							<i className='fas fa-lock'></i>
						</span>
					</p>
				</div>
				<div className='field'>
					<p className='control has-icons-left has-icons-right'>
						<label className="label">Email</label>
						<input
							className='input'
							name='email'
							value={user.email}
							onChange={handleChange}
							type='email'
							placeholder='Email'
						/>
						<span className='icon is-small is-left'>
							<i className='fas fa-envelope'></i>
						</span>
						<span className='icon is-small is-right'>
							<i className='fas fa-check'></i>
						</span>
					</p>
				</div>
				<div className='field'>
					<p className='control has-icons-left'>
						<label className="label">Password</label>
						<input
							className='input'
							name='password'
							value={user.password}
							onChange={handleChange}
							type='password'
							placeholder='Password'
						/>
						<span className='icon is-small is-left'>
							<i className='fas fa-lock'></i>
						</span>
					</p>
				</div>
				<div className='field'>
					<p className='control'>
						<button
							onClick={handleClick}
							className='button is-fullwidth btn'
						>
							SIGN UP
						</button>
					</p>
				</div>
				<span className='span'> Already a User ? </span>
				<a onClick={() => navigate('/')}>Log in</a>
			</form>
		</div>
	);
};

export default Signup;

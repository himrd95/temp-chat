import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentBot } from '../../actions/action';
import { getItem, setItem } from '../../Helpers/LocalStorage';
import '../contacts/userlist.css';
import { contact, THEME } from '../../utils/constants';

const Userslist = () => {
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.reducers.theme);

	const userData = getItem('users') || [];
	const botID = useSelector((state) => state.reducers.currentBot);

	const clickHandler = (id) => {
		dispatch(currentBot(id));
	};

	return (
		<div>
			<section>
				<div
					className='userscontainer'
					style={
						theme === THEME.DARK
							? {
									background: '#323232',
									color: 'white',
							  }
							: { background: '#ebebeb', color: 'black' }
					}
				>
					<header>
						<h2
							style={
								theme === THEME.DARK
									? { background: '#ebebeb', color: 'black' }
									: {
											background: '#323232',
											color: 'white',
									  }
							}
						>
							Contacts
						</h2>
						{contact?.map((user, index) => (
							<div
								className='users'
								style={
									theme === THEME.DARK
										? {
												background: '#323232',
												color: 'white',
										  }
										: { background: '#ebebeb', color: 'black' }
								}
								onClick={() => clickHandler(user.id)}
							>
								<img className='avatar' src={user.avatar} alt='' />
								<h3>{user.name}</h3>
							</div>
						))}
					</header>
				</div>
			</section>
		</div>
	);
};

export default Userslist;

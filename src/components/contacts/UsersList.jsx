import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentBot } from '../../actions/action';
import { getItem, setItem } from '../../Helpers/LocalStorage';
import '../contacts/userlist.css';
import { contact } from '../../utils/constants';

const UsersList = () => {
	const dispatch = useDispatch();

	const userData = getItem('users') || [];
	const botID = useSelector((state) => state.reducers.currentBot);

	const clickHandler = (id) => {
		dispatch(currentBot(id));
	};

	return (
		<div>
			<section>
				<div className='userscontainer'>
					<header>
						<h2>Contacts</h2>
						{contact?.map((user, index) => (
							<div
								className='users'
								style={{
									backgroundColor:
										user.id === botID ? '' : '#ffffff39',
									padding: '5px 10px',
								}}
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

export default UsersList;

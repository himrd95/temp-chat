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
						<h3>UsersList</h3>
						{contact?.map((user, index) => (
							<h3
								style={{
									backgroundColor:
										user.id == botID ? 'white' : 'yellow',
									padding: '5px 10px',
								}}
								onClick={() => clickHandler(user.id)}
							>
								{user.name}
							</h3>
						))}
					</header>
				</div>
			</section>
		</div>
	);
};

export default UsersList;

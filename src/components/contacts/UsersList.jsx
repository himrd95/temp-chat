import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentBot, setUnread } from '../../actions/action';
import { getItem, setItem } from '../../Helpers/LocalStorage';
import '../contacts/userlist.css';
import { contact, KEYS, THEME } from '../../utils/constants';
import cx from 'classnames';

const UsersList = () => {
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.reducers.theme);

	const user = getItem(KEYS.CURRENTUSER) || '';
	const botId = Number(
		useSelector((state) => state.reducers.currentBot),
	);

	const unread = useSelector((state) => state.reducers.unread);
	const unreadChat = unread.filter(
		(msg) => msg.userId == user && msg.botId == botId,
	);

	const clickHandler = (id) => {
		dispatch(currentBot(id));
		const updatedUnread = unread.filter((item) => item.botId != id);
		setItem(KEYS.UNREAD, updatedUnread);
		dispatch(setUnread(updatedUnread));
	};

	const getUnreadLength = (id) => {
		const unreadChat = unread.filter(
			(msg) => msg.userId == user && msg.botId == id,
		);
		console.log(unreadChat.length, 'unreadChat', unread);
		return unreadChat.length;
	};
	return (
		<div>
			<section>
				<div className='userscontainer'>
					<header>
						<h2
							style={
								theme === THEME.DARK
									? { background: '#395B64', color: 'white' }
									: {
											background: '#E2DCC8',
											color: 'black',
									  }
							}
						>
							Contacts
						</h2>
						{contact?.map((user, index) => (
							<div
								style={
									theme === THEME.DARK
										? {
												background: '#576F72',
												color: 'white',
										  }
										: {
												background: '#ebebeb',
												color: 'black',
										  }
								}
								className={cx(
									user.id != botId ? 'users' : 'activeUser',
								)}
								onClick={() => clickHandler(user.id)}
							>
								<img className='avatar' src={user.avatar} alt='' />
								<h3>{user.name}</h3>
								{getUnreadLength(user.id) > 0 && (
									<div className='unread'>
										{getUnreadLength(user.id)}
									</div>
								)}
							</div>
						))}
					</header>
				</div>
			</section>
		</div>
	);
};

export default UsersList;

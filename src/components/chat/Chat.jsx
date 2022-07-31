import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../chat/chat.css';
import { saveChat, deleteChat, createUser, updateUser, currentUser, pinItem, deleteMessage, setUnread } from '../../actions/action';
import ChatWindow from '../chatwindow/ChatWindow';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { getItem, setItem } from '../../Helpers/LocalStorage';
import { KEYS, THEME } from '../../utils/constants';
import UsersList from '../contacts/UsersList';
import { changeTheme } from '../../actions/action';


function Chat() {

	const [input, setInput] = useState('');
	const [chat, setChat] = useState([]);
	const dispatch = useDispatch();
	const user = getItem(KEYS.CURRENTUSER) || '';
	const users = getItem(KEYS.USERS) || [];
	const theme = useSelector((state) => state.reducers.theme);

	const botId = Number(
		useSelector((state) => state.reducers.currentBot),
	);

	const botRef = useRef(1);
	botRef.current = botId;

	const allMesseages = getItem(KEYS.MESSAGES) || [];
	const activeUser = users.find((us) => us.id == user);

	useEffect(() => {
		dispatch(currentUser(user));
		const fetchedMessages = allMesseages.filter((chats) => chats.userId == user,);
		dispatch(updateUser(fetchedMessages));
	}, []);

	const currnetUser = useSelector((state) => state.reducers.currnetUser);
	const fetchedConvo = useSelector((state) => state.reducers.fetchedConvo);
	const pinned = useSelector((state) => state.reducers.pinned);
	const pinnedChat = pinned.filter((pin) => pin.userId == user && pin.botId == botId,);

	const unread = useSelector((state) => state.reducers.unread);
	const userData = useSelector((state) => state.reducers.userData);


	const messages = fetchedConvo.find((bot) => bot.botId == botId,)?.messages;

	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			onMessageSubmit();
		}
	};

	const unreadMessages = (id) => {
		const unreadMessages = getItem(KEYS.UNREAD) || [];
		const updatedUnread = [
			...unreadMessages,
			{ userId: user, botId: botId, chatId: id },
		];
		setItem(KEYS.UNREAD, updatedUnread);
		dispatch(setUnread(updatedUnread));
	};

	const onMessageSubmit = () => {
		if (input === '') return;
		const message = input;
		const date = moment().format('LT');
		const payload = { id: uuidv4(), message, author: 'user', date };
		dispatch(saveChat(payload, fetchedConvo, currnetUser, botId));
		setInput('');

		const start = setTimeout(() => {
			if (botId != botRef.current) {
				unreadMessages(uuidv4());
			}
			dispatch(
				saveChat(
					{ ...payload, author: 'bot', id: uuidv4() },
					fetchedConvo,
					currnetUser,
					botId,
				),
			);
		}, 30000);

		return () => {
			clearTimeout(start);
		};
	};

	const handlePin = (msg) => {
		const alreadyPinned = pinnedChat.find((item) => item.message.id == msg.id,);
		if (alreadyPinned) {
			const newPin = pinned.filter((item) => item.message.id != msg.id,);
			setItem(KEYS.PINNED, newPin);
			dispatch(pinItem(newPin));
			return;
		}
		if (pinnedChat.length > 2) {
			alert('reached maximum limit of pinned chat.');
			return;
		}
		let pinnedItem = getItem(KEYS.PINNED) || [];
		pinnedItem = [
			...pinnedItem,
			{ userId: user, botId: botId, message: msg },
		];
		setItem(KEYS.PINNED, pinnedItem);
		dispatch(pinItem(pinnedItem));
	};

	const editMessages = (chat, payload) => {
		const updatedMessages = allMesseages.map((item) => {
			if (item.botId == botId && item.userId == user) {
				return {
					...item,
					messages: item.messages.map((msg) =>
						msg.id == chat.id ? { ...msg, message: payload } : msg,
					),
				};
			} else return item;
		});

		const newPin = pinned.map((msg) =>
			msg.message.id == chat.id
				? { ...msg, message: { ...msg.message, message: payload } }
				: msg,
		);
		setItem(KEYS.PINNED, newPin);
		dispatch(pinItem(newPin));
		setItem(KEYS.MESSAGES, updatedMessages);
		dispatch(
			deleteMessage(
				updatedMessages.filter((bot) => bot.userId == user),
			),
		);
	};

	const deleteMessages = (id) => {
		const updatedMessages = allMesseages.map((item) => {
			if (item.botId == botId && item.userId == user) {
				//(item.messages);
				return {
					...item,
					messages: item.messages.filter((msg) => msg.id != id),
				};
			} else return item;
		});

		const newPin = pinned.filter((item) => item.message.id != id);
		setItem(KEYS.PINNED, newPin);
		dispatch(pinItem(newPin));

		setItem(KEYS.MESSAGES, updatedMessages);

		dispatch(
			deleteMessage(
				updatedMessages.filter((bot) => bot.userId == user),
			),
		);
	};



	return (
		<div className='chatpage'>
			<div className='container'>
				<div className='contacts'>
					<UsersList />
					<div className='header-user'
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
						}>
						<img src='https://robohash.org/BLH.png?set=set3' />
						<h2>{activeUser.username}</h2>
					</div>
				</div>
				<div className='chat-box'>
					<div className='header'>
						<div className="logo">
							<h1><b>Adam</b></h1>
							<img className='logo-img' src='./logo.png' alt='logo' />
						</div>
						<label className='toggle'>
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
						<a className='log' href='./'>Logout</a>
					</div>
					<div className='chat-container'
						style={
							theme === THEME.DARK
								? {
									background: 'black',
									color: 'white',
								}
								: {
									background: 'white',
									color: 'black',
								}
						}>
						<ChatWindow
							messages={messages}
							handlePin={handlePin}
							pinned={pinnedChat}
							editMessages={editMessages}
							delteMessages={deleteMessages}
						/>
					</div>
					<div className='btm'>
						<input
							type='text'
							onInput={handleInputChange}
							value={input}
							placeholder='Enter message'
							onKeyPress={handleKeyPress}
						></input>
						<button
							className='button is medium btn-send'
							onClick={onMessageSubmit}
						>
							Send
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../chat/chat.css';
import {
	saveChat,
	deleteChat,
	createUser,
	updateUser,
	currentUser,
	pinItem,
} from '../../actions/action';
import ChatWindow from '../chatwindow/ChatWindow';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { getItem, setItem } from '../../Helpers/LocalStorage';
import { KEYS } from '../../utils/constants';
import UsersList from '../contacts/UsersList';

function Chat() {
	const [input, setInput] = useState('');
	const [chat, setChat] = useState([]);
	const dispatch = useDispatch();
	const user = getItem(KEYS.CURRENTUSER) || '';
	const botId = Number(
		useSelector((state) => state.reducers.currentBot),
	);

	useEffect(() => {
		dispatch(currentUser(user));
		const allMesseages = getItem(KEYS.MESSAGES) || [];
		const fetchedMessages = allMesseages.filter(
			(chats) => chats.userId == user,
		);
		dispatch(updateUser(fetchedMessages));
	}, []);

	const currnetUser = useSelector(
		(state) => state.reducers.currnetUser,
	);
	const fetchedConvo = useSelector(
		(state) => state.reducers.fetchedConvo,
	);

	const pinned = useSelector((state) => state.reducers.pinned);
	const pinnedChat = pinned.filter(
		(pin) => pin.userId == user && pin.botId == botId,
	);

	console.log(pinnedChat, 'pinneddddd', pinned, botId, currentUser);

	const messages = fetchedConvo.find(
		(bot) => bot.botId == botId,
	)?.messages;

	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			onMessageSubmit();
		}
	};

	const onMessageSubmit = () => {
		if (input === '') return;
		const message = input;
		const date = moment().format('LT');
		const payload = { id: uuidv4(), message, author: 'user', date };

		dispatch(saveChat(payload, fetchedConvo, currnetUser, botId));
		setInput('');

		const start = setTimeout(() => {
			dispatch(
				saveChat(
					{ ...payload, author: 'bot' },
					fetchedConvo,
					currnetUser,
					botId,
				),
			);
		}, 5000);

		return () => {
			clearTimeout(start);
		};
	};

	const handlePin = (msg) => {
		if (pinnedChat.length > 3) {
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
	return (
		<div className='chatpage'>
			<div className='container'>
				<div className='contacts'>
					<div className='header'>
						<h1>UserName</h1>
					</div>
					<UsersList />
				</div>
				<div className='chat-box'>
					<div className='header'>
						<h1>ADAM</h1>
					</div>
					<div className='chat-container'>
						<ChatWindow
							messages={messages}
							handlePin={handlePin}
							pinned={pinnedChat}
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
						<button className='button is medium btn' onClick={onMessageSubmit}>
							Send
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;

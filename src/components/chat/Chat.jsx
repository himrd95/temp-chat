import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../chat/chat.css';
import {
	saveChat,
	deleteChat,
	createUser,
} from '../../actions/action';
import ChatWindow from '../chatwindow/ChatWindow';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import UsersList from '../contacts/UsersList';
import { getItem } from '../../Helpers/LocalStorage';

function Chat() {
	const [input, setInput] = useState('');
	const [chat, setChat] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {}, []);

	const currnetUser = useSelector(
		(state) => state.reducers.currnetUser,
	);
	const fetchedConvo = useSelector(
		(state) => state.reducers.fetchedConvo,
	);

	const botId = Number(
		useSelector((state) => state.reducers.currentBot),
	);
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

	return (
		<div className='container'>
			<div className='user-list'>
				<UsersList />
			</div>
			<div className='chat-box'>
				<div className='chat-container'>
					<ChatWindow messages={messages} />
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
						className='button is-primary'
						onClick={onMessageSubmit}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

export default Chat;

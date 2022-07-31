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
	deleteMessage,
	setUnread,
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
	const allMesseages = getItem(KEYS.MESSAGES) || [];

	useEffect(() => {
		dispatch(currentUser(user));

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

	const unread = useSelector((state) => state.reducers.unread);

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

	const unreadMessages = (id) => {
		const unreadMessages = getItem(KEYS.UNREAD) || [];
		const updatedUnread = [
			...unreadMessages,
			{ userId: user, botId: botId, chatId: id },
		];
		setItem(KEYS.UNREAD, updatedUnread);
		dispatch(setUnread(updatedUnread));
		console.log('added in the unread');
	};

	const onMessageSubmit = () => {
		if (input === '') return;
		const message = input;
		const date = moment().format('LT');
		const payload = { id: uuidv4(), message, author: 'user', date };

		dispatch(saveChat(payload, fetchedConvo, currnetUser, botId));
		setInput('');

		const start = setTimeout(() => {
			if (botId != payload.botId) {
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
		}, 15000);

		return () => {
			clearTimeout(start);
		};
	};

	const handlePin = (msg) => {
		if (pinnedChat.length > 2) {
			alert('reached maximum limit of pinned chat.');
			return;
		}
		const alreadyPinned = pinnedChat.find(
			(item) => item.message.id == msg.id,
		);
		if (alreadyPinned) {
			const newPin = pinned.filter(
				(item) => item.message.id != msg.id,
			);
			setItem(KEYS.PINNED, newPin);
			dispatch(pinItem(newPin));
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
				console.log(item.messages);
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
				console.log(item.messages);
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
		<div className='container'>
			<div className='user-list'>
				<UsersList />
			</div>
			<div className='chat-box'>
				<div className='chat-container'>
					<ChatWindow
						messages={messages}
						handlePin={handlePin}
						pinned={pinnedChat}
						editMessages={editMessages}
						delteMessages={deleteMessages}
					/>
				</div>
				<div className='chat-box'>
					<div className='chat-container'>
						<ChatWindow chat={messages} />
					</div>
					<div className='btm'>
						<input
							type='text'
							onInput={handleInputChange}
							value={input}
							placeholder='Enter message'
							onKeyPress={handleKeyPress}
						></input>
						<button className='button btn' onClick={onMessageSubmit}>
							Send
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;

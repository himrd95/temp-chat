import { setItem, getItem, clear } from '../Helpers/LocalStorage';
import { KEYS } from '../utils/constants';

export const sendMessage = (data) => {
	return {
		type: 'SENDMESSAGE',
		payload: data,
	};
};
export const deleteMessage = () => {
	return {
		type: 'DELETEMESSAGE',
	};
};
export const registeruser = (user) => {
	return {
		type: 'CREATE_USER',
		payload: user,
	};
};
export const updateUser = (user) => {
	return {
		type: 'UPDATE_USER',
		payload: user,
	};
};
export const currentBot = (id) => {
	return {
		type: 'CURRENT_BOT',
		payload: id,
	};
};

export const createUser = (user) => (dispatch) => {
	const getusers = getItem('users') || [];
	setItem('users', [...getusers, user]);
	dispatch(registeruser(user));
};

export const saveChat =
	(payload, chats, userId, botId) => (dispatch) => {
		let convos = [];
		const messages = getItem(KEYS.MESSAGES) || []; // [{userId: "", botId: "", messages: []}]

		let updatedMessages = [];
		if (chats.length > 0) {
			convos = chats.find((bot) => botId === bot.botId)?.messages;
			convos.push(payload);
		} else if (chats.length === 0) {
			convos.push(payload);
		}

		if (messages.length > 0) {
			updatedMessages = messages.map((convo) =>
				convo?.userid !== userId
					? convo
					: convo.botId === botId
					? { ...convo, messages: convos }
					: convo,
			);
		} else {
			updatedMessages.push({ botId, userId, messages: convos });
		}

		console.log(convos, 'convos', updatedMessages);

		setItem(KEYS.MESSAGES, updatedMessages);
		dispatch(updateUser(chats));
	};

export const deleteChat = (data) => (dispatch) => {
	clear('chatmsg', []);
	dispatch(deleteMessage(data));
};

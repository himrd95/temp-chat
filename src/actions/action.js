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
export const currentUser = (user) => {
	return {
		type: 'CURRENT_USER',
		payload: user,
	};
};
export const updateUser = (data) => {
	return {
		type: 'UPDATE_USER',
		payload: data,
	};
};
export const currentBot = (id) => {
	return {
		type: 'CURRENT_BOT',
		payload: id,
	};
};
export const pinItem = (chat) => {
	return {
		type: 'PIN_ITEM',
		payload: chat,
	};
};

export const createUser = (user) => (dispatch) => {
	const getusers = getItem('users') || [];
	setItem('users', [...getusers, user]);
	dispatch(registeruser(user));
};

export const saveChat =
	(payload, chats, userId, botId) => (dispatch) => {
		const messages = getItem(KEYS.MESSAGES) || []; // [{userId: "", botId: "", messages: []}]
		let convos = [];
		let updatedMessages = [];
		let messagesTray = messages.find(
			(bot) => botId == bot.botId && bot.userId == userId,
		)?.messages;

		if (messagesTray && messagesTray.length > 0) {
			convos = [...messagesTray, payload];
		} else {
			convos = [payload];
		}

		if (messagesTray) {
			updatedMessages = messages?.map((convo) => {
				if (convo?.userid != userId && convo?.botId == botId) {
					return { ...convo, messages: convos };
				} else return convo;
			});
		} else {
			updatedMessages = [
				...messages,
				{ botId, userId, messages: convos },
			];
		}

		setItem(KEYS.MESSAGES, updatedMessages);
		dispatch(
			updateUser(
				updatedMessages.filter((bot) => bot.userId == userId),
			),
		);
	};

export const deleteChat = (data) => (dispatch) => {
	clear('chatmsg', []);
	dispatch(deleteMessage(data));
};

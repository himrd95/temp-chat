import { getItem } from '../Helpers/LocalStorage';
import { KEYS } from '../utils/constants';

const currnetUser = getItem(KEYS.CURRENTUSER) || '';
const users = getItem(KEYS.USERS) || [];
const messages = getItem(KEYS.MESSAGES) || [];
const fetchedMessages = messages.filter(
	(chats) => chats.userId == currnetUser,
);

//(fetchedMessages, currnetUser, 'hiii');

const initialData = {
	userData: users,
	currnetUser: currnetUser,
	fetchedConvo: fetchedMessages,
	currentBot: 1,
	pinned: getItem(KEYS.PINNED) || [],
	theme: 'light',
	unread: getItem(KEYS.UNREAD) || [],
	// currentUser: getItem("users")[0].id,
};

const reducers = (state = initialData, action) => {
	switch (action.type) {
		case 'CHANGE_THEME':
			return {
				...state,
				theme: action.payload,
			};

		case 'DELETE_MESSAGE':
			return {
				...state,
				fetchedConvo: action.payload,
			};

		case 'CREATE_USER':
			return {
				...state,
				userData: [...state.userData, action.payload],
			};

		case 'CURRENT_BOT':
			return {
				...state,
				currentBot: action.payload,
			};
		case 'UPDATE_USER':
			return {
				...state,
				fetchedConvo: action.payload,
			};
		case 'CURRENT_USER':
			return {
				...state,
				currnetUser: action.payload,
			};
		case 'PIN_ITEM':
			return {
				...state,
				pinned: action.payload,
			};
		case 'UNREAD':
			return {
				...state,
				unread: action.payload,
			};

		default:
			return state;
	}
};
export default reducers;

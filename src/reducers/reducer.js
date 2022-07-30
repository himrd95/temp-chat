import { getItem } from '../Helpers/LocalStorage';
import { KEYS } from '../utils/constants';

const currnetUser = getItem(KEYS.CURRENTUSER) || '';
const users = getItem(KEYS.USERS) || [];
const messages = getItem(KEYS.MESSAGES) || [];
const fetchedMessages = messages.filter(
	(chats) => chats.userId === currnetUser,
);

const initialData = {
	userData: users,
	currnetUser: currnetUser,
	fetchedConvo: fetchedMessages,
	currentBot: 1,
	// currentUser: getItem("users")[0].id,
};

const reducers = (state = initialData, action) => {
	switch (action.type) {
		// case "SENDMESSAGE":
		//   return {
		//     ...state,
		//     list: [...state.list, action.payload],
		//   };

		// case "DELETEMESSAGE":
		//   return {
		//     ...state,
		//     list: [],
		//   };

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
				fetchedConvocurrentUser: action.payload,
			};

		default:
			return state;
	}
};
export default reducers;

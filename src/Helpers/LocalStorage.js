export const setItem = (key, payload) => {
	return localStorage.setItem(key, JSON.stringify(payload));
};

export const getItem = (key) => {
	const data = localStorage.getItem(key);
	return data === '' ? [] : JSON.parse(data);
};

export const clear = () => {
	return JSON.parse(localStorage.clear());
};

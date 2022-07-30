import React from 'react';
import cx from 'classnames';
import '../chatwindow/chatwindow.css';
import { useSelector } from 'react-redux';

const ChatWindow = ({ messages }) => {
	console.log(messages, 'messagestttttt');
	return (
		<div className='messages-window'>
			{messages && messages?.length > 0 ? (
				messages?.map((chat) => (
					<div
						className={cx(chat?.author == 'bot' ? 'bot' : 'author')}
					>
						<div
							className={cx(chat?.author !== 'bot' && 'author-color')}
						>
							<p>{chat?.message}</p>
							<p style={{ fontSize: '9px' }}>{chat?.date}</p>
						</div>
					</div>
				))
			) : (
				<h3>No conversations yet</h3>
			)}
		</div>
	);
};

export default ChatWindow;

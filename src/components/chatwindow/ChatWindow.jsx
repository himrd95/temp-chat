import React from 'react';
import cx from 'classnames';
import '../chatwindow/chatwindow.css';
import { useSelector } from 'react-redux';

const ChatWindow = ({ chat }) => {
	console.log(chat, 'chattttttt');
	return (
		<div className='chat-window'>
			{chat && chat?.length > 0 ? (
				chat?.messages?.map((message) => (
					<div
						className={cx(
							message?.author === 'bot' ? 'bot' : 'author',
						)}
					>
						<div
							className={cx(
								message?.author !== 'bot' && 'author-color',
							)}
						>
							<p>{message?.message}</p>
							<p style={{ fontSize: '9px' }}>{message?.date}</p>
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

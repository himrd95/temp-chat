import React, { useState } from 'react';
import cx from 'classnames';
import '../chatwindow/chatwindow.css';
import { useSelector } from 'react-redux';

const ChatWindow = ({ messages, handlePin }) => {
	const [open, setOpen] = useState(false);
	console.log(messages, 'messagestttttt');
	return (
		<div className='messages-window'>
			<div className='pinned'>pin</div>
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
							<div onClick={() => setOpen(!open)} className='options'>
								O
							</div>
							{open && (
								<div className='modal'>
									<div onClick={() => handlePin(chat.id)}>Pin</div>
									<div>Edit</div>
									<div>Delete</div>
								</div>
							)}
						</div>
					</div>
				))
			) : (
				<p>No conversations yet</p>
			)}
		</div>
	);
};

export default ChatWindow;

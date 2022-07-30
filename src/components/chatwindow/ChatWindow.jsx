import React, { useState } from 'react';
import cx from 'classnames';
import '../chatwindow/chatwindow.css';
import { useSelector } from 'react-redux';

const ChatWindow = ({ messages, handlePin, pinned }) => {
	const [open, setOpen] = useState(false);
	const [msgId, setMsgId] = useState({});
	console.log(messages, 'messagestttttt', pinned);
	return (
		<div className='messages-window'>
			<div className='pinned'>
				{pinned?.map((pin) => (
					<a href={`#${pin.message.message}`}>
						<span>{pin.message.message}</span>
					</a>
				))}
			</div>
			{messages && messages?.length > 0 ? (
				messages?.map((chat) => (
					<div
						className={cx(chat?.author == 'bot' ? 'bot' : 'author')}
						id={chat.message}
					>
						<div
							onMouseOver={() =>
								setMsgId({ id: chat.id, auth: chat.author })
							}
							onMouseLeave={() => open && setOpen(false)}
							className={cx(chat?.author !== 'bot' && 'author-color')}
						>
							<p>{chat?.message}</p>
							<p style={{ fontSize: '9px' }}>{chat?.date}</p>
							<div onClick={() => setOpen(!open)} className='options'>
								O
							</div>
							{open &&
								msgId.id === chat.id &&
								msgId.auth === chat.author && (
									<div className='modal-popup'>
										<div
											onClick={() => {
												setOpen(false);
												handlePin(chat);
											}}
										>
											Pin
										</div>
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

import React, { useState } from 'react';
import cx from 'classnames';
import '../chatwindow/chatwindow.css';
import { useSelector } from 'react-redux';

const ChatWindow = ({
	messages,
	handlePin,
	pinned,
	editMessages,
	delteMessages,
}) => {
	const [open, setOpen] = useState(false);
	const [msgId, setMsgId] = useState({});
	const [edit, setEdit] = useState(false);

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
							{!edit ? (
								<p>{chat?.message}</p>
							) : (
								<input type='text' value={chat?.message} />
							)}
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
											{pinned.find(
												(item) => item.message.id == chat.id,
											)
												? 'Unpin'
												: 'Pin'}
										</div>
										<div onClick={() => setEdit(true)}>Edit</div>
										<div onClick={() => delteMessages(chat.id)}>
											Delete
										</div>
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

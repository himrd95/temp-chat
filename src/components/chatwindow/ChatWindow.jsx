import React, { useState } from 'react';
import cx from 'classnames';
import '../chatwindow/chatwindow.css';
import { useSelector } from 'react-redux';
import { contact, THEME } from '../../utils/constants';

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
	const [payload, setPayload] = useState('');

	const botId = Number(
		useSelector((state) => state.reducers.currentBot),
	);
	const theme = useSelector((state) => state.reducers.theme);
	const handleEdit = (chat) => {
		if (payload === '')
			return alert("edited message can't be empty.");
		setEdit(false);
		setOpen(false);

		editMessages(chat, payload);
	};

	const avatar = contact.find((item) => item.id == botId)?.avatar;
	return (
		<div
			className='messages-window'
			style={{ background: theme === THEME.DARK ? 'black' : 'white' }}
		>
			<div className='pinned'>
				{pinned?.map((pin) => (
					<a href={`#${pin.message.message}`}>
						<span>{pin.message.message}</span>
					</a>
				))}
			</div>

			{messages && messages?.length > 0 ? (
				messages?.map((chat, ind) => (
					<div
						className={cx(chat?.author == 'bot' ? 'bot' : 'author')}
						id={chat.message}
					>
						{chat?.author == 'bot' &&
						messages[ind - 1]?.author === 'user' ? (
							<img className='avatar' src={avatar} alt='' />
						) : (
							<div className='avatar'></div>
						)}
						<div
							onMouseOver={() =>
								setMsgId({ id: chat.id, auth: chat.author })
							}
							onMouseLeave={() => {
								open && setOpen(false);
								edit && setEdit(false);
							}}
							className={cx(
								chat?.author !== 'bot' ? 'author-color' : 'bot-color',
							)}
						>
							<p>{chat?.message}</p>
							<p style={{ fontSize: '9px' }}>{chat?.date}</p>
							<div onClick={() => setOpen(!open)} className='options'>
								<div>.</div>
								<div>.</div>
								<div>.</div>
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
										<div
											onClick={() => {
												setPayload(chat.message);
												setOpen(false);
												setEdit(true);
											}}
										>
											Edit
										</div>
										<div
											onClick={() => {
												setOpen(false);
												delteMessages(chat.id);
											}}
										>
											Delete
										</div>
									</div>
								)}
							{edit &&
								msgId.id === chat.id &&
								msgId.auth === chat.author && (
									<div className='editBox'>
										<input
											type='text'
											value={payload}
											onChange={(e) => setPayload(e.target.value)}
										/>
										<button onClick={() => handleEdit(chat)}>
											Done
										</button>
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

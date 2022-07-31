import './App.css';
import Login from './components/login/Login';
import Chat from './components/chat/Chat';
import Navbar from './components/header/Navbar';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/signup/Signup';

function App() {
	return (
		<div className='App'>
			{/* <Navbar /> */}
			<Routes>
				<Route path='/signup' element={<Signup />} />
				<Route path='/' element={<Login />} />
				<Route path='/chat' element={<Chat />} />
			</Routes>
		</div>
	);
}

export default App;

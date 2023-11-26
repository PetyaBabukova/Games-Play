import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as authService from './services/authService';
import { AuthProvider } from './contexts/authContext';
import Path from './paths';


import Header from "./components/header/Header";
import Home from "./components/home/Home";
import GameList from './components/game-list/GameList';
import GameCreate from './components/game-create/GameCreate';
import Login from './components/login/Login';
import Register from './components/register/Register';
import GameDetails from './components/game-details/GameDetails';
import Logout from './components/logout/Logout';



function App() {
	const navigate = useNavigate();
	const [auth, setAuth] = useState(()=>{ 
		localStorage.removeItem('accessToken'); //This is for asuure that the localStorrage is empty
		return {};
	});

	const loginSubmitHandler = async (values) => {
		try {
			const result = await authService.login(values.email, values.password);
			setAuth(result);

			localStorage.setItem('accessToken', result.accessToken);

			navigate(Path.Home);
		} catch (error) {
			console.error('Login failed:', error);
			// Handle the error appropriately
			// For example, you might want to set an error state, show a message to the user, etc.
		}
	};


	const registerSubmitHandler = async (values) => {
		//Validations!
		const result = await authService.register(values.email, values.password);
		setAuth(result);

		localStorage.setItem('accessToken', result.accessToken);

		navigate(Path.Home);
	};

	const logoutHandler = () => {

		localStorage.removeItem('accessToken');

		setAuth({});
	}

	const values = {
		registerSubmitHandler,
		loginSubmitHandler,
		logoutHandler,
		username: auth.username || auth.email,
		email: auth.email,
		isAuthenticated: !!auth.email // First variant
		// isAuthenticated: !!auth.accessToken,
	};



	return (
		<AuthProvider value={values}>

			<div id="box">
				<Header />
				<Routes>
					<Route path={Path.Home} element={<Home />} />
					<Route path='/games' element={<GameList />} />
					<Route path='/games/create' element={<GameCreate />} />
					<Route path={Path.Logout} element={<Logout />} />
					{/* Without useContext */}
					{/* <Route path='/login' element={<Login loginSubmitHandler={loginSubmitHandler} />} />  */}

					{/* ith useContext */}
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/games/:gameId' element={<GameDetails />} />
				</Routes>
			</div>

		</AuthProvider>
	)
}

export default App

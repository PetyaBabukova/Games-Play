import { createContext, useState } from "react";

import { useNavigate } from 'react-router-dom'
import Path from '../paths';


import * as authService from '../services/authService';
import usePersistedState from "../hooks/usePersistedState";


const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {});

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
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContext.displayName = 'AuthContext'

export default AuthContext;
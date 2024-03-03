import { useState } from 'react';
import tokens from '../services/tokens';

function useToken() {
    console.log("enters useToken");
    const getToken = () => {
        var tokenString = sessionStorage.getItem('token');
        console.log("token from session is " + tokenString)
        return tokenString
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        localStorage.setItem('token', userToken);
        console.log(`the saved token is ${sessionStorage.getItem('token')}`);
        setToken(userToken);
    }

    return {
        setToken: saveToken,
        token
    }
}

export function saveToken(token) {
    console.log("returnted data is " + JSON.stringify(token));
    sessionStorage.setItem("jwt", token)    
}
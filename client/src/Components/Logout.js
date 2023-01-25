import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Logout(){
    const navigate = useNavigate()

    const toLogIn = () => {
        localStorage.clear();
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = window.history.go(1);
        setTimeout(() => navigate("/login"), 700)
    }

    return (
        <>
            <h1>You logged out successfully</h1>
            <>{toLogIn()}</>
        </>
    )
}
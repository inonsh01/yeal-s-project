import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import '../styles/login.css'

export default function Login() {
    const { username, setUsername } = useContext(AppContext);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("3159");
    const [flag, setFlag] = useState(false)
    const navigate = useNavigate();

    if (localStorage.getItem('currentUser', username)) {
        localStorage.removeItem('currentUser', username)
    }

    //enable going back in history
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = window.history.go(1);

    async function sendReq(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password })
            })

            const data = await response.json();
            console.log(data);
            if (!data) {
                setFlag(true)
                return
            }
            else {
                localStorage.setItem('currentUser', JSON.stringify({"username":username, id: data}))
                setName(username)
                navigate(`../users/${data}/home`);
            }
        }
        catch (error) {
            console.log('error: ', error)
        }
    }

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={(e) => sendReq(e)}>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input onChange={(e) => setName(e.target.value)} value={username} type="text" className="login__input" placeholder="Username" minLength={4} maxLength={16} required />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="login__input" placeholder="Password" minLength={4} maxLength={16} required />
                        </div>
                        <button type='submit' className="button login__submit">
                            <span className="button__text">Log In Now</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>

                    </form>
                    <p className='log-in-btn'>Don't have an account? <NavLink className="log-in-link" to={"./register"}>Register</NavLink></p>
                    <p className='log-in-btn'>{flag ? "One or more of the details are incorrect" : null}</p>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    )
}

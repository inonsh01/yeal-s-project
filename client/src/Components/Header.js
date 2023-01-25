import React from 'react';
import { NavLink } from 'react-router-dom';
// import "../css/Header.css"

function Header() {
    const userData = JSON.parse(localStorage.getItem("currentUser"))
    const id = userData.id;
    return (
        <div id='header-div'>
            <ul>
                <li className='header'><NavLink to={`/users/${id}/home`}>Home</NavLink></li>
                <li className='header'><NavLink to={`/users/${id}/info`}>Info</NavLink></li>
                <li className='header'><NavLink to={`/users/${id}/todo`}>To Do</NavLink></li>
                <li className='header'><NavLink to={`/users/${id}/posts`}>Posts</NavLink></li>
                <li className='header' id="navRight"><NavLink to={`/users/${id}/logout`}>Logout</NavLink></li>
            </ul>
        </div>
    )
}

export default Header;
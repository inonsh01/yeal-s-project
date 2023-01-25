import { useEffect, useState } from "react";
import Header from "./Header.js";
// var path = require('path');

// app.use(express.static(path.join(__dirname, 'public')));

export function Home() {
    const [username, setUsername] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("currentUser"))
        setUsername(userData.username)
    }, [])

    console.log(window.location.pathname)

    return (
        <>
            <Header />
            <h1 className=''> Hello {username}</h1>
            <h3 className='home'>Welcome to your profile</h3>
            <hr/>
        </>
    )
}

export default Home;
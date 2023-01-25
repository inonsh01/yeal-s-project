import { useEffect, useState } from "react";
// var path = require('path');

// app.use(express.static(path.join(__dirname, 'public')));

export function Home(props) {
    const [userName, setUserName] = useState([]);

    // useEffect(() => {
    //     setUserName(props.userName)
    // }, [props.userName])

    // console.log(path)

    return (
        <>
            {/* <Header id={props.id} /> */}
            <h1 className=''> Hello {userName}</h1>
            <h3 className='home'>Welcome to your profile</h3>
            <hr/>
        </>
    )
}

export default Home;
import React, { useRef, useEffect, useState } from 'react';
import Header from './Header.js';

function ToDo() {
    const userData = JSON.parse(localStorage.getItem("currentUser"))
    const [userToDo, setUserToDo] = useState("");
    // const [mapToDo, ]
    const refToDo = useRef('')

    useEffect(() => {
        sendReq()
    }, [])

    async function sendReq() {
        try {
            const response = await fetch(`http://localhost:4000/users/:id/todo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userData.id })
            })
            const data = await response.json();
            setUserToDo(data)
        }
        catch (error) {
            console.log('error: ', error)
        }
    }

    const changeElComplete = (index) => {
        const tempUserToDo = [...userToDo];
        tempUserToDo[index].completed = tempUserToDo[index].completed ? false : true;
        setUserToDo(tempUserToDo)
        refToDo.current = tempUserToDo;
    }
    
    console.log("userToDo:   ", userToDo)
    // userToDo&&userToDo?.map((item, index) => {console.log(item)})
    let mapToDo = userToDo&&userToDo?.map((item, index) => {
        <li className="to-do-list" key={Math.random()} /*style={props.item.completed ? { backgroundColor: "rgb(10, 227, 10)" } : null}*/>
            <p>id: {item.tood_id}</p>
            {item.completed=0 ? (
                <div>
                    <input id={index} type="checkbox" onChange={() => changeElComplete(index)}></input>
                    <labitem htmlFor={index}>{item.title}</labitem>
                </div>
            ) : <p>{item.title}</p>}
        </li>
    })
    console.log("🚀 ~ file: ToDo.js:48 ~ mapToDo ~ mapToDo", mapToDo)
    return (
        <>
            <Header /><br />
            <div id='info-div'>
                <h1>To Do Page</h1><br />
                {/* <h3>First Name: {userInfo?.first_name}</h3>
        <h3>Last Name: {userInfo?.last_name}</h3>
        <h3>Email: {userInfo?.email}</h3>
        <h3>Phone: {userInfo?.phone}</h3> */}
                <ul>{mapToDo}</ul>
            </div>
        </>
    );
}

export default ToDo;
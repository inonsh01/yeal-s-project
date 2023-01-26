import React, { useRef, useEffect, useState } from 'react';
import Header from './Header.js';
import '../styles/ToDo.css'

function ToDo() {
    const userData = JSON.parse(localStorage.getItem("currentUser"))
    const [userToDo, setUserToDo] = useState("");
    const [mapToDo, setMapToDo] = useState([]);

    useEffect(() => {
        sendReq();
    }, [])

    useEffect(() => {
        makingToDoList();
    }, [userToDo])

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
        tempUserToDo[index].complited = tempUserToDo[index].complited === 0 ? 1 : 0;
        setUserToDo(tempUserToDo)
    }

    const sortByComplited = () => {
        const tempUserToDo = [...userToDo];
        tempUserToDo.sort((a, b) => {
          if (a.complited === 1) { return 1; }
          return -1;});
        setUserToDo(tempUserToDo);
      };

      const sortById = () => {
        const tempUserToDo = [...userToDo];
        tempUserToDo.sort((a, b) => a.tood_id - b.tood_id);
        setUserToDo(tempUserToDo);
      };

      const sortByAlphabet = () => {
        const tempUserToDo = [...userToDo];
        tempUserToDo.sort((a, b) => a.title.localeCompare(b.title));
        setUserToDo(tempUserToDo);
      };

      const sortRandomly = () => {
        const tempUserToDo = [...userToDo];
        tempUserToDo.sort(() => 0.5 - Math.random());
        setUserToDo(tempUserToDo);
      };

    function makingToDoList() {
        setMapToDo(userToDo && userToDo?.map((item, index) =>
            <li className="todo-li" key={Math.random()} /*style={props.item.complited ? { backgroundColor: "rgb(10, 227, 10)" } : null}*/>
                <p className='id-p'>id: {item.tood_id}</p>
                <p>complited: {item.complited === 0 ? "no" : "yes"}</p>
                <div>
                    <input id={index} checked={item.complited === 0 ? false : true} type="checkbox" onChange={() => changeElComplete(index)}></input>
                    <label>{item.title}</label>
                </div>
            </li>
        ))
    }

    return (
        <>
            <Header /><br />
            <div id='todo-div'>
                <h1>To Do Page</h1><br />
                <div>
                    <button className="todo-button" onClick={sortByComplited}>sort by complited posts</button>
                    <button className="todo-button" onClick={sortById}>sort by posts id</button>
                    <button className="todo-button" onClick={sortByAlphabet}>sort by alphabet</button>
                    <button className="todo-button" onClick={sortRandomly}>sort randomly</button>
                </div>
                <ul>{mapToDo}</ul>
            </div>
        </>
    );
}

export default ToDo;
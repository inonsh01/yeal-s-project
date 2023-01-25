import React, { useRef, useEffect, useState } from 'react';
import Header from './Header.js';
// import '../css/Info.css'

function Info() {
  const userData = JSON.parse(localStorage.getItem("currentUser"))
  const [userInfo, setUserInfo] = useState("")

  useEffect(() => {
    sendReq()
  }, [])

  async function sendReq() {
    try {
      const response = await fetch(`http://localhost:4000/users/:id/info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: userData.id})
      })
        const data = await response.json();
        setUserInfo(data)
    }
    catch (error) {
        console.log('error: ', error)
    }
}

  return (
    <>
      <Header /><br/>
      <div id='info-div'>
        <h1>Info Page</h1><br/>
        <h3>First Name: {userInfo?.first_name}</h3>
        <h3>Last Name: {userInfo?.last_name}</h3>
        <h3>Email: {userInfo?.email}</h3>
        <h3>Phone: {userInfo?.phone}</h3>
      </div>
    </>
  );
}

export default Info;
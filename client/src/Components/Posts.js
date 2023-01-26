import React, { useEffect, useState } from 'react';
import Header from './Header.js';
import Post from './Post.js';
import '../styles/posts.css';

export default function Posts() {
    const userData = JSON.parse(localStorage.getItem("currentUser"));
    const [allPosts, setAllPOsts] = useState();
    const [body, setBody] = useState();
    const [title, setTitle] = useState();
    const [form, setForm] = useState(false);

    useEffect(() => {
        sendReq();
    }, [])

    async function sendReq() {
        try {
            const response = await fetch(`http://localhost:4000/users/${userData.id}/posts`);
            const data = await response.json();
            setAllPOsts(data);
        }
        catch (error) {
            console.log('error: ', error)
        }
    }

    async function addPost() {
        try {
            const response = await fetch(`http://localhost:4000/users/${userData.id}/posts`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ post_title: title, post_body: body, user_id: userData.id, deleted: 0 })
                });
            const data = await response.json();
            setAllPOsts(data);
        }
        catch (error) {
            console.log('error: ', error)
        }
    }
    return (
        <div>
                  <Header /><br/>
            <h1>All My Posts</h1>
            <br></br>
            <button onClick={()=>setForm(!form)}><h4>Add Post</h4></button>
            <form onSubmit={addPost} style = {form ? {display:'block'} : {display:'none'}}>
                <label>title</label><input onChange={(e) => setTitle(e.target.value)} type="text"></input>
                <br></br>
                <label>body</label><input onChange={(e) => setBody(e.target.value)} type="text"></input>
                <button type="submit">submit</button>
            </form>
            <br></br><br></br>
            <div className='posts'>{
                allPosts &&
                allPosts.map(el =>
                    <Post setAllPOsts = {setAllPOsts} userData={userData} postDet={el} />
                )
            }</div>
        </div>
    )
}

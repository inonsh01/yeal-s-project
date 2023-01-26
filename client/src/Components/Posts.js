import React, { useEffect, useState } from 'react';
import Post from './Post.js';
import '../styles/posts.css';

export default function Posts() {
    const userData = JSON.parse(localStorage.getItem("currentUser"));
    const [allPosts, setAllPOsts] = useState();
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
    return (
        <div>
            <h1>All My Posts</h1>
            <br></br>
            <div className='posts'>{
                allPosts &&
                allPosts.map(el =>
                    <Post userData = {userData} postDet = {el} />
                )
            }</div>
        </div>
    )
}

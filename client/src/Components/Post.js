import React, { useState } from 'react'
import '../styles/post.css';
import { FaEdit, FaTimes } from "react-icons/fa";

export default function Post(props) {
    let postDetail = props.postDet;
    const [comments, setComments] = useState();
    const [clicked, setClicked] = useState(false);
    const [edit, setEdit] = useState(false);
    const [body, setBody] = useState(postDetail.post_body);
    const [title, setTitle] = useState(postDetail.post_title);
    const [addComm, setAddComm] = useState(false);
    const [commentTitle, setCommentTitle] = useState();
    const [commentBody, setCommentBody] = useState();


    async function getComments() {
        if (clicked) {
            setComments();
            setClicked(false);
            return;
        }
        setClicked(true)
        try {
            const response = await fetch(`http://localhost:4000/users/${props.userData.id}/posts/${postDetail.post_id}`);
            const data = await response.json();
            setComments(data);
        }
        catch (error) { console.log('error: ', error) }
    }

    async function updatePost() {
        try {
            const response = await fetch(`http://localhost:4000/users/${props.userData.id}/posts/${postDetail.post_id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ post_title: title, post_body: body, user_id: props.userData.id, deleted: 0 })
                });
            const data = await response.json();
            props.setAllPOsts(data);
            setEdit(false);
        }
        catch (error) { console.log('error: ', error) }
    }

    async function removePost() {
        try {
            const response = await fetch(`http://localhost:4000/users/${props.userData.id}/posts/${postDetail.post_id}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ field: postDetail.post_id })
                });
            const data = await response.json();
            props.setAllPOsts(data);
            setEdit(false);
        }
        catch (error) { console.log('error: ', error) }
    }

    async function addComment() {
        try {
            const response = await fetch(`http://localhost:4000/users/${props.userData.id}/posts/${postDetail.post_id}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ post_id: postDetail.post_id, comment_title: commentTitle, comment_body: commentBody, deleted: 0, user_id: props.userData.id })
                });
            const data = await response.json();
            setAddComm(false);
            setClicked(false);
            getComments();
        }
        catch (error) { console.log('error: ', error) }
    }

    return (
        <div className='div-list'>
            <ul className='post-ul'>
                <FaTimes id='fa-remove' onClick={removePost} />
                {edit ? <input value={title} onChange={(e) => setTitle(e.target.value)} type='text'></input> : <li id='title' className='post-li'>{postDetail.post_title}</li>}
                {edit ? <input value={body} onChange={(e) => setBody(e.target.value)} type='text'></input> : <li id='body' className='post-li'>{postDetail.post_body}</li>}
                {edit && <button onClick={updatePost} type='submit'>update</button>}
                <FaEdit onClick={() => setEdit(!edit)} />
            </ul>
            <button onClick={getComments}>comments</button>
            <button onClick={() => setAddComm(!addComm)}>Add comment</button>
            <div>
                {addComm &&
                    <div>
                        <input type="text" onChange={(e) => setCommentTitle(e.target.value)}></input>
                        <input type="text" onChange={(e) => setCommentBody(e.target.value)}></input>
                        <button onClick={addComment}>submit</button>
                    </div>
                }
                {comments &&
                    comments.map(el =>
                        <ul className='comment-ul'>
                            <li id='name' className='comment-li'>{el.first_name + " " + el.last_name}</li>
                            <li id='title-and-body' className='comment-li'>{el.comment_title}{el.comment_body}</li>
                            {/* <li id='body' className='comment-li'>{el.comment_body}</li> */}
                            <br></br>
                        </ul>
                    )}
            </div>
        </div>
    )
}

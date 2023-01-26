import React, { useState } from 'react'
import '../styles/post.css';

export default function Post(props) {
    const [comments, setComments] = useState();
    const [clicked, setClicked] = useState(false);
    let postDetail = props.postDet;

    async function getComments(postId) {
        if (clicked) {
            setComments();
            setClicked(false);
            return;
        }
        setClicked(true)
        try {
            const response = await fetch(`http://localhost:4000/users/${props.userData.id}/posts/${postId}`);
            const data = await response.json();
            console.log(data);
            setComments(data);
        }
        catch (error) {
            console.log('error: ', error)
        }
    }

    return (
        <div className='div-list'>
            <ul className='post-ul'>
                <li id='title' className='post-li'>{postDetail.post_title}</li>
                <li id='body' className='post-li'>{postDetail.post_body}</li>
            </ul>
            <button onClick={() => getComments(postDetail.post_id)}>comments</button>
            <div>
                {comments &&
                    comments.map(el =>
                        <ul className='comment-ul'>
                            <li id='title' className='comment-li'>{el.comment_title}</li>
                            <li id='body' className='comment-li'>{el.comment_body}</li>
                        </ul>
                    )}
            </div>
        </div>
    )
}

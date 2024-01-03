import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from './createPost';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { ProgressSpinner } from 'primereact/progressspinner';
export default function UserPosts(props) {
    const [post, setPost] = useState([])
    const [createPost, setCreatePost] = useState(false)
    const [loading, setLoading] = useState(false)
    const [notPosts, setNotPosts] = useState(false)
    const Myheader = `${props.user.name} posts`;

    useEffect(() => {

        setLoading(true);

        // Set a timeout for fetching posts
        const timeoutId = setTimeout(() => {
            setNotPosts(true)
            // Set error state or display a message after a timeout
            setLoading(false);
        }, 10000);

        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${props.user.id}`)
            .then(response => {
                clearTimeout(timeoutId);
                setPost(response.data);
                setLoading(false);
                setNotPosts(false)
            })
            .catch(error => {
                clearTimeout(timeoutId);
                console.error('Error fetching posts:', error);
                setLoading(false);
            });
        return () => clearTimeout(timeoutId);
    }, [props.user.id]);

    const itemTemplate = (item) => {
        return (
            <>
                <Panel header={item.title}>
                    <p className="m-0">
                        {item.body}

                    </p>
                </Panel>
            </>
        )
    };
    return (
        <div>
            {loading ? (<div className="card flex justify-content-center">
                <ProgressSpinner />
            </div>) :
                (<>
                        {notPosts ? <div>Error fetching posts for user {props.user.name}. Please try again later.</div> : (<>


                            <div className="card flex justify-content-center">
                                <div className="card">
                                    <DataScroller
                                        value={post}
                                        itemTemplate={itemTemplate}
                                        rows={post.length}
                                        inline
                                        scrollHeight="500px"
                                        header={Myheader} />
                                </div>
                            </div>
                            <div className="card flex justify-content-center">
                                <Button
                                    label="create more post"
                                    onClick={() => { setCreatePost(true); console.log(post) }} />
                            </div></>)}</>)}
            {createPost ? <CreatePost user={props.user} post={post} setPost={setPost} visible1={true} setCreatePost={setCreatePost}></CreatePost> : <></>}
        </div>
    )
}
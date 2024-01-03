import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";

export default function CreatePost(props) {
    const [visible, setVisible] = useState(props.visible1);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    
    const closeCanceled=()=>
    {
        setVisible(false)
        props.setCreatePost(false)
    }

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => closeCanceled()} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => savePost()} autoFocus />
        </div>
    );

    const savePost = () => {


        props.setCreatePost(false)//to close the dialog
//save in the posts array
        
        const myPost = {
            userId: props.user.id,
            title: title,
            body: body,
        };
        setBody("")
        setTitle("")
        setVisible(false)
        props.setPost(prevPosts => [...props.post, myPost]);
        //if its was real...
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: myPost,
                userId: props.userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
    return (
        <Dialog header="Create new post" visible={visible} style={{ width: '20vw' }} onHide={() => setVisible(false)} footer={footerContent}>
            <br></br>
            <span className="p-float-label">
                <InputText value={title} onChange={(e) => setTitle(e.target.value)} />
                <label >enter a tltle:</label>
            </span>
            <br></br>
            <span className="p-float-label">

                <InputText value={body} onChange={(e) => setBody(e.target.value)} />
                <label >enter a body:</label>
            </span>
        </Dialog>
    )
}
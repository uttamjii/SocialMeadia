import { Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import "./NewPost.css"
import { useSelector, useDispatch } from "react-redux"
import { createNewPost } from '../../Actions/Post'
import { useAlert } from "react-alert"
import { loadUser } from '../../Actions/User'

const NewPost = () => {

    const alert = useAlert()
    const [image, setImage] = React.useState(null);
    const [caption, setCaption] = React.useState('');

    const { loading, error, message } = useSelector(state => state.like);
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();

        Reader.onload = (e) => {
            if (Reader.readyState === 2) {
                setImage(e.target.result);
                // setImage(Reader.result);
            }
        }

        Reader.readAsDataURL(file);

    }


    const submitHandler =async (e) => {
        e.preventDefault();
      await  dispatch(createNewPost(caption, image));
        dispatch(loadUser())

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({type:"clearError"});
        }
        if (message) {
            alert.success(message);
            dispatch({type:"clearMessage"});
        }

    }, [dispatch, alert, error, message]);

    return (
        <div className="newPost">
            <form className="newPostForm" onSubmit={submitHandler}>

                <Typography variant="h3">New Post</Typography>

                {image && <img src={image} alt="newPost" />}

                <input type="file" accept="image/*" onChange={handleImageChange} />
                <input type="text" placeholder="Capion..." value={caption} onChange={(e) => setCaption(e.target.value)} />

                <Button disabled={loading} type="submit">Post</Button>



            </form>
        </div>)
}

export default NewPost
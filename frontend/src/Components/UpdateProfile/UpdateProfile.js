import { Avatar, Button, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import "./UpdateProfile.css"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, updateProfile } from "../../Actions/User"
import { useAlert } from 'react-alert'
import Loader from '../Loader/Loader'

const UpdateProfile = () => {
    const { loading, error, user } = useSelector(state => state.user);
    const { loading: updateLoading, error: updateError, message } = useSelector(state => state.like);

    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [avatar, setAvatar] = useState("");
    const [avatarPre, setAvatarPre] = useState(user.avatar.url);


    const alert = useAlert()
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
                setAvatarPre(Reader.result);
            }
        }

        Reader.readAsDataURL(file);

    }


    const submitHandler = async(e) => {
        e.preventDefault();
      await  dispatch(updateProfile(name, email, avatar));
      dispatch(loadUser());

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: 'clearError' })
        }
        if (updateError) {
            alert.error(updateError);
            dispatch({ type: 'clearError' })
        }
        if (message) {
            alert.success(message);
            dispatch({ type: 'clearMessage' })
        }
    }, [alert, error, dispatch, updateError, message])

    return (
        loading ? <Loader /> : (

            <div className="updateProfile">

                <form className="updateProfileForm" onSubmit={submitHandler}>

                    <Typography variant="h3" style={{ padding: "2vmax" }}>
                        Update Profile
                    </Typography>

                    <Avatar src={avatarPre} alt="User"
                        sx={{ height: "10vmax", width: "10vmax" }}
                    />

                    <input type="file"
                        accept='image/*'
                        onChange={handleImageChange}
                    />

                    <input type="text"
                        placeholder="Name"
                        required
                        value={name}
                        className="updateProfileInputs"
                        onChange={(e) => setName(e.target.value)} />


                    <input
                        type="email"
                        placeholder="Email"
                        className="updateProfileInputs"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button disabled={updateLoading} type="submit">Update</Button>

                </form>

            </div>
        )
    )
}

export default UpdateProfile
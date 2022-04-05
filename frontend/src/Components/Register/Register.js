import { Avatar, Button, Typography} from '@mui/material'
import React, { useState, useEffect} from 'react'
import "./Register.css"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { registerUser } from "../../Actions/User"
import { useAlert } from 'react-alert'

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("https://www.kindpng.com/picc/m/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png");

    const {loading ,error} = useSelector(state => state.user);
    const alert = useAlert()
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
            }
        }

        Reader.readAsDataURL(file);

    }


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser(name, email, password, avatar));

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({type:'clearError'})
        }
    } , [alert, error, dispatch])

    return (
        <div className="register">

            <form className="registerForm" onSubmit={submitHandler}>

                <Typography variant="h3" style={{ padding: "2vmax" }}>
                    Social App
                </Typography>

                <Avatar src={avatar} alt="User"
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
                    className="registerInputs"
                    onChange={(e) => setName(e.target.value)} />


                <input
                    type="email"
                    placeholder="Email"
                    className="registerInputs"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="registerInputs"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button disabled={loading} type="submit">Sign Up</Button>

                <Link to="/">
                    <Typography>Already Singned Up? Login Now</Typography>
                </Link>
            </form>

        </div>
    )
}

export default Register
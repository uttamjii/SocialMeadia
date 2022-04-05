import React from 'react'
import "./ResetPassword.css";

import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { resetPassword } from '../../Actions/User';
import { Link, useParams } from 'react-router-dom';

const ResetPassword = () => {

    const [newPassword, setNewPassword] = React.useState("");

    const dispatch = useDispatch();
    const alert = useAlert()
    const { error, loading, message } = useSelector(state => state.like);

    const { token } = useParams();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(token, newPassword));
    }
    React.useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearError" })
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" })
        }
    }, [error, loading, message, dispatch, alert]);

    return (
        <div className="resetPassword">
            <form className="resetPasswordForm" onSubmit={submitHandler}>
                <Typography variant="h3" style={{ padding: "2vmax" }}>
                    Reset Password
                </Typography>

                <input
                    type="password"
                    placeholder=" New Password"
                    required
                    className="resetPasswordInputs"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <Button disabled={loading} type="submit">Reset Password</Button>

                <Link to="/">
                <Typography>Login</Typography>  </Link>
                
                <Typography>Or</Typography>

                <Link to="/forgot/password">
                <Typography>Request Another Token</Typography>  </Link>

               
            </form>
        </div>
    )
}

export default ResetPassword
import { Typography , Button} from '@mui/material';
import React from 'react'
import { useDispatch ,useSelector } from 'react-redux';
import { getAllUsers } from '../../Actions/User';
import "./Search.css";
import User from '../User/User';

const Search = () => {
    const [search, setSearch] = React.useState('');

    const dispatch = useDispatch();
    const { users, loading: usersLoading } = useSelector(state => state.allUsers);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllUsers(search));
    }
  return (
    
    <div className="search">

    <form className="searchForm" onSubmit={submitHandler}>

        <Typography variant="h3" style={{ padding: "2vmax" }}>
            Search Users
        </Typography>

        <input type="text"
            placeholder="Name"
            required
            value={search}
            className="updateProfileInputs"
            onChange={(e) => setSearch(e.target.value)} />

        <Button disabled={usersLoading} type="submit">Search</Button>

        <div className="searchResults">
        {
            users && users.map(user => (
                <User
                    key={user._id}
                    userId={user._id}
                    name={user.name}
                    avatar={user.avatar.url}
                />
            ))
        }
    </div>
    </form>

   

</div>
  )
}

export default Search
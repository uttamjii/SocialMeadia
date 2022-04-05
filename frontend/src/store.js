import { configureStore } from "@reduxjs/toolkit";
import { userReducer, postOfFollowingReducer, allUsersReducer, userProfileReducer } from "./Reducers/User";
import { likeReducer, myPostsReducer, userPostReducer } from "./Reducers/Post";


const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allUsersReducer,
        like: likeReducer,
        myPosts: myPostsReducer,
        userProfile: userProfileReducer,
        userPosts: userPostReducer
    }
});

export default store;
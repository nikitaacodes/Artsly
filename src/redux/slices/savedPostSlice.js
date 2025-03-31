import { createSlice } from "@reduxjs/toolkit";
import { clearSavedPosts, toggleSavePost } from "./savedPostsSlice";
const initialState = {
    savedPosts : [],
};

const savedPostsSlice = createSlice
(
    {
        name : "savedPosts",
initialState,
reducers : {
    toggleSavePost : (state,action) => {
        const postId = action.payload;
        const index = state.savedPosts.indexOf(postId);
 if (index == -1) {
    state.savedPosts.push(postId);
 }
 else{
    state.savedPosts.splice(index,1);
 }
    },
    clearSavedPosts : (state) => {
        state.savedPosts = [];
    },
},
    }
);

export const {toggleSavePost, clearSavedPosts} = savedPostsSlice.actions;
export default savedPostsSlice.reducer;
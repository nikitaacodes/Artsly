import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedPosts: {}, // { postId: true/false }
  likeCounts: {}, // { postId: number }
};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const postId = action.payload;
      state.likedPosts[postId] = !state.likedPosts[postId];
      state.likeCounts[postId] = state.likedPosts[postId]
        ? (state.likeCounts[postId] || 0) + 1
        : (state.likeCounts[postId] || 1) - 1;
    },
    setLikeCount: (state, action) => {
      const { postId, count } = action.payload;
      state.likeCounts[postId] = count;
    },
    setLikedStatus: (state, action) => {
      const { postId, isLiked } = action.payload;
      state.likedPosts[postId] = isLiked;
    },
  },
});

export const { toggleLike, setLikeCount, setLikedStatus } = likesSlice.actions;
export default likesSlice.reducer;

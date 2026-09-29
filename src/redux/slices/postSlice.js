import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postAPI } from "../../utils/api";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postAPI.createPost(data);
      return response.data.post;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await postAPI.deletePost(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await postAPI.likePost(id);
      return { id, likes: response.data.likes };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const sharePost = createAsyncThunk(
  "posts/sharePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await postAPI.sharePost(id);
      return { id, shares: response.data.shares };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addPost: (state, action) => {
      state.items.unshift(action.payload);
    },
    setPosts: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post._id !== action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.items.find((p) => p._id === action.payload.id);
        if (post) {
          post.likes = action.payload.likes;
        }
      })
      .addCase(sharePost.fulfilled, (state, action) => {
        const post = state.items.find((p) => p._id === action.payload.id);
        if (post) {
          post.shares = action.payload.shares;
        }
      });
  },
});

export const { addPost, setPosts } = postSlice.actions;
export default postSlice.reducer;

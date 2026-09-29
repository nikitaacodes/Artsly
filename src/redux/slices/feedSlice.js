import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { feedAPI, commentAPI } from "../../utils/api";

export const fetchFeed = createAsyncThunk(
  "feed/fetchFeed",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await feedAPI.getFeed(page, limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchTrending = createAsyncThunk(
  "feed/fetchTrending",
  async (_, { rejectWithValue }) => {
    try {
      const response = await feedAPI.getTrending();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const addComment = createAsyncThunk(
  "feed/addComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await commentAPI.createComment(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const removeComment = createAsyncThunk(
  "feed/removeComment",
  async ({ commentId, postId }, { rejectWithValue }) => {
    try {
      await commentAPI.deleteComment(commentId);
      return { commentId, postId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    posts: [],
    trending: [],
    loading: false,
    trendingLoading: false,
    error: null,
    pagination: { page: 1, pages: 1, total: 0 },
  },
  reducers: {
    clearFeed: (state) => {
      state.posts = [];
      state.pagination = { page: 1, pages: 1, total: 0 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTrending.pending, (state) => {
        state.trendingLoading = true;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.trendingLoading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.trendingLoading = false;
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p._id === action.payload.post);
        if (post) {
          post.comments.push(action.payload);
        }
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p._id === action.payload.postId);
        if (post) {
          post.comments = post.comments.filter(
            (c) => c._id !== action.payload.commentId,
          );
        }
      });
  },
});

export const { clearFeed } = feedSlice.actions;
export default feedSlice.reducer;

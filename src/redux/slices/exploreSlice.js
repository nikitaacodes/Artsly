import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trendingTopics: [
    {
      id: 1,
      name: "digital art",
      posts: 1245,
    },
    {
      id: 2,
      name: "photography",
      posts: 345,
    },
    {
      id: 3,
      name: "illustration",
      posts: 885,
    },
    {
      id: 4,
      name: "3d modelling",
      posts: 235,
    },
  ],
  categories: [
    {
      id: 1,
      name: "art",
      icon: "🎨",
      color: "bg-pink-100",
    },
    {
      id: 2,
      name: "photography",
      icon: "📸",
      color: "bg-blue-100",
    },
    {
      id: 3,
      name: "design",
      icon: "✨",
      color: "bg-purple-100",
    },
    {
      id: 4,
      name: "animation",
      icon: "🎬",
      color: "bg-green-100",
    },
    {
      id: 5,
      name: "3d",
      icon: "🎮",
      color: "bg-red-100",
    },
  ],
  searchQuery: "",
  searchResults: [],
};

const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
});

export const { setSearchQuery, setSearchResults, clearSearchResults } =
  exploreSlice.actions;
export default exploreSlice.reducer;

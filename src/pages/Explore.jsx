import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSearchQuery,
  setSearchResults,
  clearSearchResults,
} from "../redux/slices/exploreSlice";
import { feedInfo } from "../utils/FeedData";
import Iconbar from "../components/Iconbar";

const Explore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Add default values to prevent destructuring errors
  const exploreState = useSelector((state) => state.explore) || {
    trendingTopics: [],
    categories: [],
    searchQuery: "",
    searchResults: [],
  };

  const { trendingTopics, categories, searchQuery, searchResults } =
    exploreState;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Filter topics, categories, and users based on search query
      const results = [
        ...trendingTopics.filter((topic) =>
          topic.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        ...categories.filter((category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        ...feedInfo
          .filter(
            (user) =>
              user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.username.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((user) => ({
            id: `user-${user.id}`,
            name: user.name,
            username: user.username,
            profilePic: user.profilePic,
            type: "user",
          })),
      ];
      dispatch(setSearchResults(results));
    } else {
      dispatch(clearSearchResults());
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
    if (!value.trim()) {
      dispatch(clearSearchResults());
    }
  };

  const handleTopicClick = (topicName) => {
    // Navigate to feed with topic filter
    navigate(`/feed?topic=${encodeURIComponent(topicName)}`);
  };

  const handleCategoryClick = (categoryName) => {
    // Navigate to feed with category filter
    navigate(`/feed?category=${encodeURIComponent(categoryName)}`);
  };

  const handleUserClick = (username) => {
    // Navigate to user profile
    navigate(`/profile/${username}`);
  };

  return (
    <div className="flex flex-row bg-gray-50">
      <div>
        {" "}
        <Iconbar />{" "}
      </div>
      <div className="w-full mx-auto px-5 pt-5">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore</h1>
          <p className="mt-2 text-gray-600">
            Discover new artists, topics, and creative inspiration
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search artists, topics, or categories..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              🔍
            </button>
          </form>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    if (result.type === "user") {
                      handleUserClick(result.username);
                    } else if (result.posts) {
                      handleTopicClick(result.name);
                    } else {
                      handleCategoryClick(result.name);
                    }
                  }}
                >
                  {result.type === "user" ? (
                    <div className="flex items-center space-x-3">
                      <img
                        src={result.profilePic}
                        alt={result.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {result.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          @{result.username}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-medium text-gray-900 capitalize">
                        {result.name}
                      </h3>
                      {result.posts && (
                        <p className="text-sm text-gray-500 mt-1">
                          {result.posts} posts
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending Topics */}
        {!searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Trending Topics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trendingTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleTopicClick(topic.name)}
                >
                  <h3 className="font-medium text-gray-900 capitalize">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {topic.posts} posts
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {!searchQuery && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`${category.color} p-4 rounded-lg text-center cursor-pointer hover:opacity-90 transition-opacity`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <span className="text-3xl mb-2 block">{category.icon}</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;

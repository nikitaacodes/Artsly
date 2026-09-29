import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed, fetchTrending } from "../redux/slices/feedSlice";
import PostCard from "./PostCard";
import CreatePostForm from "./CreatePostForm";
import { Loader } from "lucide-react";

const Feed = () => {
  const dispatch = useDispatch();
  const { feed, auth } = useSelector((state) => state);
  const [showTrending, setShowTrending] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(fetchFeed({ page, limit: 10 }));
    }
  }, [dispatch, auth.isAuthenticated, page]);

  useEffect(() => {
    if (showTrending && auth.isAuthenticated) {
      dispatch(fetchTrending());
    }
  }, [dispatch, showTrending, auth.isAuthenticated]);

  const handlePostCreated = () => {
    setPage(1);
    dispatch(fetchFeed({ page: 1, limit: 10 }));
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  if (!auth.isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to Artsly
          </h2>
          <p className="text-gray-600">Please log in to see the feed</p>
        </div>
      </div>
    );
  }

  const postsToDisplay = showTrending ? feed.trending : feed.posts;
  const isLoading = showTrending ? feed.trendingLoading : feed.loading;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowTrending(false)}
          className={`px-4 py-2 rounded-lg font-medium ${
            !showTrending
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          For You
        </button>
        <button
          onClick={() => setShowTrending(true)}
          className={`px-4 py-2 rounded-lg font-medium ${
            showTrending
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Trending
        </button>
      </div>

      {!showTrending && <CreatePostForm onPostCreated={handlePostCreated} />}

      {isLoading && (
        <div className="flex justify-center py-8">
          <Loader className="animate-spin text-blue-500" size={32} />
        </div>
      )}

      {postsToDisplay.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No posts yet. Be the first to share!
          </p>
        </div>
      )}

      <div>
        {postsToDisplay.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {!showTrending &&
        feed.pagination &&
        feed.pagination.page < feed.pagination.pages && (
          <div className="flex justify-center py-6">
            <button
              onClick={handleLoadMore}
              disabled={feed.loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Load More
            </button>
          </div>
        )}
    </div>
  );
};

export default Feed;

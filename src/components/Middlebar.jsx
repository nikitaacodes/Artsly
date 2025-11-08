import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setError } from "../redux/slices/authSlice";
import { formatDistanceToNow } from "date-fns";
const Middlebar = () => {
  // const [searchText, setSearchText] = useState("");
  const [story, setStory] = useState([]);
  const [text, setText] = useState("");
  const [feed, setFeed] = useState([]);
  const dispatch = useDispatch();

  // const handleSearch = (e) => {
  //   setSearchText(e.target.value);
  // };

  const getComments = async () => {
    try {
      const res = await fetch("http://localhost:7777/comments", {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      console.log("comments", result);
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };
  const postComments = async () => {
    try {
      const res = await fetch("http://localhost:7777//comments/post/:postId", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(res.message || "failed to post");
      }
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };
  const getStory = async () => {
    dispatch(setError(""));
    dispatch(setLoading(true));
    try {
      const res = await fetch("http://localhost:7777/story/feed", {
        method: "GET",
        credentials: "include",
        body: JSON.stringify({
          content: text,
        }),
      });

      const result = await res.json();
      // Ensure feed is always an array
      setStory(Array.isArray(result) ? result : result.story || []);
      console.log("get story", result);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };
  const handlePost = async () => {
    if (!text.trim()) return;
    dispatch(setError(""));
    dispatch(setLoading(true));
    try {
      const res = await fetch("http://localhost:7777/post", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: text,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "failed to post");
      }
      console.log("post created", result);
      setText("");
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };
  const getFeed = async () => {
    dispatch(setError(""));
    dispatch(setLoading(true));
    try {
      const res = await fetch("http://localhost:7777/feed", {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();
      // Ensure feed is always an array
      setFeed(Array.isArray(result) ? result : result.feed || []);
      console.log("get story", result);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    getStory();
  }, []);

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="w-2/3 flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Post input */}
      <div className="flex-none p-6 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-32 p-4 pr-24 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="What's on your mind? Share your thoughts..."
            ></textarea>

            <button
              className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePost}
              disabled={!text.trim()}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Story section */}
      {story.length > 0 && (
        <div className="flex-none p-4 bg-white border-b border-gray-200 overflow-x-auto">
          <div className="flex space-x-4 px-4">
            {story.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 relative group cursor-pointer"
              >
                <div className="relative h-48 w-32 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-500">
                  {/* Media rendering */}
                  {item.mediaType === "image" && (
                    <img
                      src={`http://localhost:7777${item.mediaUrl}`}
                      alt="story"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {item.mediaType === "video" && (
                    <video
                      src={`http://localhost:7777${item.mediaUrl}`}
                      className="w-full h-full object-cover"
                      muted
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Username overlay */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                      {item.user?.userName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <p className="text-white font-semibold text-sm truncate">
                      {item.user?.userName || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feed section */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {feed.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg font-medium">
                No posts yet. Be the first to share something!
              </div>
            </div>
          ) : (
            feed.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden"
              >
                {/* Post header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                        {item.user?.userName?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {item.user?.userName || "Unknown User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(item.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post content */}
                <div className="p-4">
                  <p className="text-gray-800 leading-relaxed">{item.content}</p>
                </div>

                {/* Post footer */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-semibold">{item.likes.length}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span className="font-semibold">
                        {item.comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Middlebar;

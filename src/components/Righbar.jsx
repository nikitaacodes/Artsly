import { useState, useEffect } from "react";

const Righbar = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Mock suggestions - replace with actual API call
    setSuggestions([
      { id: 1, name: "Alice Johnson", username: "@alice", avatar: "A" },
      { id: 2, name: "Bob Smith", username: "@bob", avatar: "B" },
      { id: 3, name: "Charlie Brown", username: "@charlie", avatar: "C" },
    ]);
  }, []);

  return (
    <div className="w-1/3 flex flex-col p-6 bg-white border-l border-gray-200 h-screen overflow-y-auto">
      {/* Active Now Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Active Now
        </h2>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                  {String.fromCharCode(64 + item)}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">User {item}</p>
                <p className="text-xs text-gray-500">Active now</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Suggestions</h2>
        <div className="space-y-3">
          {suggestions.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  {user.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.username}</p>
                </div>
              </div>
              <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-200">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Trending</h2>
        <div className="space-y-2">
          {["#DigitalArt", "#MusicFest", "#Photography", "#ArtShow"].map(
            (tag, index) => (
              <div
                key={index}
                className="p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <p className="font-semibold text-gray-800">{tag}</p>
                <p className="text-xs text-gray-500">
                  {Math.floor(Math.random() * 1000) + 100} posts
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Righbar;

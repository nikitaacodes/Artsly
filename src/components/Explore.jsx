import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { userAPI } from "../utils/api";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Explore = () => {
  const [searchtext, setSearchText] = useState("");
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [locationError, setLocationError] = useState("");
  const currentUser = useSelector((state) => state.auth.user);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const findNearbyArtisans = () => {
    setLoadingNearby(true);
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoadingNearby(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          if (currentUser && currentUser._id) {
            await userAPI.updateUser(currentUser._id, {
              location: {
                type: "Point",
                coordinates: [longitude, latitude],
              },
            });
          }

          const res = await userAPI.getNearbyUsers(longitude, latitude);
          setNearbyUsers(res.data);
        } catch (err) {
          setLocationError(err.response?.data?.message || err.message);
        } finally {
          setLoadingNearby(false);
        }
      },
      (err) => {
        setLocationError("Unable to retrieve your location");
        setLoadingNearby(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="flex flex-row w-screen">
        <Sidebar />

        <div className="flex-1 p-8">
          {/* Search section */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg shadow-sm"
                placeholder="Search an artist, skill, or event..."
                value={searchtext}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Categories section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3">🎨</span>
              Explore Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {[
                { name: "Art", color: "from-amber-500 to-amber-600", icon: "🎨" },
                { name: "Music", color: "from-blue-600 to-blue-700", icon: "🎵" },
                { name: "Magic", color: "from-green-500 to-green-600", icon: "✨" },
                { name: "Photography", color: "from-pink-500 to-pink-600", icon: "📸" },
                { name: "Cooking", color: "from-red-500 to-red-600", icon: "👨‍🍳" },
              ].map((category, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${category.color} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
                >
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-white font-bold text-xl">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Artisans Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <span className="mr-3">📍</span>
                Nearby Artisans
              </h2>
              <button
                onClick={findNearbyArtisans}
                disabled={loadingNearby}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow hover:shadow-lg transition-all"
              >
                {loadingNearby ? "Locating..." : "Find Nearby Artists"}
              </button>
            </div>
            
            {locationError && (
              <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-lg">
                {locationError}
              </div>
            )}

            {nearbyUsers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {nearbyUsers.map((user) => (
                  <Link
                    key={user._id}
                    to={`/profile/${user._id}`}
                    className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all border border-gray-200 block"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      {user.profilePic ? (
                        <img src={user.profilePic} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-500">@{user.userName}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{user.about}</p>
                  </Link>
                ))}
              </div>
            ) : (
              !loadingNearby && !locationError && (
                <div className="text-gray-500 italic bg-white p-6 rounded-xl shadow-sm text-center">
                  Click the button above to discover talented artists in your area.
                </div>
              )
            )}
          </div>

          {/* Trending hashtags section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Trending Now</h2>
            <div className="flex flex-wrap gap-3">
              {["#DigitalArt", "#MusicProduction", "#Photography", "#CookingTips", "#ArtCommunity", "#CreativeProcess"].map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white rounded-full border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700 font-semibold cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;

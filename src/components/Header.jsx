import { Link, useLocation } from "react-router-dom";
import { HomeIcon, UserIcon, PowerIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const location = useLocation();

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Artsly
            </h1>
          </Link>

          <nav className="flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                location.pathname === "/"
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-500 hover:bg-gray-700 text-gray-300 font-medium transition-all duration-200"
                >
                  Log In
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    location.pathname === "/profile"
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <UserIcon className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                  className="px-4 py-2 rounded-lg hover:bg-red-600 text-gray-300 hover:text-white font-medium transition-all duration-200 flex items-center space-x-2 border border-transparent hover:border-red-500"
                >
                  <PowerIcon className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";

const Header = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Friendo</h1>
      <nav className="flex space-x-4">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/about" className="hover:text-blue-400">
          About Us
        </Link>
        <Link to="/gallery" className="hover:text-blue-400">
          Gallery
        </Link>

        {!isLoggedIn ? (
          <>
            <Link to="/signup" className="hover:text-blue-400">
              Signup
            </Link>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="hover:text-blue-400">
              Profile
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              className="hover:text-red-400"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

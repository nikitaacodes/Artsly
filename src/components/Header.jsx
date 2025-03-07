import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-reddish py-3 w-full flex flex-row justify-evenly">
      <Link to="/aboutus" className="font-bold text-purple-900">
        About Us
      </Link>
      <Link to="/gallery" className="font-bold text-purple-900">
        Home
      </Link>

      {!user && (
        <>
          <Link to="/signin" className="font-bold text-purple-900">
            Sign In
          </Link>
          <Link to="/signup" className="font-bold text-purple-900">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;

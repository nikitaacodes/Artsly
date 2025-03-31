import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Logo from "./Logo";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-reddish py-3 w-full flex flex-row justify-between items-center px-8">
      {!user ? (
        <>
          <div className="flex items-center space-x-8">
            <Link to="/gallery" className="text-white hover:text-gray-200">
              Home
            </Link>
            <Link to="/aboutus" className="text-white hover:text-gray-200">
              About Us
            </Link>
          </div>

          <Logo />

          <div className="flex items-center space-x-4">
            <Link to="/signin" className="text-white hover:text-gray-200">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-white text-red-600 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Sign Up
            </Link>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center">
          <Logo />
        </div>
      )}
    </div>
  );
};

export default Header;

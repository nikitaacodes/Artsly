import { signOut, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState, useRef } from "react";
import { auth } from "../firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { updateOnlineStatus } from "../utils/friendshipUtils";

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const menuRef = useRef(null); // Detect outside click

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUsername(currentUser.uid);
      } else {
        setUser(null);
        setUsername("");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUsername = async (userId) => {
    try {
      const db = getFirestore(); // Firestore instead of Realtime DB
      const userDoc = doc(db, "Users", userId); // Firestore path
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        setUsername(docSnap.data().username); // get the username field
      } else {
        console.log("No user document found.");
      }
    } catch (error) {
      console.error("Error fetching username from Firestore:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Update online status before signing out
        await updateOnlineStatus(currentUser.uid, false);
      }
      await signOut(auth);
      console.log("User signed out");
      setUser(null);
      setUsername("");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  // Detect outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {user && (
        <div className="border-main border rounded-[25px] w-[200px] h-[60px] py-3 px-2 font-medium text-main bg-main flex items-center justify-between">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <img
              src={user.photoURL || "https://via.placeholder.com/50"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 px-2 overflow-hidden">
            <p className="text-white truncate">
              {user.displayName || "No Name"}
            </p>

            <p className="text-xs text-gray-400 truncate">
              {username || "No Username"}
            </p>
          </div>

          {/* SVG Icon to Toggle Menu */}
          <div className="pb-2 flex-shrink-0" ref={menuRef}>
            <svg
              onClick={() => setMenuOpen(!menuOpen)}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-ellipsis-vertical cursor-pointer text-white outline-none focus:outline-none"
              role="button"
              tabIndex="0"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute mt-5 py-2 rounded-sm opacity-90 w-40 bg-black">
                <ul className="relative text-white">
                  <li onClick={handleSignOut} className="cursor-pointer">
                    🚪 Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;

import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Please sign in to view your profile
          </h2>
          <p className="text-gray-600 mt-2">
            You need to be logged in to access this page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">User Settings</h2>
        <ul className="space-y-2">
          {[
            "My Account",
            "Profiles",
            "Content & Social",
            "Data & Privacy",
            "Authorized Apps",
            "Devices",
            "Connections",
            "Appearance",
            "Account Status",
          ].map((item, index) => (
            <li
              key={index}
              className="p-2 rounded-md cursor-pointer hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6">
        <h1 className="text-2xl font-bold">My Account</h1>

        {/* Profile Section */}
        <div className="mt-6 bg-gray-50 p-6 rounded-lg">
          {/* Banner */}
          <div className="h-24 bg-teal-500 rounded-md"></div>

          {/* Profile Info */}
          <div className="flex items-center -mt-12 space-x-4">
            <img
              src={user.photoURL || "https://via.placeholder.com/80"}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div>
              <h2 className="text-xl font-bold">
                {user.displayName || user.email}
              </h2>
              <button className="bg-indigo-600 px-3 py-1 rounded-md text-sm text-white">
                Edit User Profile
              </button>
            </div>
          </div>

          {/* Account Details */}
          <div className="mt-6 bg-white p-4 rounded-md shadow-sm">
            {[
              { label: "Display Name", value: user.displayName || "Not set" },
              {
                label: "Username",
                value: user.email?.split("@")[0] || "Not set",
              },
              { label: "Email", value: user.email || "Not set", reveal: true },
              {
                label: "Phone Number",
                value: user.phoneNumber || "Not set",
                reveal: true,
              },
            ].map((item, index) => (
              <div key={index} className="flex justify-between p-2">
                <div>
                  <p className="text-gray-600">{item.label}</p>
                  <p className="text-lg">
                    {item.value}{" "}
                    {item.reveal && (
                      <span className="text-blue-600 cursor-pointer">
                        Reveal
                      </span>
                    )}
                  </p>
                </div>
                <button className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Password & Authentication */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">
            Password and Authentication
          </h2>
          <button className="bg-blue-600 px-4 py-2 rounded-md text-white">
            Change Password
          </button>
        </div>

        {/* Account Status Section */}
        <div className="mt-8 space-y-6">
          {/* Account Deactivation */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Account Deactivation
            </h2>
            <p className="text-gray-600 mb-4">
              Temporarily disable your account. Your profile and data will be
              hidden from other users.
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-yellow-500 px-4 py-2 rounded-md text-white hover:bg-yellow-600">
                Deactivate Account
              </button>
              <span className="text-sm text-gray-500">
                You can reactivate your account at any time
              </span>
            </div>
          </div>

          {/* Account Deletion */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
            <h2 className="text-lg font-semibold text-red-600 mb-2">
              Delete Account
            </h2>
            <p className="text-gray-600 mb-4">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700">
                Delete Account
              </button>
              <span className="text-sm text-red-500">
                Warning: This action is irreversible
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

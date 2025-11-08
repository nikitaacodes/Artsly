import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    about: "",
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const userInfo = async () => {
      try {
        const res = await fetch("http://localhost:7777/user", {
          credentials: "include",
          method: "GET",
        });
        const data = await res.json();
        setUser(data);
        setFormData({
          name: data.name,
          userName: data.userName,
          about: data.about,
        });
      } catch (err) {
        console.error("error fetching user", err);
      }
    };
    userInfo();
  }, []);

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);

    // Detect unsaved changes
    if (
      updated.name !== user.name ||
      updated.userName !== user.userName ||
      updated.about !== user.about
    ) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:7777/user/${user._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Update response:", data);

      setUser({ ...user, ...formData });
      setShowToast(false);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="flex justify-center items-start p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Gradient header section */}
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 relative"></div>

          {/* Profile section */}
          <div className="relative px-6 pb-6 bg-white">
            {/* Profile avatar */}
            <div className="absolute left-6 -top-16">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 shadow-xl flex items-center justify-center">
                {user?.name ? (
                  <span className="text-4xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-300"></div>
                )}
              </div>
            </div>

            {/* Edit button */}
            <div className="flex justify-end pt-4">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setFormData({
                        name: user.name,
                        userName: user.userName,
                        about: user.about,
                      });
                      setEditMode(false);
                      setShowToast(false);
                    }}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Editable fields */}
            {user && (
              <div className="mt-16 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={editMode ? handleChange : undefined}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 font-bold text-2xl bg-transparent outline-none rounded-lg transition-all ${
                      editMode
                        ? "border-2 border-blue-300 focus:border-blue-500 bg-blue-50"
                        : "border-none cursor-default"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={editMode ? handleChange : undefined}
                    disabled={!editMode}
                    className={`w-full px-4 py-2 text-lg text-gray-600 bg-transparent outline-none rounded-lg transition-all ${
                      editMode
                        ? "border-2 border-blue-300 focus:border-blue-500 bg-blue-50"
                        : "border-none cursor-default"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    About
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={editMode ? handleChange : undefined}
                    disabled={!editMode}
                    rows={4}
                    className={`w-full px-4 py-2 text-gray-700 bg-transparent outline-none rounded-lg resize-none transition-all ${
                      editMode
                        ? "border-2 border-blue-300 focus:border-blue-500 bg-blue-50"
                        : "border-none cursor-default"
                    }`}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Toast notification */}
        {showToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-yellow-50 border-2 border-yellow-400 text-yellow-900 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 z-50 animate-bounce">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-semibold">You have unsaved changes!</span>
            <button
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Save Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

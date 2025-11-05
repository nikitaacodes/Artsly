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
    <div>
      <div className="w-[500px] h-[350px] rounded-tl-md rounded-tr-md overflow-hidden m-2 bg-gray-200 relative">
        {/* Green top section */}
        <div className="h-1/3 bg-green-800"></div>

        {/* Pink section */}
        <div className="relative flex justify-between items-center px-3 pt-4 pb-2">
          {/* Gray profile icon */}
          <div className="absolute left-3 top-0 -translate-y-1/2 border-4 border-black bg-gray-500 rounded-full h-[80px] w-[80px]"></div>

          {/* Spacer */}
          <div className="w-[100px]"></div>

          {/* Edit button */}
          <button
            onClick={() => setEditMode(true)}
            className="w-fit h-fit rounded-sm px-2 font-semibold bg-blue-900 text-white"
          >
            Edit Profile
          </button>
        </div>

        {/* Editable fields */}
        {user && (
          <div className="ml-3 mt-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={editMode ? handleChange : undefined}
              disabled={!editMode}
              className={`p-1 w-full font-bold text-[28px] bg-transparent outline-none ${
                editMode
                  ? "border-b border-gray-400 focus:border-blue-500"
                  : "border-none cursor-default"
              }`}
            />

            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={editMode ? handleChange : undefined}
              disabled={!editMode}
              className={`p-1 w-full font-thin text-[18px] text-gray-600 bg-transparent outline-none ${
                editMode
                  ? "border-b border-gray-400 focus:border-blue-500"
                  : "border-none cursor-default"
              }`}
            />

            <textarea
              name="about"
              value={formData.about}
              onChange={editMode ? handleChange : undefined}
              disabled={!editMode}
              className={`p-1 w-full font-thin text-gray-500 bg-transparent outline-none resize-none ${
                editMode
                  ? "border-b border-gray-400 focus:border-blue-500"
                  : "border-none cursor-default"
              }`}
            />
          </div>
        )}
      </div>

      {/* ✅ Toast at the bottom of the screen */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-5 py-3 rounded-lg shadow-lg flex items-center gap-4 transition-all animate-fade-up z-50">
          <span className="font-medium"> Be Careful! You’ve made changes.</span>
          <button
            onClick={handleUpdate}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-1 rounded-md"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;

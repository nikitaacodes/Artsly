import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    about: "",
  });

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      setEditMode(false);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div>
      Profile
      <div className="border w-[300px] h-[350px] rounded-tl-md rounded-tr-md">
        {/* Green top section */}
        <div className="h-1/3 bg-green-800"></div>

        {/* Gray circle */}
        <div className="relative bottom-[50px] border-4 border-black bg-gray-500 rounded-full h-[100px] w-[100px] box-border"></div>

        {!editMode && user && (
          <div className="ml-2 mt-4">
            <div className="font-bold">{user.name}</div>
            <p className="font-thin">{user.userName}</p>
            <p>{user.about}</p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-2 px-4 py-1  text-red-800 hover:text-red-900 "
            >
              Edit
            </button>
          </div>
        )}

        {editMode && user && (
          <div className="ml-2 mt-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className=" p-1 w-full "
              placeholder="Name"
            />
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className=" p-1 w-full cursor-text"
              placeholder="Username"
            />
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className=" p-1 w-full "
              placeholder="About me"
            />
            <div className="flex justify-between mt-2">
              <button
                onClick={handleUpdate}
                className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

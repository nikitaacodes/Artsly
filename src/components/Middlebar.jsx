import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setError } from "../redux/slices/authSlice";
const Middlebar = () => {
  const [searchtext, setSearchText] = useState("");
  const [feed, setFeed] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const getFeed = async () => {
    dispatch(setError(""));
    dispatch(setLoading(true));
    try {
      const res = await fetch("http://localhost:7777/feed", {
        method: "GET",
      });
      const result = await res.json();
      setFeed(result);
      console.log("get feed", result);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="w-2/3 flex flex-col">
      <div className="w-full h-[50px] px-5 py-2 flex flex-row justify-center gap-10">
        <input
          type="search"
          className="border-gray-800 w-[300px] h-[30px] border-1 rounded-lg px-3 py-1"
          placeholder="Search"
          value={searchtext}
          onChange={handleSearch}
        />
        <div>
          <button className="text-white font-bold px-3 py-2 bg-blue-900 rounded-3xl">
            Create
          </button>
        </div>
      </div>
      <div>
        <input
          type="textbox"
          className="border-1 self-center rounded-md w-[500px] h-[100px] mx-10"
          placeholder="What's running on your mind..."
        />
      </div>

      {/* Feed section */}
      <div className="mt-4">
        {feed.length === 0 ? (
          <p>No feed available</p>
        ) : (
          feed.map((item, index) => (
            <div key={index} className="border p-2 mb-2 rounded-md">
              <p>
                <strong>{item.name}</strong>
              </p>
              <p>{item.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Middlebar;

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setError } from "../redux/slices/authSlice";
import { formatDistanceToNow } from "date-fns";
const Middlebar = () => {
  // const [searchText, setSearchText] = useState("");
  const [story, setStory] = useState([]);
  const [text, setText] = useState("");
  const [feed, setFeed] = useState([]);
  const dispatch = useDispatch();

  // const handleSearch = (e) => {
  //   setSearchText(e.target.value);
  // };

  const getComments = async () => {
    try {
      const res = await fetch("http://localhost:7777/comments", {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      console.log("comments", result);
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };
  const postComments = async () => {
    try {
      const res = await fetch("http://localhost:7777//comments/post/:postId", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(res.message || "failed to post");
      }
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };
  const getStory = async () => {
    dispatch(setError(""));
    dispatch(setLoading(true));
    try {
      const res = await fetch("http://localhost:7777/story/feed", {
        method: "GET",
        credentials: "include",
        body: JSON.stringify({
          content: text,
        }),
      });

      const result = await res.json();
      // Ensure feed is always an array
      setStory(Array.isArray(result) ? result : result.story || []);
      console.log("get story", result);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };
  const handlePost = async () => {
    if (!text.trim()) return;
    dispatch(setError(""));
    dispatch(setLoading(true));
    try {
      const res = await fetch("http://localhost:7777/post", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: text,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "failed to post");
      }
      console.log("post created", result);
      setText("");
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };
  const getFeed = async () => {
    dispatch(setError(""));
    dispatch(setLoading(true));
    try {
      const res = await fetch("http://localhost:7777/feed", {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();
      // Ensure feed is always an array
      setFeed(Array.isArray(result) ? result : result.feed || []);
      console.log("get story", result);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    getStory();
  }, []);

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="w-2/3 flex flex-col h-screen overflow-hidden ">
      {/* Search and Create */}
      <div className="w-full h-[50px] px-5 py-2 flex flex-row flex-none justify-center gap-10">
        {/* <input
          type="search"
          className="border-gray-800 w-[300px] h-[30px] border-1 rounded-lg px-3 py-1"
          placeholder="Search"
          value={searchText}
          onChange={handleSearch}
        /> */}
      </div>

      {/* Post input */}
      <div className="flex-none relative w-[500px] mx-10">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border-2 border-gray-300 rounded-md w-full h-[100px] p-3 pr-20 resize-none"
          placeholder="What's running on your mind..."
        ></textarea>

        <button
          className="absolute bottom-2 right-2 bg-blue-900 hover:bg-blue-950 text-white font-bold px-3 py-2 rounded-3xl"
          onClick={handlePost}
        >
          Post
        </button>
      </div>

      {/* Story section */}
      <div className="mt-4 ml-10 flex flex-row gap-4 flex-wrap">
        {story.length === 0 ? (
          <p> </p>
        ) : (
          story.map((item, index) => (
            <div
              key={index}
              className="border h-[220px] w-[150px] rounded-md flex flex-col items-center"
            >
              {/* Username */}
              <div
                key={index}
                className="relative border h-full w-full rounded-md overflow-hidden"
              >
                {/* Media rendering */}
                {item.mediaType === "image" && (
                  <img
                    src={`http://localhost:7777${item.mediaUrl}`}
                    alt="feed media"
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
                {item.mediaType === "video" && (
                  <video
                    src={`http://localhost:7777${item.mediaUrl}`}
                    controls
                    className="w-full h-[180px] object-cover rounded-md"
                  />
                )}

                {/* Username overlay */}
                <p className="flex absolute top-2 gap-2 text-white font-bold  bg-opacity-50 px-2 py-1 rounded-md">
                  <p className="border-1 rounded-[50px] w-7 h-7">
                    {item.profilePic}
                  </p>{" "}
                  <p> {item.user.userName}</p>
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Feed section */}
      <div className=" flex-1  overflow-y-auto mt-4 ml-10">
        {feed.length === 0 ? (
          <p>No feed available</p>
        ) : (
          feed.map((item, index) => (
            <div
              key={index}
              className="border flex flex-col w-[500px] p-2 mb-2 overflow-hidden rounded-md"
            >
              <span className="flex justify-start gap-4">
                <div className="flex gap-2 ">
                  <div className="border-1 rounded-[50px] w-7 h-7">
                    {" "}
                    {item.profilePic}
                  </div>
                  <p className="font-bold">{item.user.userName}</p>
                </div>
                <p className="font-light justify-center text-[14px]">
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </span>

              <p>{item.content}</p>
              <div className="flex flex-row justify-between">
                {" "}
                <p> {item.likes.length} likes</p>
                <div className=""> {item.comments.length} comments</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Middlebar;

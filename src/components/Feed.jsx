import React, { useState, useEffect } from "react";

//Data
import { feedInfo } from "../utils/FeedData";
import { API_KEY } from "../utils/constants";

const Feed = () => {
  const [posts, setPosts] = useState(feedInfo);
  const [imgurls, setImageurls] = useState({});

  // Fetch image for a given query
  const fetchImg = async (query) => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.photos || data.photos.length === 0) {
        console.error("No photos found!");
        return null;
      }

      return data.photos[0].src.original; // Return the image URL
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadImg = async () => {
      const newImgUrls = {};

      for (const post of posts) {
        const imgUrl = await fetchImg(post.content);
        if (imgUrl) {
          newImgUrls[post.id] = imgUrl;
        }
      }

      setImageurls(newImgUrls);

      // Update posts with images
      const updatedPosts = posts.map((post) => ({
        ...post,
        imgAttachment: newImgUrls[post.id] || "",
      }));

      setPosts(updatedPosts);
      console.log("Updated Feed:", updatedPosts);
    };

    loadImg();
  }, [posts]);
  return (
    <div className="w-5/12 h-screen overflow-scroll scrollbar-hidden">
      <button
        onClick={() => window.location.reload()}
        className="mb-4 py-2 px-4 bg-sec flex mx-auto  text-black font-bold rounded-[10px]"
      >
        Get newer
      </button>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex items-center space-x-3">
              <img
                src={post.profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{post.name}</h3>
                <p className="text-gray-500 text-sm">{post.username}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="mt-2 text-gray-700">{post.content}</p>

            {/* Image Attachment */}
            {post.imgAttachment && (
              <img
                src={post.imgAttachment}
                alt="Post"
                className="mt-2 w-full h-auto rounded-lg"
              />
            )}

            {/* Post Meta */}
            <div className="flex justify-between mt-3 text-gray-600 text-sm">
              <span>{post.timestamp}</span>
              <div className="flex space-x-3">
                <span>❤️ {post.likeCount}</span>
                <span>💬 {post.commentCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;

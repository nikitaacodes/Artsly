import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userAPI, postAPI } from "../utils/api";
import PostCard from "./PostCard";
import { UserPlus, UserMinus, Loader } from "lucide-react";

const Profile = () => {
  const { userId } = useParams();
  const { auth } = useSelector((state) => state);
  const [profile, setProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userAPI.getUser(userId);
        setProfile(response.data);
        setIsFollowing(
          response.data.followers.some((f) => f._id === auth.user?._id),
        );

        const postsResponse = await postAPI.getFeed(1, 100);
        const userPostsList = postsResponse.data.posts.filter(
          (post) => post.user._id === userId,
        );
        setUserPosts(userPostsList);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId && auth.isAuthenticated) {
      fetchProfile();
    }
  }, [userId, auth.isAuthenticated]);

  const handleFollow = async () => {
    try {
      await userAPI.followUser(userId);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Profile not found</p>
      </div>
    );
  }

  const isOwnProfile = profile._id === auth.user?._id;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-6">
          <img
            src={profile.profilePic || "https://via.placeholder.com/100"}
            alt={profile.userName}
            className="w-24 h-24 rounded-full"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
            <p className="text-gray-600">@{profile.userName}</p>
            <p className="text-gray-700 mt-2">{profile.about}</p>
            <div className="flex gap-6 mt-4 text-sm">
              <div>
                <span className="font-bold text-gray-800">
                  {userPosts.length}
                </span>
                <span className="text-gray-600"> Posts</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">
                  {profile.followers?.length || 0}
                </span>
                <span className="text-gray-600"> Followers</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">
                  {profile.following?.length || 0}
                </span>
                <span className="text-gray-600"> Following</span>
              </div>
            </div>
          </div>
          {!isOwnProfile && (
            <button
              onClick={handleFollow}
              className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                isFollowing
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isFollowing ? (
                <>
                  <UserMinus size={18} /> Unfollow
                </>
              ) : (
                <>
                  <UserPlus size={18} /> Follow
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Posts</h2>
        {userPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts yet</p>
          </div>
        ) : (
          userPosts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Profile;

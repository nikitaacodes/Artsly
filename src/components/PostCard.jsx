import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, MessageCircle, Share2, Trash2 } from "lucide-react";
import { deletePost, likePost, sharePost } from "../redux/slices/postSlice";
import { addComment, removeComment } from "../redux/slices/feedSlice";
import { formatDistanceToNow } from "date-fns";

const PostCard = ({ post, showComments = true }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const isLiked = post.likes.includes(auth.user?._id);
  const isOwner = post.user._id === auth.user?._id;

  const handleLike = async () => {
    try {
      await dispatch(likePost(post._id)).unwrap();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleShare = async () => {
    try {
      await dispatch(sharePost(post._id)).unwrap();
      alert("Post shared!");
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await dispatch(deletePost(post._id)).unwrap();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    setLoading(true);
    try {
      await dispatch(
        addComment({
          comment: commentText,
          post: post._id,
        }),
      ).unwrap();
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await dispatch(removeComment({ commentId, postId: post._id })).unwrap();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={post.user.profilePic || "https://via.placeholder.com/40"}
            alt={post.user.userName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-800">
              {post.user.userName}
            </h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        {isOwner && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <p className="text-gray-700 mb-4">{post.content}</p>

      {post.images && post.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          {post.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Post image ${idx + 1}`}
              className="rounded-lg w-full h-auto object-cover max-h-96"
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 text-gray-600 mb-4 pb-4 border-b">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 hover:text-blue-500 ${
            isLiked ? "text-red-500" : ""
          }`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          <span className="text-sm">{post.likes.length}</span>
        </button>
        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          className="flex items-center gap-1 hover:text-blue-500"
        >
          <MessageCircle size={18} />
          <span className="text-sm">{post.comments?.length || 0}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1 hover:text-blue-500"
        >
          <Share2 size={18} />
          <span className="text-sm">{post.shares || 0}</span>
        </button>
      </div>

      {showCommentInput && (
        <div className="mb-4">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
            />
            <button
              onClick={handleAddComment}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Post
            </button>
          </div>

          {showComments && post.comments && post.comments.length > 0 && (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {post.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex gap-2 bg-gray-50 p-2 rounded"
                >
                  <img
                    src={
                      comment.user.profilePic ||
                      "https://via.placeholder.com/32"
                    }
                    alt={comment.user.userName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">
                      {comment.user.userName}
                    </p>
                    <p className="text-sm text-gray-700">{comment.comment}</p>
                  </div>
                  {(comment.user._id === auth.user?._id ||
                    auth.user?.role === "admin") && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;

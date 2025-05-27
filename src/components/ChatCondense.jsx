import React, { useState, useEffect, useCallback, useMemo } from "react";
import { auth } from "../firebaseConfig";
import {
  getOnlineFriendsCount,
  getUserFriends,
} from "../utils/friendshipUtils";

// Memoized Friend Item Component
const FriendItem = React.memo(({ friend }) => (
  <div className="p-3 flex items-center space-x-3 hover:bg-gray-50 cursor-pointer">
    <div className="relative">
      <img
        src={
          friend.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.username}`
        }
        alt={friend.username}
        className="w-10 h-10 rounded-full"
        loading="lazy"
      />
      {friend.isOnline && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      )}
    </div>
    <div>
      <p className="font-medium">{friend.name}</p>
      <p className="text-sm text-gray-500">@{friend.username}</p>
    </div>
  </div>
));

// Memoized Online Friends Icons Component
const OnlineFriendsIcons = React.memo(({ friends }) => {
  const onlineFriends = friends.filter((friend) => friend.isOnline);
  const recentlyOnlineFriends = friends
    .filter((friend) => !friend.isOnline && friend.lastSeen)
    .sort((a, b) => b.lastSeen.toDate() - a.lastSeen.toDate())
    .slice(0, 5); // Show only 5 most recently online friends

  const displayFriends =
    onlineFriends.length > 0 ? onlineFriends : recentlyOnlineFriends;
  const isRecentlyOnline = onlineFriends.length === 0;

  return (
    <div className="flex flex-col">
      <div className="flex -space-x-2 mt-2">
        {displayFriends.map((friend) => (
          <div key={friend.id} className="relative group">
            <img
              src={
                friend.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.username}`
              }
              alt={friend.username}
              className="w-8 h-8 rounded-full border-2 border-white"
              loading="lazy"
            />
            {friend.isOnline && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
            )}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {friend.name}
              {isRecentlyOnline && friend.lastSeen && (
                <span className="block text-gray-400 text-[10px]">
                  Last seen {friend.lastSeen.toDate().toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {isRecentlyOnline && displayFriends.length > 0 && (
        <p className="text-xs text-gray-500 mt-6 text-center">
          Recently Online
        </p>
      )}
      <div className="border-b border-gray-200 mt-4"></div>
    </div>
  );
});

// Memoized Friends List Component
const FriendsList = React.memo(({ friends, loading }) => {
  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">Loading friends...</div>
    );
  }

  if (friends.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No friends found</div>
    );
  }

  return (
    <div className="max-h-60 overflow-y-auto">
      {friends.map((friend) => (
        <FriendItem key={friend.id} friend={friend} />
      ))}
    </div>
  );
});

// Memoized Chat Item Component
const ChatItem = React.memo(({ chat }) => (
  <div className="p-3 flex items-start space-x-3 hover:bg-gray-50 cursor-pointer">
    <div className="relative flex-shrink-0">
      <img
        src={
          chat.senderAvatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.senderName}`
        }
        alt={chat.senderName}
        className="w-10 h-10 rounded-full"
        loading="lazy"
      />
      {chat.isOnline && (
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start">
        <p className="font-medium text-sm truncate">{chat.senderName}</p>
        <span className="text-xs text-gray-500 flex-shrink-0">
          {new Date(chat.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
    </div>
  </div>
));

// Memoized Chat List Component
const ChatList = React.memo(({ chats, loading }) => {
  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">Loading chats...</div>
    );
  }

  if (chats.length === 0) {
    return <div className="p-4 text-center text-gray-500">No messages yet</div>;
  }

  return (
    <div className="max-h-60 overflow-y-auto">
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
});

const ChatCondense = () => {
  const [onlineFriends, setOnlineFriends] = useState(0);
  const [inbox, setInbox] = useState(0);

  const [showFriendsList, setShowFriendsList] = useState(false);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Memoize the current user
  const currentUser = useMemo(() => auth.currentUser, []);

  // Memoize the online friends count callback
  const handleOnlineCount = useCallback((count) => {
    setOnlineFriends(count);
  }, []);

  // Set up online friends listener
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = getOnlineFriendsCount(
      currentUser.uid,
      handleOnlineCount
    );
    return () => unsubscribe();
  }, [currentUser, handleOnlineCount]);

  // Memoize the see all handler
  const handleSeeAll = useCallback(async () => {
    setShowFriendsList((prev) => !prev);

    if (!showFriendsList && friends.length === 0) {
      setLoading(true);
      try {
        const friendsList = await getUserFriends(currentUser.uid);
        setFriends(friendsList);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [showFriendsList, friends.length, currentUser]);

  // Memoize the header content
  const headerContent = useMemo(
    () => (
      <div className="bg-white p-3">
        <div className="flex justify-between items-center">
          <p className="text-black">Online Now ({onlineFriends})</p>
          <button
            onClick={handleSeeAll}
            className="text-main hover:text-main-dark cursor-pointer transition-colors duration-200"
          >
            see all
          </button>
        </div>
        <OnlineFriendsIcons friends={friends} />

        <div className="flex justify-between items-center mt-4">
          <p className="text-black">Messages ({inbox})</p>
          <button
            onClick={() => {
              /* TODO: Handle messages view */
            }}
            className="text-main hover:text-main-dark cursor-pointer transition-colors duration-200"
          >
            see all
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
          />
          <button
            onClick={() => {
              /* TODO: Handle search */
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-main"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Chat List */}
        <div className="mt-4">
          <ChatList chats={chats} loading={loading} />
        </div>
      </div>
    ),
    [onlineFriends, handleSeeAll, friends, inbox, searchQuery, chats, loading]
  );

  return (
    <div className="flex flex-col pt-5 px-3 border-r-1 border-main">
      {headerContent}

      {showFriendsList && (
        <div className="bg-white border-t">
          <FriendsList friends={friends} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default React.memo(ChatCondense);

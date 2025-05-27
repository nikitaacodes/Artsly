import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

// Create a new friendship request
export const sendFriendRequest = async (currentUserId, friendUserId) => {
  try {
    // Check if friendship already exists
    const friendshipQuery = query(
      collection(db, "Friendships"),
      where("userId1", "in", [currentUserId, friendUserId]),
      where("userId2", "in", [currentUserId, friendUserId])
    );

    const querySnapshot = await getDocs(friendshipQuery);
    if (!querySnapshot.empty) {
      throw new Error("Friendship already exists or request is pending");
    }

    // Create new friendship document
    const friendshipRef = doc(collection(db, "Friendships"));
    await setDoc(friendshipRef, {
      userId1: currentUserId,
      userId2: friendUserId,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
};

// Accept a friendship request
export const acceptFriendRequest = async (friendshipId) => {
  try {
    const friendshipRef = doc(db, "Friendships", friendshipId);
    const friendshipDoc = await getDoc(friendshipRef);

    if (!friendshipDoc.exists()) {
      throw new Error("Friendship request not found");
    }

    await updateDoc(friendshipRef, {
      status: "accepted",
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
};

// Get all friends for a user
export const getUserFriends = async (userId) => {
  try {
    const friendshipsQuery = query(
      collection(db, "Friendships"),
      where("status", "==", "accepted"),
      where("userId1", "==", userId)
    );

    const reverseFriendshipsQuery = query(
      collection(db, "Friendships"),
      where("status", "==", "accepted"),
      where("userId2", "==", userId)
    );

    const [friendshipsSnapshot, reverseFriendshipsSnapshot] = await Promise.all(
      [getDocs(friendshipsQuery), getDocs(reverseFriendshipsQuery)]
    );

    const friendIds = new Set();

    // Add friends from both queries
    friendshipsSnapshot.forEach((doc) => {
      friendIds.add(doc.data().userId2);
    });

    reverseFriendshipsSnapshot.forEach((doc) => {
      friendIds.add(doc.data().userId1);
    });

    // Get user details for all friends
    const friends = [];
    for (const friendId of friendIds) {
      const userDoc = await getDoc(doc(db, "Users", friendId));
      if (userDoc.exists()) {
        friends.push({
          id: friendId,
          ...userDoc.data(),
        });
      }
    }

    return friends;
  } catch (error) {
    console.error("Error getting user friends:", error);
    throw error;
  }
};

// Get pending friend requests for a user
export const getPendingFriendRequests = async (userId) => {
  try {
    const pendingQuery = query(
      collection(db, "Friendships"),
      where("userId2", "==", userId),
      where("status", "==", "pending")
    );

    const querySnapshot = await getDocs(pendingQuery);
    const pendingRequests = [];

    for (const doc of querySnapshot.docs) {
      const requestData = doc.data();
      const userDoc = await getDoc(doc(db, "Users", requestData.userId1));
      if (userDoc.exists()) {
        pendingRequests.push({
          id: doc.id,
          ...requestData,
          sender: {
            id: userDoc.id,
            ...userDoc.data(),
          },
        });
      }
    }

    return pendingRequests;
  } catch (error) {
    console.error("Error getting pending friend requests:", error);
    throw error;
  }
};

// Remove a friendship
export const removeFriendship = async (friendshipId) => {
  try {
    await deleteDoc(doc(db, "Friendships", friendshipId));
    return true;
  } catch (error) {
    console.error("Error removing friendship:", error);
    throw error;
  }
};

// Update user's online status
export const updateOnlineStatus = async (userId, isOnline) => {
  try {
    const userRef = doc(db, "Users", userId);
    await updateDoc(userRef, {
      isOnline,
      lastSeen: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating online status:", error);
    throw error;
  }
};

// Get online friends count with real-time updates
export const getOnlineFriendsCount = (userId, callback) => {
  try {
    // Query for accepted friendships where user is either userId1 or userId2
    const friendshipsQuery = query(
      collection(db, "Friendships"),
      where("status", "==", "accepted"),
      where("userId1", "==", userId)
    );

    const reverseFriendshipsQuery = query(
      collection(db, "Friendships"),
      where("status", "==", "accepted"),
      where("userId2", "==", userId)
    );

    // Set up real-time listeners for both queries
    const unsubscribe1 = onSnapshot(friendshipsQuery, (snapshot) => {
      const friendIds = snapshot.docs.map((doc) => doc.data().userId2);
      updateOnlineCount(friendIds, callback);
    });

    const unsubscribe2 = onSnapshot(reverseFriendshipsQuery, (snapshot) => {
      const friendIds = snapshot.docs.map((doc) => doc.data().userId1);
      updateOnlineCount(friendIds, callback);
    });

    // Return cleanup function
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  } catch (error) {
    console.error("Error setting up online friends listener:", error);
    throw error;
  }
};

// Helper function to update online count
const updateOnlineCount = async (friendIds, callback) => {
  try {
    if (friendIds.length === 0) {
      callback(0);
      return;
    }

    // Query for online friends
    const onlineQuery = query(
      collection(db, "Users"),
      where("isOnline", "==", true)
    );

    const snapshot = await getDocs(onlineQuery);
    const onlineCount = snapshot.docs.filter((doc) =>
      friendIds.includes(doc.id)
    ).length;

    callback(onlineCount);
  } catch (error) {
    console.error("Error getting online count:", error);
    throw error;
  }
};

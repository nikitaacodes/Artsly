import { setError, setLoading } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  setReceivedRequests,
  setSentRequests,
} from "../redux/slices/requestSlice";

const Collaborations = () => {
  const sentRequests = useSelector((state) => state.requests.sent);
  const receivedRequests = useSelector((state) => state.requests.received);

  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const allReq = async (e) => {
    e.preventDefault();
    dispatch(setError(""));
    dispatch(setLoading(true));

    try {
      const res = await fetch("http://localhost:7777/request/sent", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      dispatch(setSentRequests(result));

      console.log("sent requests", result);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };

  const recReq = async (e) => {
    e.preventDefault();
    dispatch(setError(""));
    dispatch(setLoading(true));

    try {
      const res = await fetch("http://localhost:7777/request/received", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      console.log("received requests", result);
      dispatch(setReceivedRequests(result));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="w-screen flex flex-row">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <span className="mr-3">🤝</span>
              Collaboration Requests
            </h1>
            <p className="text-gray-600 mb-6">Manage your collaboration requests</p>

            {/* Filter buttons */}
            <div className="flex flex-row gap-3 mb-6">
              <button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                onClick={allReq}
              >
                All Requests
              </button>
              <button
                className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                onClick={recReq}
              >
                Received
              </button>
            </div>

            {/* Sent Requests */}
            {sentRequests.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📤</span>
                  Sent Requests
                </h3>
                <div className="space-y-3">
                  {sentRequests.map((req) => (
                    <div
                      key={req._id}
                      className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                            {req.receiver?.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <span className="font-bold text-lg text-gray-800 block">
                              {req.receiver?.name || "Unknown User"}
                            </span>
                            <span className="text-sm text-gray-500">
                              @{req.receiver?.userName || "unknown"}
                            </span>
                          </div>
                        </div>
                        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          Pending
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Received Requests */}
            {receivedRequests.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📥</span>
                  Received Requests
                </h3>
                <div className="space-y-3">
                  {receivedRequests.map((req) => (
                    <div
                      key={req._id}
                      className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                            {req.sender?.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <span className="font-bold text-lg text-gray-800 block">
                              {req.sender?.name || "Unknown User"}
                            </span>
                            <span className="text-sm text-gray-500">
                              @{req.sender?.userName || "unknown"}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                            Accept
                          </button>
                          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {sentRequests.length === 0 &&
              receivedRequests.length === 0 &&
              !loading && (
                <div className="text-center py-12 bg-white rounded-xl shadow-md">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-xl text-gray-600 font-medium">
                    No requests yet
                  </p>
                  <p className="text-gray-500 mt-2">
                    Start collaborating with other artists!
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborations;

//upcoming friend requests track

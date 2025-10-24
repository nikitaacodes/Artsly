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
    <div className="h-screen bg-amber-100 ">
      <Header />
      <div className="w-screen flex flex-row">
        <Sidebar />
        <div className="mt-2 w-full p-4">
          <span className="font-bold text-[18px]">Collaboration Requests</span>

          <div className="flex flex-row gap-2 mt-3">
            <button
              className="px-4 py-1 border border-gray-300 rounded-sm"
              onClick={allReq}
            >
              All
            </button>
            <button
              className="px-4 py-1 border border-gray-300 rounded-sm"
              onClick={recReq}
            >
              Received
            </button>
          </div>

          {sentRequests.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Sent Requests:</h3>
              {sentRequests.map((req) => (
                <div key={req._id} className="border-b p-2">
                  <span className="font-bold text-[16px] mr-4">
                    {req.receiver?.name}
                  </span>
                  <span className="text-[14px] font-thin">
                    @{req.receiver?.userName}
                  </span>
                </div>
              ))}
            </div>
          )}

          {receivedRequests.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Received Requests:</h3>
              {receivedRequests.map((req) => (
                <div key={req._id} className="border-b p-2">
                  <span className="font-bold text-[16px] mr-4">
                    {req.sender?.name}
                  </span>
                  <span className="text-[14px] font-thin">
                    {req.sender?.userName}
                  </span>
                </div>
              ))}
            </div>
          )}

          {sentRequests.length === 0 &&
            receivedRequests.length === 0 &&
            !loading && <p className="mt-4 text-gray-600">No requests yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default Collaborations;

//upcoming friend requests track

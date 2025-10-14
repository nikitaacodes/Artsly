import { setError, setLoading } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Collaborations = () => {
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
      });
      const result = await res.json();
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
      });
      const result = await res.json();
      console.log("received requests", result);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="mx-2 my-2">
      <span className="font-bold text-[18px]">Collaboration Requests</span>
      <div className="flex flex-row">
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
    </div>
  );
};

export default Collaborations;

//upcoming friend requests track

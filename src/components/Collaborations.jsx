import React from "react";
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
    <div>
      <div>
        //allReq
        <button onClick={allReq}></button>
      </div>
      <div>
        //received request
        <button onClick={recReq}></button>
      </div>
    </div>
  );
};

export default Collaborations;

//upcoming friend requests track

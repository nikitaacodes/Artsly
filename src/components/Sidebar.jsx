import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[200px]">
      <div className="flex flex-col">
        <Link
          to={"/collaboration"}
          className="rounded-[30px] border-black text-white m-3 px-4 py-3 bg-blue-950"
        >
          {" "}
          Collaboration{" "}
        </Link>
        <Link
          to={"/explore"}
          className="rounded-[30px] border-black text-white m-3 px-4 py-3 bg-blue-950"
        >
          {" "}
          Explore{" "}
        </Link>
        <Link
          to={"/settings"}
          className="rounded-[30px] border-black text-white m-3 px-4 py-3 bg-blue-950"
        >
          {" "}
          Settings{" "}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

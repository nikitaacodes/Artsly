import React, { useState } from "react";

const Middlebar = () => {
  const [searchtext, setSearchText] = useState("");
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="w-1/3 flex flex-col">
      <div className="w-full h-[50px] px-5 py-2  flex flex-row justify-center gap-10">
        <input
          type="search"
          className="border-gray-800 w-[300px] h-[30px] border-1 rounded-lg px-3 py-1 "
          placeholder="Search"
          value={searchtext}
          onChange={handleSearch}
        />
        <label for=" searchbox"> </label>
        <div>
          <button className=" text-white font-bold px-3 py-2 bg-blue-900 rounded-3xl">
            Create
          </button>
        </div>
      </div>
      <div>
        <input
          type=" textbox"
          className="border-1 rounded-md w-[500px] h-[100px]"
          placeholder="Whats running on your mind..."
        ></input>
      </div>
    </div>
  );
};

export default Middlebar;

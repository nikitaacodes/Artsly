import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
const Explore = () => {
  const [searchtext, setSearchText] = useState("");
  
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-row w-screen">
        <Sidebar />

        <div>
          <div className=" mt-4">
            <input
              type="search"
              className="border-gray-800 w-[300px] h-[30px] border-1 rounded-lg px-3 py-1 "
              placeholder="Search an artist / skill / event..."
              value={searchtext}
              onChange={handleSearch}
            />
            <label htmlFor=" searchbox"> </label>
          </div>
          <div className="w-full px-2 py-2" id="category lane">
            <label htmlFor="cateogries" className="font-bold  text-[22px] mb-5">
              {" "}
              Categories{" "}
            </label>
            <div
              className="flex flex-row gap-2 justify-between py-2"
              id="cateogry boxes"
            >
              <div className="w-[200px] h-[70px] bg-amber-500 hover:bg-amber-700 rounded-[5px] text-[17px] font-bold pl-3 py-2">
                Art
              </div>

              <div className="w-[200px] h-[70px] bg-blue-700 hover:bg-blue-800 rounded-[5px] text-[17px] font-bold pl-3 py-2">
                Music
              </div>
              <div className="w-[200px] h-[70px] bg-green-600 hover:bg-green-700 rounded-[5px] text-[17px] font-bold pl-3 py-2">
                Magic
              </div>
              <div className="w-[200px] h-[70px] bg-pink-600 hover:bg-pink-700 rounded-[5px] text-[17px] font-bold pl-3 py-2">
                Photography
              </div>
              <div className="w-[200px] h-[70px] bg-red-600 hover:bg-red-700 rounded-[5px] text-[17px] font-bold pl-3 py-2">
                cooking
              </div>
            </div>
            <div> 
              {/* hashtags here */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;

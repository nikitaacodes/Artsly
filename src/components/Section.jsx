import React from "react";
import { Link } from "react-router-dom";
const Section = () => {
  return (
   <div className="ml-10">
 <div className=" w-[200px] flex flex-col  my-10 gap-4">
      {" "}
      <Link
        to="/profile"
        className="border-main border rounded-[25px] py-3 px-6 font-medium text-main hover:bg-maindlight"
      >
        {" "}
        Profile
      </Link>
      <Link
        to="/explore"
 className="border-main border rounded-[25px] py-3 px-6 font-medium text-main hover:bg-maindlight"
      >
        {" "}
        Explore
      </Link>
      <Link
        to="/messages"
 className="border-main border rounded-[25px] py-3 px-6 font-medium text-main hover:bg-maindlight"
      >
        {" "}
        Messages
      </Link>
      <Link
        to="/settings"
 className="border-main border rounded-[25px] py-3 px-6 font-medium text-main hover:bg-maindlight"
      >
        {" "}
        Settings
      </Link>
      <Link
        to="/collaborations"
 className="border-main border rounded-[25px] py-3 px-6 font-medium text-main hover:bg-maindlight"
      >
        {" "}
        Collaborations
      </Link>
    </div>
<div className="border-main border rounded-[25px] w-[200px] h-[60px] py-3 px-6 font-medium text-main bg-main"> 
    {/* user icon, username , id@  , icons bellow, mic, deafen, 3dot-for sign out */}
</div>
   </div>
   
  
  );
};


export default Section;

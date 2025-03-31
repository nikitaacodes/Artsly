
import { Link } from "react-router-dom";

import ProfileInfo from "./ProfileInfo";
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

     <ProfileInfo/>
    
    </div>
  );
};

export default Section;

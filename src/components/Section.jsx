import { Link } from "react-router-dom";

import ProfileInfo from "./ProfileInfo";
const Section = () => {
  return (
    <div className="ml-10">
      <div className=" w-[200px] flex flex-col  my-10 gap-4">
        {" "}
        <Link
          to="/profile"
          className="border-main border rounded-[25px] py-3 px-6 font-medium text-main flex flex-row
        gap-2 hover:bg-maindlight"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-square-user-round-icon lucide-square-user-round cursor-pointer hover:text-main transition-colors"
          >
            <path d="M18 21a6 6 0 0 0-12 0" />
            <circle cx="12" cy="11" r="4" />
            <rect width="18" height="18" x="3" y="3" rx="2" />
          </svg>
          Profile
        </Link>
        <Link
          to="/explore"
          className="border-main flex flex-row gap-2 border rounded-[25px] py-3 px-6 font-medium text-main hover:bg-maindlight"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search-icon lucide-search cursor-pointer hover:text-main transition-colors"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
          Explore
        </Link>
        <Link
          to="/messages"
          className="border-main flex flex-row gap-2 border rounded-[25px] py-3 px-6 font-medium text-main hover:bg-maindlight"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-messages-square-icon lucide-messages-square cursor-pointer transition-colors relative "
          >
            <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
            <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
          </svg>
          Messages
        </Link>
        <Link
          to="/settings"
          className="border-main flex flex-row gap-2 border rounded-[25px] py-3 px-6 font-medium text-main hover:bg-maindlight"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-settings-icon lucide-settings cursor-pointer hover:text-main transition-colors"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Settings
        </Link>
        <Link
          to="/collaborations"
          className="border-main flex flex-row gap-2 border rounded-[25px] py-3 px-6 font-medium text-main hover:bg-maindlight"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-handshake-icon lucide-handshake cursor-pointer hover:text-main transition-colors"
          >
            <path d="m11 17 2 2a1 1 0 1 0 3-3" />
            <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
            <path d="m21 3 1 11h-2" />
            <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
            <path d="M3 4h8" />
          </svg>
          Collaborations
        </Link>
      </div>

      <ProfileInfo />
    </div>
  );
};

export default Section;

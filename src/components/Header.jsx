import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      className="bg-reddish
   py-3 w-full flex flex-row justify-evenly "
    >
      <Link to="/aboutus" className="font-bold text-purple-900">
        {" "}
        About us
      </Link>
      <Link
        to="/gallery"
        className="font-bold text-purple-900
    "
      >
        {" "}
        HOme
      </Link>
      
    </div>
  );
};

export default Header;

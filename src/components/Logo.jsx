import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
        <span className="text-2xl font-bold text-white">F</span>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Friendo
      </span>
    </div>
  );
};

export default Logo;

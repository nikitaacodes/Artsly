import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Middlebar from "../components/Middlebar";

const Home = () => {
  return (
    <div className="h-screen bg-amber-100 ">
      <Header />
      <div className="flex flex-row">
        <Sidebar />
        <Middlebar />
      </div>
    </div>
  );
};

export default Home;

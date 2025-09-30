import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Middlebar from "../components/Middlebar";
import Righbar from "../components/Righbar";

const Home = () => {
  return (
    <div className="h-screen bg-amber-100 ">
      <Header />
      <div className="w-screen flex flex-row">
        <Sidebar />
        <Middlebar />
        <Righbar />
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Feed from "../components/Feed";


const Home = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="flex flex-row gap-10 h-[calc(100vh-64px)]">
        <Section />
        <Feed />
      
      </div>
    </div>
  );
};

export default Home;

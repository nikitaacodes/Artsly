import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Feed from "../components/Feed";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-row gap-10">
        {" "}
        <Section />
        <Feed />
      </div>
    </div>
  );
};

export default Home;

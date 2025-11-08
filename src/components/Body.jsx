import React from "react";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-2xl">
            <span className="text-white font-bold text-5xl">A</span>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Welcome to Artsly
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with artists, share your creativity, and explore amazing collaborations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Create</h3>
            <p className="text-gray-600">Share your artistic creations with the community</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Collaborate</h3>
            <p className="text-gray-600">Work together with other talented artists</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Explore</h3>
            <p className="text-gray-600">Discover amazing art and creative projects</p>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            to="/signup"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Body;

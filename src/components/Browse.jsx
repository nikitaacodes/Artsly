import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Browse = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", icon: "🌐" },
    { id: "art", name: "Art", icon: "🎨" },
    { id: "music", name: "Music", icon: "🎵" },
    { id: "photography", name: "Photography", icon: "📸" },
    { id: "writing", name: "Writing", icon: "✍️" },
  ];

  const items = [
    { id: 1, title: "Digital Art Collection", category: "art", author: "Alice", likes: 234 },
    { id: 2, title: "Jazz Fusion Album", category: "music", author: "Bob", likes: 189 },
    { id: 3, title: "Nature Photography", category: "photography", author: "Charlie", likes: 456 },
    { id: 4, title: "Poetry Anthology", category: "writing", author: "Diana", likes: 123 },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="flex flex-row w-screen">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <span className="mr-3">🔍</span>
              Browse
            </h1>
            <p className="text-gray-600 mb-6">Discover amazing content from our community</p>

            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-200 cursor-pointer"
                >
                  <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <span className="text-6xl">
                      {categories.find((c) => c.id === item.category)?.icon || "🎨"}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">By {item.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-red-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-semibold">{item.likes}</span>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all duration-200">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl text-gray-600 font-medium">No items found</p>
                <p className="text-gray-500 mt-2">Try selecting a different category</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
  
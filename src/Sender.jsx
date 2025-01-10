import React, { useContext } from "react";
import { AppContext } from './AppProvider';
import Header from "./Header";
import news from "./Images/news.jpg";
import { CiHeart } from "react-icons/ci";

const Sender = () => {
  const { addedItems, setAddedItems, fetchItems, setFetchItems, name } = useContext(AppContext);

  const handleMoveToFetch = (article, index) => {
    setFetchItems([...fetchItems, article]);

    const updatedItems = addedItems.filter((_, i) => i !== index);
    setAddedItems(updatedItems);
  };

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl text-blue-400 font-bold mb-4">Added Cards</h1>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {addedItems.map((article, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-lg border border-gray-200 rounded-xl p-4 transition-transform transform hover:-translate-y-2"
            >
              {/* Move to Fetch Button */}
              <button
                onClick={() => handleMoveToFetch(article, index)}
                className="text-red-500 text-xl mb-4"
              >
                <CiHeart />
              </button>

              {/* Article Image */}
              <img
                src={article.urlToImage || news}
                alt={article.title || "Default News"}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = news;
                }}
              />

              {/* Article Details */}
              <div className="px-2">
                <h2 className="font-semibold text-lg text-gray-800 mb-2 truncate">
                  {article.source.name}
                </h2>
                <h2 className="font-bold text-md text-gray-700 mb-2 truncate">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sender;

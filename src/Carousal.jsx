import React, { useContext, useEffect, useMemo, useState } from "react";
import news from "./Images/news.jpg";
import Header from "./Header";
import Slider from "react-slick";
import { AppContext } from "./AppProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CircleArrowRight, CircleArrowLeft, Scroll } from "lucide-react";

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-[-25px] transform -translate-y-1/2 cursor-pointer z-10 text-blue-500"
    onClick={onClick}
  >
    <CircleArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-[-25px] transform -translate-y-1/2 cursor-pointer z-10 text-blue-500"
    onClick={onClick}
  >
    <CircleArrowLeft />
  </div>
);

const Carousel = () => {
  const { addedItems, setAddedItems, filteredData, setFilteredData, name } =
    useContext(AppContext);

  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=74d83fc6076945f9b7fbe3210217c34a"
      );
      const result = await response.json();

      if (result.articles) {
        setData(result.articles);
        setFilteredData(result.articles);
      } else {
        setError("No articles found.");
      }
    } catch {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (article, index) => {
    if (!addedItems.some((item) => item.source.name === article.source.name)) {
      setAddedItems([...addedItems, article]);
      handleRemove(index);
    }
  };

  const handleRemove = (indexToRemove) => {
    const updatedData = filteredData.filter((_, index) => index !== indexToRemove);
    setFilteredData(updatedData);
  };

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = data.filter((article) =>
      article.source.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const displayedData = useMemo(() => {
    return showAll ? filteredData : filteredData.slice(0, 10);
  }, [filteredData, showAll]);

  useEffect(() => {
    fetchData();
  }, []);

  const sliderSettings = {
    infinite: displayedData.length > 3,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="p-4">
        {/* Greeting Section */}
        <div className="border my-2 p-2 rounded">
          <h3 className="text-red-500">Hello, {name}!</h3>
        </div>

        {/* Filter Input */}
        <input
          type="text"
          placeholder="Filter by source..."
          className="bg-gray-200 p-2 rounded mb-4 w-full"
          onChange={handleFilter}
        />

        {/* <h1 className="text-2xl text-blue-400 font-bold mb-4">Tesla News</h1> */}

        {/* <button
          onClick={fetchData}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          {loading ? "Loading..." : "Load News"}
        </button> */}

        {loading ? (
          <div className="flex items-center justify-center mt-20">
            <img src="./sp.svg" alt="Loading..." />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="w-full px-3">
            <Slider {...sliderSettings}>
              {displayedData.map((article, index) => (
                <div
                  className="bg-white shadow-md mt-5 hover:shadow-lg border border-gray-200 rounded-xl p-4 mx-2 h-[75vh] transition-transform transform hover:-translate-y-2"
                  key={index}
                >

                  <img
                    src={article.urlToImage || news}
                    alt={article.title || "Default News"}
                    className="w-full h-40 object-cover rounded-t-lg mb-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = news;
                    }}
                  />

                  <div className="px-2">
                    <h2 className="font-semibold text-lg text-gray-800 mb-2 truncate">
                      {article.source.name}
                    </h2>
                    <h2 className="font-bold text-md text-gray-700 mb-2 truncate">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Read more
                    </a>
                  </div>

                  <div className="flex justify-between mt-4 px-2">
                    <button
                      onClick={() => handleRemove(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleAdd(article, index)}
                      className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}

        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;

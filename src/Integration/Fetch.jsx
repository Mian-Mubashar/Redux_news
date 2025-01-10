import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../AppProvider";
import news from "../Images/news.jpg";
import Header from "../Header";

const Fetch = () => {
    const { addedItems, setAddedItems, filteredData, setFilteredData, name } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = () => {
        setLoading(true);
        setError(null);

        fetch(
            "https://newsapi.org/v2/everything?q=tesla&from=2024-12-01&sortBy=publishedAt&apiKey=74d83fc6076945f9b7fbe3210217c34a"
        )
            .then((res) => res.json())
            .then((res) => {
                if (res.articles) {
                    setData(res.articles);
                    setFilteredData(res.articles);
                } else {
                    setError("No articles found.");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data. Please try again later.");
                setLoading(false);
            });
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

    return (
        <>
            <Header />
            <div className="p-4">
                <div className="border my-2 p-2 rounded-normal">
                    <h3 className="text-red-500">Hello {name}!</h3>
                </div>
                <input
                    type="text"
                    placeholder="Filter by source..."
                    className="bg-gray-200 p-2 rounded mb-4 w-full"
                    onChange={handleFilter}
                />

                <h1 className="text-2xl text-blue-400 font-bold mb-4 ">Tesla News</h1>
                <button
                    onClick={fetchData}
                    className="bg-blue-500 text-white p-2 rounded mb-4"
                >
                    {loading ? "Loading..." : "Load this page"}
                </button>

                {loading ? (
                    <div className="flex items-center justify-center mt-20">
                        <img src="./sp.svg" alt="Loading..." />
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedData.map((article, index) => (
                            <div
                                className="bg-orange-400 border-2 rounded-lg p-4"
                                key={index}
                            >
                                {article.urlToImage ? (
                                    <img
                                        src={article.urlToImage}
                                        alt={article.title}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = news;
                                            e.target.alt = ""
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={news}
                                        alt="Default News"
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                    />
                                )}
                                <h2 className="font-bold text-lg mb-2">{article.source.name}</h2>
                                <h2 className="font-bold text-lg mb-2">{article.title}</h2>
                                <p className="text-sm text-gray-700 mb-2">{article.description}</p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    Read more
                                </a>
                                <div className="flex mt-4">
                                    <button
                                        onClick={() => handleRemove(index)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-full mr-2"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => handleAdd(article, index)}
                                        className="bg-green-500 text-white px-7 py-2 rounded-full"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}
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

export default Fetch;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, removeArticle, addToLeave, search } from "./features/news/newsSlice";
import news from "./Images/news.jpg";

const NewsList = () => {
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.news);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNews());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p style={{ textAlign: "center", color: "blue" }}>Loading...</p>;
  }

  if (status === "failed") {
    return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;
  }

const searchhandler = (e)=>{

  dispatch(search(e.target.value))
}

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Apple News
      </h1>

      <input type="text" placeholder="Search" onChange={searchhandler} />
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {articles.slice(0, 10).map((article, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              backgroundColor: "#fff",
              transition: "transform 0.2s",
            }}
          >
            <div style={{ padding: "20px" }}>
              <img
                src={article.urlToImage}
                alt=""
                style={{ height: "13rem", objectFit: "contain" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = news;
                }}
              />
              <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>
                {article.title}
              </h2>
              <p style={{ fontSize: "14px", color: "#555" }}>
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                {article.description}
              </p>
              <button
                onClick={() => dispatch(addToLeave(index))} // Dispatch addToLeave
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              >
                Add to Leave
              </button>
              <button
                onClick={() => dispatch(removeArticle(index))}
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;

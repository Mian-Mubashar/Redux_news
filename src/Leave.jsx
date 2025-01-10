import React from "react";
import { useSelector } from "react-redux";

const Leave = () => {
    const leaveArticles = useSelector((state) => state.news.leaveArticles);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#333" }}>Leave Articles</h1>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)", 
                    gap: "20px", 
                }}
            >
                {leaveArticles.length > 0 ? (
                    leaveArticles.map((article, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                padding: "16px",
                                backgroundColor: "#f9f9f9",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                style={{
                                    height: "150px",
                                    width: "100%",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "fallback-image-url.jpg"; // Replace with a fallback image URL
                                }}
                            />
                            <div style={{ textAlign: "center", marginTop: "10px" }}>
                                <h2
                                    style={{
                                        fontSize: "1.2rem",
                                        color: "#222",
                                        margin: "0 0 10px",
                                    }}
                                >
                                    {article.title}
                                </h2>
                                <p
                                    style={{
                                        fontSize: "1rem",
                                        color: "#555",
                                        lineHeight: "1.5",
                                    }}
                                >
                                    {article.description}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#999" }}>
                        No articles in Leave.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Leave;

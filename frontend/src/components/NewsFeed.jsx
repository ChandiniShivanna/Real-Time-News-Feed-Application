import React from "react";
import { useSelector } from "react-redux";

const NewsFeed = () => {
  const { articles, loading, error } = useSelector((state) => state.news);
  const { subscriptions } = useSelector((state) => state.user);

  // Filter articles if subscriptions exist
  const filteredArticles =
    subscriptions.length > 0
      ? articles.filter((article) => subscriptions.includes(article.category))
      : articles;

  return (
    <div style={{ flex: 2, marginRight: "20px" }}>
      <h2>News Feed</h2>
      {loading && <p>Loading news...</p>}
      {error && <p>Error: {error}</p>}
      {filteredArticles.map((article) => (
        <div
          key={article._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <p>
            <strong>Category:</strong> {article.category}
          </p>
          <p>
            <strong>Views:</strong> {article.views} | <strong>Likes:</strong>{" "}
            {article.likes}
          </p>
          <p>
            <em>{new Date(article.createdAt).toLocaleString()}</em>
          </p>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;

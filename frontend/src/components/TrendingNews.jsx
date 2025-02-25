import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingNews } from "../slices/newsSlice";

const TrendingNews = () => {
  const dispatch = useDispatch();
  const { trending, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchTrendingNews());
  }, [dispatch]);

  return (
    <div style={{ flex: 1 }}>
      <h2>Trending News</h2>
      {loading && <p>Loading trending news...</p>}
      {error && <p>Error: {error}</p>}
      {trending.map((article) => (
        <div
          key={article._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{article.title}</h4>
          <p>
            <strong>Popularity:</strong> {article.views + article.likes}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TrendingNews;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import {
  addNewsArticle,
  fetchNews,
  fetchTrendingNews,
} from "./slices/newsSlice";
import NewsFeed from "./components/NewsFeed";
import Categories from "./components/Categories";
import TrendingNews from "./components/TrendingNews";

const socket = io("http://localhost:5000");

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch initial news and trending articles
    dispatch(fetchNews());
    dispatch(fetchTrendingNews());

    // Listen for new news articles via Socket.io
    socket.on("news", (data) => {
      dispatch(addNewsArticle(data));
    });

    // Cleanup on unmount
    return () => {
      socket.off("news");
    };
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Real-Time News Feed</h1>
      <Categories />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <NewsFeed />
        <TrendingNews />
      </div>
    </div>
  );
}

export default App;

const express = require("express");
const router = express.Router();
const News = require("../models/News");

// @route   GET /api/news
// @desc    Get news articles; filter by category if provided via query parameter
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    const newsArticles = await News.find(query).sort({ createdAt: -1 });
    res.json(newsArticles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/news/trending
// @desc    Get trending news using aggregation (based on views + likes)
router.get("/trending", async (req, res) => {
  try {
    const trendingNews = await News.aggregate([
      {
        $addFields: {
          popularity: { $add: ["$views", "$likes"] },
        },
      },
      { $sort: { popularity: -1 } },
      { $limit: 5 },
    ]);
    res.json(trendingNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/news
// @desc    Create a new news article and emit it via Socket.io
router.post("/", async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const newNews = new News({ title, content, category });
    await newNews.save();

    // Emit the new article to all connected clients
    req.io.emit("news", newNews);

    res.status(201).json(newNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

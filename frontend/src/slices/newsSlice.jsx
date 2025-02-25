import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch news articles (optionally filtered by category)
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (category = "", thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/news?category=${category}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch trending news articles
export const fetchTrendingNews = createAsyncThunk(
  "news/fetchTrendingNews",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/news/trending`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    trending: [],
    loading: false,
    error: null,
  },
  reducers: {
    addNewsArticle: (state, action) => {
      // Prepend the new article to the list
      state.articles.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling news fetch
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling trending news fetch
      .addCase(fetchTrendingNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingNews.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addNewsArticle } = newsSlice.actions;
export default newsSlice.reducer;

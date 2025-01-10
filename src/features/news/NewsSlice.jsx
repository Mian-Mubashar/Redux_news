import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await axios.get(
    "https://newsapi.org/v2/everything?q=apple&from=2025-01-07&to=2025-01-07&sortBy=popularity&apiKey=74d83fc6076945f9b7fbe3210217c34a"
  );
  return response.data.articles;
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    leaveArticles: [], // Add a new state for articles moved to Leave
    status: "idle",
    error: null,
  },
  reducers: {
    removeArticle: (state, action) => {
      state.articles = state.articles.filter((_, index) => index !== action.payload);
    },
    addToLeave: (state, action) => {
      const articleToAdd = state.articles[action.payload];
      state.leaveArticles.push(articleToAdd);
      state.articles = state.articles.filter((_, index) => index !== action.payload);
    },
    search: (state, action) => {

      // const value = action.payload;
      // value.tolowerCase();
      state.articles = state.articles.filter((article) => {
       return article.source.name.tolowerCase().include(action.payload.tolowerCase())

      })

    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { removeArticle, addToLeave, search } = newsSlice.actions;
export default newsSlice.reducer;

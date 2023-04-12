import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const __addWriteThunk = createAsyncThunk(
  "POSTADD_WRITE", // action value
  async (payload, thunkAPI) => {
    // 콜백함수
    try {
      const { data } = await axios.post(`http://localhost:3001/posts`, payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPostViewThunk = createAsyncThunk(
  "POSTGET_POSTS",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/posts${id}`);
      return thunkAPI.fulfillWithValue(data); //action.payload이다.
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __deletePost = createAsyncThunk(
  "POSTDELETE_POST",
  async (arg, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${arg}`);
      // console.log(arg);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updatePostThunk = createAsyncThunk(
  "POSTUPDATE_POST",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`http://localhost:3001/posts/${payload.id}`, payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __viewCount = createAsyncThunk(
  "POSTVIEW_COUNT",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/posts${id}`);
      const payload = { ...data, read: data.read + 1 };

      await axios.patch(`http://localhost:3001/posts/${id}`, payload);
      return thunkAPI.fulfillWithValue(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  posts: [],
  error: null,
  isLoading: false,
  detailPost: null,
};

export const postViewSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    clearPosts: (state) => {
      state.posts = {
        user_id: "",
        id: uuidv4(),
        rate: "",
        title: "",
        content: "",
        read: 0,
        username: "",
      };
    },
  },
  extraReducers: {
    [__addWriteThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      current(state).posts.push(action.payload);
    },
    [__addWriteThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addWriteThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPostViewThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detailPost = action.payload;
    },
    [__getPostViewThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getPostViewThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detailPost = action.payload;
      // console.log("action", action.payload);
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__updatePostThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log("actionpayload", current(state));
      state.posts = action.payload;
      // console.log("actionpayload2", state);
    },
    [__updatePostThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updatePostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearPosts, addPost } = postViewSlice.actions;
export default postViewSlice.reducer;

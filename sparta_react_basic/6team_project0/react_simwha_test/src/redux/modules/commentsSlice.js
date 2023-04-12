import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getCommnetsByTodoId = createAsyncThunk(
  "GET_COMMENT_BY_TODO_ID",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/comments?post_id=${arg}`
      );
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);
//댓글 추가하기
export const __addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post(`http://localhost:3001/comments`, arg);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
//삭제하기
export const __deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/comments/${arg}`);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);
//수정
export const __updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      axios.patch(`http://localhost:3001/comments/${arg.id}`, arg);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  comments: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComment: (state) => {
      state.comments.data = [];
    },
  },
  extraReducers: {
    // 댓글 조회
    [__getCommnetsByTodoId.pending]: (state) => {
      state.comments.isLoading = true;
    },
    [__getCommnetsByTodoId.fulfilled]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.data = action.payload;
    },
    [__getCommnetsByTodoId.rejected]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.error = action.payload;
    },
    // 댓글 추가
    [__addComment.pending]: (state) => {
      state.comments.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.data.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.error = action.payload;
    },
    //댓글삭제
    [__deleteComment.pending]: (state) => {
      state.comments.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.comments.isLoading = false;
      const target = state.comments.data.findIndex(
        (comment) => comment.id === action.payload
      );
      state.comments.data.splice(target, 1);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.error = action.payload;
    },
    //수정
    [__updateComment.pending]: (state) => {},
    [__updateComment.fulfilled]: (state, action) => {
      const target = state.comments.data.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.comments.data.splice(target, 1, action.payload);
    },
    [__updateComment.rejected]: () => {},
  },
});

export default commentsSlice.reducer;

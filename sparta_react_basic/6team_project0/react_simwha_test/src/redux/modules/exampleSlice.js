import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getTodoThunk = createAsyncThunk(
  "GET_TODO",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/todos/${arg}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updateTodoThunk = createAsyncThunk(
  "UPDATE_TODO",
  async (arg, thunkAPI) => {
    try {
      axios.patch(`http://localhost:3001/todos/${arg}`, arg);
      return thunkAPI.fulfillWithValue(arg);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  todo: {
    id: 0,
    body: "",
    username: "",
    title: "",
  },
  error: null,
  isLoading: false,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodo: (state) => {
      state.todo = {
        id: 0,
        body: "",
        username: "",
        title: "",
      };
    },
  },
  extraReducers: {
    [__getTodoThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__getTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getTodoThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateTodoThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__updateTodoThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearTodo } = todoSlice.actions;
export default todoSlice.reducer;

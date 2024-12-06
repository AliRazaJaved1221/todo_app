import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [], // Task list
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.list.push({ ...action.payload, id: state.list.length + 1, status: action.payload.status || false  });
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      state.list = state.list.map((task) =>
        task.id === action.payload.id ? {...task, ...action.payload} : task
      );
    },
    setTasksFromStorage: (state, action) => {
      state.list = action.payload;
    },
  },
  
});

export const { addTask, deleteTask, editTask, setTasksFromStorage } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;

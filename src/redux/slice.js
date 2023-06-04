import {createSlice} from '@reduxjs/toolkit';
export const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    checkTask: (state, action) => {
      const item = state.filter(element => element.id == action.payload.id)[0];
      const index = state.indexOf(item);
      state[index].complete = !state[index].complete;
    },
    addTask: (state, action) => {
      const newTask = {
        id: Math.random(),
        title: action.payload.title,
        desc: action.payload.desc,
      };
      state.push(newTask);
    },
    deleteTask: (state, action) => {
      return state.filter(item => item !== action.payload.id);
    },
    editTask: (state, action) => {
      const item = state.filter(element => element.id == action.payload.id)[0];
      const index = state.indexOf(item);
      state[index].title = action.payload.title;
      state[index].desc = action.payload.desc;
    },
  },
});
export const {checkTask, addTask, deleteTask, editTask} = taskSlice.actions;
export default taskSlice.reducer;

// import { configureStore } from '@reduxjs/toolkit';
// import taskReducer from './slice'
// export default configureStore({reducer: {tasks: taskReducer}});

import {configureStore, createStore} from '@reduxjs/toolkit';
const initState = {
  tasks: [],
};
const taskReducer = (state = initState, action) => {
  ///////////////////////////
  ////////check/uncheck task////////
  ///////////////////////////
  if (action.type === 'check') {
    const updatedItems = state.tasks.map(item => {
      if (item.id === action.payload) {
        return {...item, complete: !item.complete};
      }
      return item;
    });
    return {...state, tasks: updatedItems};
  }

  ///////////////////////////
  ////////edits task////////
  ///////////////////////////
  if (action.type === 'edit') {
    const updatedItems = state.tasks.map(item => {
      if (item.id === action.payload.id) {
        return {
          ...item,
          title: action.payload.title,
          desc: action.payload.desc,
        };
      }
      return item;
    });
    return {...state, tasks: updatedItems};
  }

  ///////////////////////////
  ////////delete task////////
  ///////////////////////////
  if (action.type === 'delete') {
    return {
      ...state,
      tasks: state.tasks.filter(item => item.id !== action.payload),
    };
  }

  ///////////////////////////
  ////////add task////////
  ///////////////////////////
  if (action.type === 'add') {
    return {
      ...state,
      tasks: [...state.tasks, action.payload],
    };
  }
  return state;
};
const store = createStore(taskReducer);
export default store;

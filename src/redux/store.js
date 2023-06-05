// import { configureStore } from '@reduxjs/toolkit';
// import taskReducer from './slice'
// export default configureStore({reducer: {tasks: taskReducer}});
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, createStore} from '@reduxjs/toolkit';
const initState = {
  tasks: [],
};
const taskReducer = (state = initState, action) => {
  ///////////////////////////
  ////////check/uncheck task////////
  ///////////////////////////
  if (action.type === 'check') {
    const setData = async data => {
      try {
        // Store the data in AsyncStorage
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('@tasks', jsonValue);
    
      } catch (error) {
        console.log(error);
      }
    };
    const updatedItems = state.tasks.map(item => {
      if (item.id === action.payload) {
        return {...item, complete: !item.complete};
      }
      return item;
    });
    setData(updatedItems);

    return {...state, tasks: updatedItems};
  }

  ///////////////////////////
  ////////edits task////////
  ///////////////////////////
  if (action.type === 'edit') {
    const setData = async data => {
      try {
        // Store the data in AsyncStorage
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('@tasks', jsonValue);
      } catch (error) {
        console.log(error);
      }
    };
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
    setData(updatedItems);
    return {...state, tasks: updatedItems};
  }

  ///////////////////////////
  ////////delete task////////
  ///////////////////////////
  if (action.type === 'delete') {
    const setData = async data => {
      try {
        // Store the data in AsyncStorage
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('@tasks', jsonValue);
      } catch (error) {
        console.log(error);
      }
    };
    const updatedItems = state.tasks.filter(item => item.id !== action.payload);
    setData(updatedItems);
    return {
      ...state,
      tasks: updatedItems,
    };
  }

  //////////////GET DATA FROM LOCAL STORAGE///////////
  if (action.type === 'GET_DATA') {
    const data = action.payload;

    return {...state, tasks: data == null ? [] : data};
  }

  ///////////////////////////
  ////////add task////////
  ///////////////////////////
  if (action.type === 'add') {
    const setData = async data => {
      try {
        // Store the data in AsyncStorage
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('@tasks', jsonValue);
      } catch (error) {}
    };
    const updatedItems = [...state.tasks, action.payload];
    setData(updatedItems);
    return {
      ...state,
      tasks: updatedItems,
    };
  }
  return state;
};
const store = createStore(taskReducer);
export default store;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import AddTask from './src/screens/AddTask';
import EditTask from './src/screens/EditTask';
import {Provider} from 'react-redux';
import store from './src/redux/store';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function App() {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Add task" component={AddTask} />
          <Stack.Screen name="Edit task" component={EditTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Pressable} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AllTasks from './AllTasks';
import CompletedTasks from './CompletedTasks';
import InCompletedTasks from './InCompletedTasks';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();
function Home({navigation}) {
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem('@tasks');
        dispatch({type: 'GET_DATA', payload: JSON.parse(data)});
      } catch (error) {
      }
    };
    getData();
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="All Tasks"
      screenOptions={({route}) => ({
        tabBarStyle: {
          padding: 10,
          height: 70,
        },
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontWeight: 'bold',
          fontSize: 12,
        },

        headerTitleAlign: 'center',
        headerRight: () => (
          <View style={{marginRight: 15}}>
            <Pressable
              onPress={() => {
                navigation.navigate('Add task');
              }}>
              <FontAwesome name="plus" size={18} color="#f5b324" />
            </Pressable>
          </View>
        ),
        tabBarActiveTintColor: '#f5b324',
        tabBarIcon: ({color, size}) => {
          let iconName;
          let rn = route.name;
          if (rn === 'All Tasks') {
            iconName = 'list';
          } else if (rn === 'Complete') {
            iconName = 'check';
          } else if (rn === 'Incomplete') {
            iconName = 'close';
          }
          return <FontAwesome name={iconName} color={color} size={size} />;
        },
      })}>
      <Tab.Screen name="All Tasks" component={AllTasks} />
      <Tab.Screen name="Complete" component={CompletedTasks} />
      <Tab.Screen name="Incomplete" component={InCompletedTasks} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

export default Home;

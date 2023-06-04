import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Task from './Task';
function CompletedTasks({navigation}) {
  const tasks = useSelector(state => state.tasks.filter(el => el.complete));
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 15,
      }}>
      {tasks.length != 0 ? (
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <Task item={item} navigation={navigation}></Task>
          )}
          keyExtractor={item => item.id}></FlatList>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18}}>There is no completed tasks</Text>
        </View>
      )}
    </View>
  );
}

export default CompletedTasks;

import {StyleSheet, Text, View, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {Swipeable} from 'react-native-gesture-handler';
import {useState} from 'react';
export default function Task({item, navigation}) {
  const [swipeLeft, setSwipeLeft] = useState(false);
  const [swipeRight, setSwipeRight] = useState(false);

  const dispatch = useDispatch();
  function check() {
    const action = {type: 'check', payload: item.id};
    dispatch(action);
  }
  function deleteItem() {
    const action = {type: 'delete', payload: item.id};
    dispatch(action);
  }
  const left = () => {
    return (
      <Pressable
        onPress={deleteItem}
        style={[
          styles.swipe,
          {
            backgroundColor: '#ff3300',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          },
        ]}>
        <FontAwesome name="trash" size={20} color={'white'} />
      </Pressable>
    );
  };
  const right = () => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Edit task', {
            item: item,
          });
        }}
        style={[
          styles.swipe,
          {
            backgroundColor: '#3399ff',
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
          },
        ]}>
        <FontAwesome name="edit" size={20} color={'white'} />
      </Pressable>
    );
  };
  return (
    <View
      style={{
        marginBottom: 15,
      }}>
      <Swipeable
        renderLeftActions={left}
        renderRightActions={right}
        onSwipeableClose={() => {
          setSwipeRight(false);
          setSwipeLeft(false);
        }}
        onSwipeableLeftOpen={() => {
          setSwipeLeft(true);
        }}
        onSwipeableRightOpen={() => {
          setSwipeRight(true);
        }}>
        <View
          style={[
            styles.task,
            {
              borderRadius: swipeLeft || swipeRight ? 0 : 15,
              borderColor: swipeLeft
                ? 'red'
                : swipeRight
                ? '#3399ff'
                : '#d9d9d9',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Pressable onPress={check}>
              <FontAwesome
                name="check-square"
                size={25}
                color={item.complete ? '#f5b324' : '#999999'}
                style={{marginRight: 15}}
              />
            </Pressable>
            <View>
              <Text
                style={{
                  maxWidth: 280,
                  color: 'black',
                  marginBottom: 4,
                }}>
                {item.title == '' ? 'No Title' : item.title}
              </Text>
              {
                <Text
                  style={{
                    maxWidth: 280,
                    color: '#737373',
                  }}>
                  {item.desc == '' ? 'No description' : item.desc}
                </Text>
              }
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <Pressable onPress={deleteItem}>
            <FontAwesome
              name="trash"
              size={20}
              color={'#ff3300'}
              style={{marginRight: 15}}
            />
          </Pressable> */}
            {/* <Pressable
            onPress={() => {
              navigation.navigate('Edit task', {
                item: item,
              });
            }}>
            <FontAwesome name="edit" size={20} color={'#3399ff'} />
          </Pressable> */}
          </View>
        </View>
      </Swipeable>
    </View>
  );
}
const styles = StyleSheet.create({
  swipe: {
    position: 'relative',
    left: 25,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  task: {
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 15,
  },
});

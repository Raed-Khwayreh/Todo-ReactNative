import React, {useEffect, useState} from 'react';
import {TextInput, StyleSheet, View, Text, Pressable} from 'react-native';

import {useDispatch} from 'react-redux';
function AddTask({navigation, route}) {
  const dispatch = useDispatch();
  const [foucsInput1, setInputFoucs1] = useState(false);
  const [foucsInput2, setInputFoucs2] = useState(false);

  const [enable, setEnable] = useState(false);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    title != '' ? setEnable(true) : setEnable(false);
  }, [title, desc]);
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}>
      <TextInput
        placeholder="Task title"
        style={[
          styles.input,
          foucsInput1 ? styles.textInputFoucs : styles.textInputBlur,
        ]}
        onFocus={() => {
          setInputFoucs1(true);
        }}
        onBlur={() => {
          setInputFoucs1(false);
        }}
        onChangeText={text => {
          setTitle(text);
        }}
        cursorColor={'#f5b324'}></TextInput>
      <TextInput
        multiline={true}
        cursorColor={'#f5b324'}
        placeholder="Task descroption"
        style={[
          styles.input,
          foucsInput2 ? styles.textInputFoucs : styles.textInputBlur,
        ]}
        onFocus={() => {
          setInputFoucs2(true);
        }}
        onBlur={() => {
          setInputFoucs2(false);
        }}
        onChangeText={text => {
          setDesc(text);
        }}></TextInput>
      <Pressable
        onPress={() => {
          const newTask = {
            id: Math.random(),
            title: title,
            desc: desc,
            complete: false,
          };
          const action = {
            type: 'add',
            payload: newTask,
          };
          dispatch(action);
          navigation.goBack();
        }}
        disabled={!enable}>
        <View
          style={[styles.btn, enable ? styles.btnEnabled : styles.btnDisabled]}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Add task
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    padding: 18,
    borderRadius: 15,
  },
  btnEnabled: {backgroundColor: '#f5b324'},
  btnDisabled: {backgroundColor: '#b3b3b3'},
  textInputBlur: {
    borderColor: '#e9e9e9',
  },
  textInputFoucs: {
    borderColor: '#f5b324',
  },
  input: {
    borderWidth: 2,
    backgroundColor: 'white',
    marginBottom: 15,
    color: 'black',
    padding: 15,
    borderRadius: 15,
  },
});

export default AddTask;

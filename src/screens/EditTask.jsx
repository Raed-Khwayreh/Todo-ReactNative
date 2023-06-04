import React, {useEffect, useState} from 'react';
import {TextInput, StyleSheet, View, Text, Pressable} from 'react-native';

import {useDispatch} from 'react-redux';
function EditTask({navigation, route}) {
  const dispatch = useDispatch();
  const {item} = route.params;
  const [foucsInput1, setInputFoucs1] = useState(false);
  const [foucsInput2, setInputFoucs2] = useState(false);

  const [title, setTitle] = useState(item.title);
  const [desc, setDesc] = useState(item.desc);

  useEffect(() => {}, [title, desc]);
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}>
      <TextInput
        maxLength={25}
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
        defaultValue={item.title}
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
        }}
        defaultValue={item.desc}></TextInput>
      <Pressable
        onPress={() => {
          const action = {
            type: 'edit',
            payload: {id: item.id, title: title, desc: desc},
          };
          dispatch(action);
          navigation.goBack();
        }}>
        <View style={[styles.btn, styles.btnEnabled]}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Edit task
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

export default EditTask;

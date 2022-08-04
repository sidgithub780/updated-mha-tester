import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

const PersonalInfoScreen = () => {
  const [homeNumber, setHomeNumber] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);

  useEffect(() => {
    const getStuff = async () => {
      let hn = await getData('homeNumber');
      let mn = await getData('mobileNumber');
      setHomeNumber(hn);
      setMobileNumber(mn);
      console.log(hn);
    };

    getStuff();
  }, []);

  return (
    <View>
      <Text>PersonalInfoScreen</Text>

      <Text style={{marginTop: 40}}>My home number:</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        onChangeText={num => {
          setHomeNumber(num);
        }}
      />

      <Text style={{marginTop: 40}}>My mobile number:</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        onChangeText={num => {
          setMobileNumber(num);
        }}
      />
      <Text>mobile: {mobileNumber}</Text>
      <Text>home: {homeNumber}</Text>
      <Button
        title="test"
        onPress={async () => {
          await storeData('homeNumber', homeNumber);
          await storeData('mobileNumber', mobileNumber);
          alert('data saved');
        }}
      />
    </View>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 10,
  },
});

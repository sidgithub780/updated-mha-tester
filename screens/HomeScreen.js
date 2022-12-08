// How to Access Call Logs of Android Devices from React Native App
// https://aboutreact.com/access-call-logs-of-android-devices/

// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';

// import CallLogs API
import CallLogs from 'react-native-call-log';
import NetInfo from '@react-native-community/netinfo';

import {addCalls} from '../functions/Links';

import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (Platform.OS !== 'ios') {
        try {
          //Ask for runtime permission
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
            {
              title: 'Call Log Example',
              message: 'Access your call logs',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            NetInfo.fetch().then(state => {
              console.log('Connection type', state.type);
              console.log('Is connected?', state.isConnected);
            });
            CallLogs.loadAll().then(c => setListData(c));
            CallLogs.load(3).then(c => console.log(c));
          } else {
            alert('Call Log permission denied');
          }
        } catch (e) {
          alert(e);
        }
      } else {
        alert(
          'Sorry! You can’t get call logs in iOS devices because of the security concern',
        );
      }
    }

    // WORKS FINE IF YOU HANDLED CORS CORRECTLY IN THE SERVER SIDE

    async function getUserData() {
      try {
        const response = await axios.get('http://127.0.0.1:8921/calls');
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    getUserData();
  }, []);

  const ItemView = ({item}) => {
    return (
      // FlatList Item
      <View>
        <Text style={styles.textStyle}>
          Name : {item.name ? item.name : 'NA'}
          {'\n'}
          DateTime : {item.dateTime}
          {'\n'}
          Duration : {item.duration}
          {'\n'}
          PhoneNumber : {item.phoneNumber}
          {'\n'}
          RawType : {item.rawType}
          {'\n'}
          Timestamp : {item.timestamp}
          {'\n'}
          Type : {item.type}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="Refresh"
          onPress={async () => {
            await addCalls(
              77777,
              '2011-01-01 00:00:00',
              7777777,
              77777777,
              234,
              'OUTGOING',
              77777777,
            );

            alert('done');
          }}
        />
        <Text style={styles.titleText}>Call Logs</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Calendar');
          }}>
          <Text>Calendar Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PersonalInfo');
          }}>
          <Text>Personal Info Screen</Text>
        </TouchableOpacity>
        <FlatList
          data={listData}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 16,
    marginVertical: 10,
  },
});

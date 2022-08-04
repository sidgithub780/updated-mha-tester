import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';

import RNCalendarEvents from 'react-native-calendar-events';

const CalendarScreen = () => {
  const [calEvents, setCalEvents] = useState(null);

  useEffect(() => {
    const getStatus = async () => {
      const status = await RNCalendarEvents.checkPermissions(true);
      console.log(status);
      const reqPerms = await RNCalendarEvents.requestPermissions(true);
      console.log(reqPerms);
      const calendars = await RNCalendarEvents.findCalendars();
      console.log(calendars);
      const events = await RNCalendarEvents.fetchAllEvents(
        '2011-10-05T14:48:00.000Z',
        '2022-10-05T14:48:00.000Z',
      );
      console.log(events.length);
      setCalEvents(events);
      events.map(event => {
        console.log(event.title);
      });
    };

    getStatus();
  }, []);

  return (
    <View>
      <ScrollView>
        {calEvents?.map(event => {
          return <Text>{event.title}</Text>;
        })}
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({});

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Bills = props => {
  //un fel de set state

  //constructor cu items
  //this.setState de items
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {

      const time = day.timestamp;
      const strTime = timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
        items[strTime].push({
          name: 'Factura la ' + strTime + ' #',

        });
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
              <Avatar.Text label="G" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bills</Text>
        <TouchableHighlight
          style={styles.addButton}
          onPress={() => { this.setModalVisible(true); this.setInputText(), this.setIsNew(true) }} underlayColor={'#f1f1f1'}>
          <View style={styles.item} >
            <Text style={styles.text}>+  </Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={{ flex: 1 }}>
        <Agenda
          items={items}
          onCalendarToggled={calendarOpened => this.setState({ calendarOpened })}
           loadItemsForMonth={loadItems}
          selected={'2020-11-25'}
          renderItem={renderItem}
        />
      </View>

    </View>
  );
};

export default Bills;


const styles = StyleSheet.create({
  header: {
    height: 140,
    backgroundColor: '#41cac6',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  headerText: {
    flex: 1,
    alignSelf: 'flex-start',
    marginTop: 60,
    marginLeft: 10,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    alignItems: 'center',

  },
  addButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: 70,
    height: 70,
    backgroundColor: '#4fa2d2',
    borderRadius: 50,
    marginBottom: 10
  },
  text: {
    marginVertical: 30,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
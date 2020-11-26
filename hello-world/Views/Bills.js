import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';

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
  alignSelf:'flex-start',
  marginTop:60,
  marginLeft:10,
  fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
}
});
const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Bills = props  => {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
    
        const time = day.timestamp ;
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
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
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
    <View style={{flex: 1}}>
       <View style={styles.header}>
          <Text style={styles.headerText}>Bills</Text>
        </View>
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2020-11-25'}
        renderItem={renderItem}
      />
    </View>
    </View>
  );
};

export default Bills;


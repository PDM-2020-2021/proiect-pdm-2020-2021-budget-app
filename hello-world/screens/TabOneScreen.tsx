import * as React from 'react';
import {StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { DataTable } from 'react-native-paper';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  var categories = [
    {
      key: '1',
      name: 'Transport',
      amount: '150'
    },
    {
      key: '2',
      name: 'Food',
      amount: '300'
    },
    {
      key: '3',
      name: 'Education',
      amount: '500'
    },
  ];
  return (
<View style={styles.container} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
      <DataTable style={styles.datatable}>
        <DataTable.Header>
          <DataTable.Title >Categories</DataTable.Title>
          <DataTable.Title >Amount</DataTable.Title>
        </DataTable.Header>
        { categories.map((categry, key)=>(
        <DataTable.Row>
            <DataTable.Cell>{categry.name}</DataTable.Cell>
            <DataTable.Cell>{categry.amount}</DataTable.Cell>
        </DataTable.Row>
        )
    )}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  datatable: {
    backgroundColor: 'white'
    },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

import * as React from 'react';
import {StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { DataTable } from 'react-native-paper';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  var accounts = [
    {
      accNumber: '56456454',
      accType: 'D',
      productCode: '1454541',
      availBalance: '987436.46',
    },
    {
      accNumber: '12424345645',
      accType: 'D',
      productCode: '154545641',
      availBalance: '500397.64',
    },
    {
      accNumber: '4554545664',
      accType: 'D',
      productCode: '44545',
      availBalance: '2467.02',
    },
  ];
  return (
<View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Account</DataTable.Title>
          <DataTable.Title>Code</DataTable.Title>
          <DataTable.Title>
            Balance Available
          </DataTable.Title>
        </DataTable.Header>
        {
          accounts.map(account => {
          return (
            <DataTable.Row
              key={account.accNumber} // you need a unique key per item
              onPress={() => {
                // added to illustrate how you can make the row take the onPress event and do something
                console.log(`selected account ${account.accNumber}`)
              }}
            >
              <DataTable.Cell>
                {account.accNumber}
              </DataTable.Cell>
              <DataTable.Cell >
                {account.productCode}
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {account.availBalance}
              </DataTable.Cell>
            </DataTable.Row>
        )})}
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

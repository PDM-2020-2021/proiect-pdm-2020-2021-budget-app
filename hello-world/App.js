
import { StyleSheet, Text, View } from 'react-native';
import Home from '../hello-world/Home/index.js';
import Report from "../hello-world/Reports/index.js";
import Bills from "../hello-world/Bills/index.js"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const getTabBarIcon = (name) => ({
  color,
  size,
}) => <MaterialCommunityIcons name={name} color={color} size={size} />;
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 10,
    textAlign: "center"
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

});

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        style={styles.nav}
        tabBarOptions={{
          activeTintColor: '#41cac6',
          inactiveTintColor: 'gray',
          
        }}
      >
        <Tab.Screen 
        options={{
           tabBarIcon: getTabBarIcon('file-document-box'),
        }}
          name="Home"
          component={Home} />
        <Tab.Screen 
        name="Report"
        options={{
          tabBarIcon:getTabBarIcon('chart-line'),
        }}
         component={Report} />
        <Tab.Screen name="Bills"
        options={{
          tabBarIcon: getTabBarIcon('calendar'),
       }}
        component={Bills} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;



import { StyleSheet, Text, View } from 'react-native';
import Home from '../hello-world/Home/index.js';
import Report from "../hello-world/Reports/index.js";
import Bills from "../hello-world/Bills/index.js"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Report" component={Report} />
        <Tab.Screen name="Bills" component={Bills} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;


import { StyleSheet, Text, View} from 'react-native';
import Home from "./Views/Home";
import Report from "./Views/Report";
import Bills from "./Views/Bills"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 10,
    textAlign: "center"
  },
  nav:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

function App()
{
  return(
<NavigationContainer>
    <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen styles={styles.container} name="Home" component={Home} />
        <Tab.Screen name="Report" component={Report} />
        <Tab.Screen name="Bills" component={Bills} />
    </Tab.Navigator>
    </NavigationContainer>
    );
}
export default App;

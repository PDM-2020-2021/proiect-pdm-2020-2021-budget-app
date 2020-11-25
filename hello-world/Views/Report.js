import React from "react";
import { StyleSheet, Text, View, Button, Dimensions} from "react-native";
import {PieChart} from "react-native-chart-kit";
const data = [
  {
    name: "Transport",
    price: 215,
    color: "#4fa2d2",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Mancare",
    price: 200,
    color: "#4878ae",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Vacante",
    price: 250,
    color: "#5d5390",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Haine",
    price: 300,
    color: "#5c426e",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

export default function Report()
{
   
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Reports</Text>
            </View>
            <PieChart
            data={data}
            width={Dimensions.get("window").width}
            height={280}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            accessor="price"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
/>
      </View> 
    );
    
}
const styles = StyleSheet.create({
    container: {
      textAlign: "center"
    },
    header: {
      height: 120,
      backgroundColor: '#41cac6',
      alignItems: 'center',
      justifyContent: 'center',
  },
  headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
  }
  });
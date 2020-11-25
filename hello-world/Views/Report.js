import React from "react";
import { StyleSheet, Text, View, Button} from "react-native";


export default function Report()
{
   
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Reports</Text>
            </View>
         <Button title="Click me" onPress={() => console.log("msss")}></Button>
         <Text>A IESIT SOARELE PE STRADA MEA</Text>
      </View> 
    );
    
}
const styles = StyleSheet.create({
    container: {
      textAlign: "center"
    },
    header: {
      height: 90,
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center',
  },
  headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
  }
  });
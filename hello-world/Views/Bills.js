import React from "react";
import { StyleSheet, Text, View, Button} from "react-native";


export default function Bills()
{
   
    return (
        <View style={styles.container}>
         <Button title="Click me" onPress={() => console.log("msss")}></Button>
         <Text>PAGINA DE Bills</Text>
      </View> 
    );
    
}


const styles = StyleSheet.create({
    container: {
      marginTop: 100,
      padding: 10,
      textAlign: "center",
      justifyContent: 'space-around'
    },
  });
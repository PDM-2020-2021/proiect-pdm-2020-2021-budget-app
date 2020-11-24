import React from "react";
import { StyleSheet, Text, View, Button} from "react-native";


export default function Home()
{
   
    return (
        <View>
         <Button title="Click me" onPress={() => console.log("msss")}></Button>
         <Text>PAGINA DE Home</Text>
      </View> 
    );
    
}
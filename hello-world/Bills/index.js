import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet, TouchableHighlight } from 'react-native';
import {CustomAgenda} from './Components/CustomAgenda';
export default class Bills extends Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Bills</Text>
                    <TouchableHighlight
                    style={styles.addButton}
                    onPress={() => { 
                        //this.setModalVisible(true); this.setInputText(), this.setIsNew(true) 
                        }} underlayColor={'#f1f1f1'}>
                        <View style={styles.item} >
                            <Text style={styles.text}>+  </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{ flex: 1 }}>
                   <CustomAgenda/>
                </View>
            </View>
 
          );
        };
    };

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
      alignSelf: 'flex-start',
      marginTop: 60,
      marginLeft: 10,
      fontSize: 40,
      fontWeight: 'bold',
      color: 'white',
    },
    item: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      alignItems: 'center',
  
    },
    addButton: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      width: 70,
      height: 70,
      backgroundColor: '#4fa2d2',
      borderRadius: 50,
      marginBottom: 10
    },
    text: {
      marginVertical: 30,
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
    },
  });
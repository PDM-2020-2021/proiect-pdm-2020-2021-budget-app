import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import CustomMultiPicker from "react-native-multiple-select-list";
export default class MultiPickerCustom extends Component {

    render() {
        return(

            <CustomMultiPicker
                options={this.props.data.map(({ name }) => name)}
                search={true} 
                multiple={true} 
                placeholder={"Search"}
                placeholderTextColor={'#757575'}
                returnValue={"label"} // label or value
                callback={(res) => {
                   this.props.onDataChange(res);
                    console.log(res)
                }} // callback pentru a trimite datele la piechart
                rowBackgroundColor={"#eee"}
                rowHeight={40}
                rowRadius={5}
                iconColor={"#00a2dd"}
                iconSize={30}
                selectedIconName={"md-checkbox-outline"}
                scrollViewHeight={250}
                selected={[]} // list of options which are selected by default
                
            />
        )
    }
}
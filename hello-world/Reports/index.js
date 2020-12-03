import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import PieChartCustom from './Components/PieChartCustom';
import MultiPickerCustom from './Components/MultiPickerCustom';

import {addCategory, getCategories, updateIsCheckedField} from '../../hello-world/Firebase/categories'

export default class Report extends Component {

  constructor(props) {
    super(props);
    this.state = {

        data: [],
        selectedData: []
    }
}

componentDidMount() {
  getCategories(this.onCategoryReceived);
}


  onCategoryReceived = (data) => {

    this.setState({ data });
  };



  onDataChange = async (selectedItems) => {
    //console.log("selected items:")
    //console.log(selectedItems);
          const result = this.state.data.filter(data1 => {
            let arr = selectedItems.filter(item => data1.name === item)
            return !(arr.length === 0)
          });
         // console.log("result:")
         // console.log(result)
          await this.setState({selectedData: result})
         //console.log("state selectedData")
         // console.log(this.state.selectedData);
    }


  render() {
    const { data, selectedData } = this.state;
    return (
       
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Reports</Text>
        </View>
        
        <PieChartCustom selectedData={selectedData} onDataChange={this.onDataChange.bind(this), selectedData}/>
        <Text>  Select the categories to be displayed in PieChart:</Text>
        <MultiPickerCustom data={data} onDataChange={this.onDataChange.bind(this)} />

      </View>

    );

  }
}
const styles = StyleSheet.create({
  container: {
    textAlign: "center"
  },
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
  }
});
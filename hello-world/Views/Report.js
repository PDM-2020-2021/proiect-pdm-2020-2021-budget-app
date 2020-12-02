import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import CustomMultiPicker from "react-native-multiple-select-list";

import {addCategory, getCategories, updateIsCheckedField} from '../../hello-world/Firebase/categories'

export default class Report extends Component {

  // state = {
  //   categoriesList: []
  // };
  constructor(props) {
    super(props);
    //this.initData = Data
    this.state = {

          categoriesList:[]

    }
}

componentDidMount() {
  getCategories(this.onCategoryReceived);
  console.log("reports" + this.state.categoriesList)
}

//nu face set state in update
componentDidUpdate(){
  updateIsCheckedField(this.onCategoryReceived);
}

onCategoryReceived = (categoriesList) => {
  this.setState(prevState => ({
    categoriesList: prevState.categoriesList = categoriesList
  }));
}



  // onCategoryUpdated = (updatedCategory) => {
  //   console.log("updated category: " + updatedCategory);
  //   updateIsCheckedField(updatedCategory);
  //         // const newData = this.state.categoriesList.map(cat => {
  //         //     if (cat.id === updatedCategory) {
  //         //         cat.id = updatedCategory.id
  //         //         return cat
  //         //     }
  //         //     return cat
  //         // })
  //         // this.setState({ categoriesList: newData })
  //   }


  render() {
    return (

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Reports</Text>
        </View>
        <PieChart
         data ={this.state.categoriesList}
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
        {/* aici afisam totalul selectat */}
        <Text>Total:</Text>
        <CustomMultiPicker
         options={ this.state.categoriesList.map(({ name }) => name)}
         
          search={true} // should show search bar?

          multiple={true} //
          placeholder={"Search"}
          placeholderTextColor={'#757575'}
          returnValue={"label"} // label or value
          callback={(res) => { 
            console.log("in callback " + res)
            console.log("in callback " + res)
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
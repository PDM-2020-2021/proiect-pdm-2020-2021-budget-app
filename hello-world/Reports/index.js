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
    }
}

componentDidMount() {
  getCategories(this.onCategoryReceived);
  //console.log("reports" + this.state.data)
}

//nu face set state in update
// componentDidUpdate(){
//   updateIsCheckedField(this.onCategoryReceived);
// }


  // Aici setati si culoarea pentru fiecare categorie
  // Read la urmatoarea functie ca sa intelegeti
  onCategoryReceived = (data) => {
    // import { chosenColors } from ../blalala/utils.js;
    // data.map((item, index) => ({...item, color: chosenColors[index]}));
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    this.setState({ data });
  };



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
    const { data } = this.state;
    return (
       
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Reports</Text>
        </View>
        <PieChartCustom data={data}/>
        <MultiPickerCustom data={data}/>

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
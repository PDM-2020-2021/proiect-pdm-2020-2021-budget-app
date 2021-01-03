
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default class PieChartCustom extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
        selectedData:this.props.selectedData
    }
}
    componentDidUpdate(prevProps) {
        if (this.props.selectedData !== prevProps.selectedData) {
            console.log('data state has changed.')
        }
      }
      
    render() {
        return (
            <PieChart
                data={this.props.onDataChange}
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
)};

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
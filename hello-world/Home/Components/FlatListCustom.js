import React, { Component } from "react";
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableHighlight,
} from "react-native";
import NumberFormat from "react-number-format";
import { Typography, Colors, Spacing, Header, Buttons } from "../../Styles";

export default class FlatListCustom extends Component {
  renderItem = ({ item }) => (
    <View style={styles.flatList}>
      <Text style={styles.textCategory}> {item.name} </Text>
      <View>
        <TouchableHighlight
          onPress={() => this.props.setItemToEdit(item.id)}
          underlayColor={"#f1f1f1"}
        >
          <NumberFormat
            value={item.price}
            displayType={"text"}
            thousandSeparator={true}
            renderText={(value) => (
              <Text style={styles.price}>{value} lei</Text>
            )}
          />
        </TouchableHighlight>
      </View>
    </View>
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={this.renderItem}
        ListHeaderComponent={() => (
          <Text style={styles.text}>Category                           Price</Text>
        )}
      />
    );
  }
}
const styles = StyleSheet.create({
  header: {
    ...Header.headerStyles,
  },
  headerText: {
    ...Header.headerTextStyles,
  },
  contentContainer: {
    flex: 1,
    ...Colors.whiteBackground,
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    alignItems: "center",
  },
  marginLeft: {
    marginLeft: 5,
  },
  menu: {
    width: 20,
    height: 2,
    backgroundColor: "#111",
    margin: 2,
    borderRadius: 3,
  },
  text: {
    ...Typography.nameText,
  },
  price: {
    ...Typography.priceText,
  },

  textInput: {
    ...Typography.textInput,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    ...Colors.greyBorder,
    borderBottomWidth: 2,
  },
  modalView: {
    flex: 1,
    ...Colors.whiteBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableHighlight: {
    ...Colors.whiteBackground,
    marginVertical: 10,
    alignSelf: "stretch",
    alignItems: "center",
  },
  flatList: {
    flexDirection: "row",
    flexWrap: "wrap",
    ...Colors.greyBorder,
    borderBottomWidth: 2,
  },
  addButton: {
    borderWidth: 0,
    ...Colors.addButton,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    width: 70,
    height: 70,

    borderRadius: 50,
    marginBottom: 10,
    marginRight: 10,
  },
  plusSign: {
    color: "#000000",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 20,
    textDecorationLine: "none",
  },
  textCategory: {
    ...Typography.textCategory,
  },
  touchablePrice: {
    width: "50%",
  },
});

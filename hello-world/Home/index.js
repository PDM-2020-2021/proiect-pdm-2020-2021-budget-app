import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

import ModalCustom from "./Components/ModalCustom";
import FlatListCustom from "./Components/FlatListCustom";
import { Typography, Colors, Spacing, Header, Buttons } from "../Styles";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from "../Firebase/categories";

export default class Home extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isModalVisible: false,
      editedItem: 0,
      isNew: false,
      selectedCategoryId: null,
    };
  }

  //lifecycles
  componentDidMount() {
    getCategories(this.onCategoryReceived);
  }

  onCategoryReceived = (data) => {
    this.setState({ data });
  };


  setModalVisible = (bool) => {
    this.setState({ isModalVisible: bool });
  };

  setIsNew = (bool) => {
    this.setState({ isNew: bool });
  };

  setItemToEdit = (id) => {
    this.setModalVisible(true);
    this.setIsNew(false);
    this.setState({
      itemToEdit: this.state.data.find((item) => item.internId === id),
    });
  };

  // functie pentru butonul de plus
  handleNewCategory = () => {
    this.setModalVisible(true);
    this.setIsNew(true);
  };

  handleSave = async (payload) => {
    const { isNew, itemToEdit } = this.state;

    if (isNew) {
      await addCategory(payload);
    } else {
      await updateCategory(itemToEdit.internId.toString(), payload);
    }

    getCategories(this.onCategoryReceived);
    this.setModalVisible(false);
    this.setState({ itemToEdit: null });
  };

  handleCancel =  () =>{
    this.setModalVisible(false);
    this.setState({ itemToEdit: null });
  }
  handleDelete= async(itemId) =>{
    await deleteCategory(itemId);
    console.log("am sters");
    getCategories(this.onCategoryReceived);
  }

  render() {
    // ES6 destructuring
    const { data, isNew, itemToEdit, isModalVisible } = this.state;
 
    return (
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Budgets</Text>
          <TouchableHighlight
            style={styles.addButton}
            onPress={this.handleNewCategory}
            underlayColor={"#f1f1f1"}
          >
            <View>
              <Text style={styles.plusSign}>+  </Text>
            </View>
          </TouchableHighlight>
        </View>
        <FlatListCustom 
        data={data}
        setItemToEdit={this.setItemToEdit}
        onDelete={this.handleDelete.bind(this)} />
        {/* Modalul imi este randat doar daca isModalVisible = true
            {Condition && <Component 1 /> || <Component 2 />}: if true render Comp1 else render Comp2
        */}
        {isModalVisible && (
          <ModalCustom
            itemToEdit={itemToEdit}
            isNew={isNew}
            onSave={this.handleSave}
            onCancel={this.handleCancel.bind(this)}
          />
        )}
      </View>
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

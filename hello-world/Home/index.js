import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

import ModalCustom from "./Components/ModalCustom";
import FlatListCustom from "./Components/FlatListCustom";
import { Typography, Colors, Spacing, Header, Buttons } from "../Styles";
import {
  getCategories,
  addCategory,
  updateCategory,
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

  // Aici setati si culoarea pentru fiecare categorie
  // Read la urmatoarea functie ca sa intelegeti
  onCategoryReceived = (data) => {
    // import { chosenColors } from ../blalala/utils.js;
    // data.map((item, index) => ({...item, color: chosenColors[index]}));
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    this.setState({ data });
  };

  //librarie
  // https://www.npmjs.com/package/nice-color-palettes
  // nu ar trebuii tinute culorile in BD, nu sunt date importate
  // in loc de var colors = require('nice-color-palettes') faceti import colors from "nice-color-palettes"
  // colors[0] = paleta de 5 culori (sper. nu m-am jucat cu libraria doar citesc documentatia)
  // treceti prin mai multi indecsi si vedeti ce culori va plac
  // apoi destructurati intr-un array de culori chosenColors = [...colors[0], ...colors[4], ...ect];
  // as creea un fisier in src numit utils.js l-as exporta de acolo
  // generateHex() {
  //   var r = Math.floor(Math.random() * 255);
  //   var g = Math.floor(Math.random() * 255);
  //   var b = Math.floor(Math.random() * 255);
  //   if (r < 16) {
  //     r += 16;
  //   }
  //   if (g < 16) {
  //     g += 16;
  //   }
  //   if (b < 16) {
  //     b += 16;
  //   }
  //   var hex = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  //   return hex;
  // }

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
      itemToEdit: this.state.data.find((item) => item.id === id),
    });
  };

  // functie pentru butonul de plus
  handleNewCategory = () => {
    this.setModalVisible(true);
    this.setIsNew(true);
  };

  // a trebuit sa adaug functia asta aici si sa o trimit ca props
  // pentru ca voiam sa fac refetch la date dupa ce adaug/editez o categorie
  // daca era folosit redux, functia asta putea fi trimisa direct la Modal fara a avea nevoie sa o tirmit prin props de la parinte
  handleSave = async (payload) => {
    const { isNew, itemToEdit } = this.state;

    if (isNew) {
      await addCategory(payload);
    } else {
      await updateCategory(itemToEdit.id, payload);
    }

    getCategories(this.onCategoryReceived);
    this.setModalVisible(false);
    this.setState({ itemToEdit: null });
  };

  render() {
    // ES6 destructuring
    // este echivalentul la a scrie
    // const data = this.state.data;
    // const isNew = this.state.new; ... samd
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
              <Text style={styles.plusSign}>+ </Text>
            </View>
          </TouchableHighlight>
        </View>
        <FlatListCustom data={data} setItemToEdit={this.setItemToEdit} />
        {/* this is called conditional rendering
            Modalul imi este randat doar daca isModalVisible = true
            {Condition && <Component 1 /> || <Component 2 />}: if true render Comp1 else render Comp2
            echivalent se mai poate scrie: 
            {condition ?  <Component1 /> : <Component2 />} this is called ternary expression
            mereu trebuie adaugat intre acolade in functia render() functii care returneaza o componenta 
        */}
        {isModalVisible && (
          <ModalCustom
            itemToEdit={itemToEdit}
            isNew={isNew}
            onSave={this.handleSave}
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

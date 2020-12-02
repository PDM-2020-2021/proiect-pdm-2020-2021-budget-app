import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Modal,
  TouchableHighlight,
  StyleSheet,
} from "react-native";

import { Typography, Colors, Spacing, Header, Buttons } from "../../Styles";

export default class ModalCustom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
    };
  }

  // daca am item to edit, seteaza state-ul cu numele si pretul itemului ce vreau sa-l editez
  // this can be extended cu orice alte data aveti nevoie sa mai afisati in modal
  componentDidMount() {
    const { itemToEdit } = this.props;
    if (itemToEdit) {
      this.setState({ name: itemToEdit.name, price: itemToEdit.price });
    }
  }

  // good practice. Daca am o functie care ar ocupa mai multe de 1 linie de cod, scrieti-o separat
  // am facut o noua functie unde
  // iau functia de onSave trimita din parinte pe props
  // adaug price si name ca payload de pe state-ul intern
  handleSave = () => {
    const { name, price } = this.state;
    this.props.onSave({ name, price });
  };

  render() {
    const { name, price } = this.state;

    return (
      <Modal
        animationType="fade"
        visible={true}
       // onRequestClose={() => this.props.setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.text}>Change text:</Text>
          <TextInput
            // tobechanged
            editable={true}
            style={styles.textInput}
            // doar o linie de cod, no trebuie sa o scriu separat
            onChangeText={(name) => this.setState({ name })}
            defaultValue={name}
            multiline={false}
            maxLength={200}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(price) => this.setState({ price })}
            defaultValue={price}
            editable={true}
            multiline={false}
            maxLength={200}
          />

          <TouchableHighlight
            onPress={this.handleSave}
            style={[styles.touchableHighlight]}
            underlayColor={"#f1f1f1"}
          >
            <Text style={styles.text}>Save</Text>
          </TouchableHighlight>
        </View>
      </Modal>
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
    // backgroundColor: '#41cac6',
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

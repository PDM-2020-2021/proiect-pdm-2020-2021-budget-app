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

export default class AgendaModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day:0,
      billName: "",
      amount:0,
    };
  }


  componentDidMount() {
    
  }

  handleSave = () => {
    const { day,billName, amount } = this.state;
    this.props.onSave({ day,billName, amount });
    console.log(billName)
    console.log( amount)
    console.log(day)
  };
  handleCancel= () =>{
    this.props.onCancel();
  };

  render() {
    const { day,billName, amount } = this.state;

    return (
      <Modal
        animationType="fade"
        visible={true}
       // onRequestClose={() => this.props.setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.text}>Add a new recurent payment</Text>
          
          <TextInput
            placeholder={'Bill Name '}
            editable={true}
            style={styles.textInput}
            onChangeText={(billName) => this.setState({ billName })}
            defaultValue={billName}
            multiline={false}
            maxLength={200}
          />
          <TextInput
          placeholder={'Amount ( without currency )'}
            style={styles.textInput}
            onChangeText={(amount) => this.setState({ amount })}
            defaultValue={amount}
            editable={true}
            multiline={false}
            maxLength={200}
          />
          <TextInput
          placeholder={'Day (no greater than 28)'}
            style={styles.textInput}
            onChangeText={(day) => this.setState({ day })}
            defaultValue={day}
            editable={true}
            multiline={false}
            maxLength={200}
          />

          <View style={styles.buttons}>
          <TouchableHighlight
            onPress={this.handleCancel}
            style={[styles.touchableHighlight]}
            underlayColor={"#f1f1f1"}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.handleSave}
            style={[styles.touchableHighlight]}
            underlayColor={"#f1f1f1"}
          >
            <Text style={styles.text}>Save</Text>
          </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  buttons: {
flex:1,
flexDirection: "row",

  },
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
    marginVertical: 20,
    alignSelf: "stretch",
    alignItems: "center",
    width: '20%',
    height: '10%'
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

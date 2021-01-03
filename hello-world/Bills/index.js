import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { CustomAgenda } from './Components/CustomAgenda';
import  AgendaModal  from './Components/AgendaModal';
import {
  getPayments,
  addPayment,
} from "../Firebase/Bill";

export default class Bills extends Component {
  constructor(props) {
    super(props);
    this.state={
    isModalVisible: false,
    data:[],
    gotNewBill:false
  }
  };
//Seteaza valoarea variabilei de stare gotNewBill pe false, v-a fi trimisa ca si props catre CustomAgenda
setGotNewBill =()=>{
  this.setState({gotNewBill:false});
}
//Returneaza valoarea variabilei de stare gotNewBill,  v-a fi trimisa ca si props catre CustomAgenda
getGotNewBill=()=>{
  return this.state.gotNewBill;
}
  componentDidMount() {
  }
//Nu cred ca mai e nevoie de ea
  reciveDataForSetState=(recivedData)=>{
    this.setState({data:recivedData})
  }
//Functie intermediara intre componenta Bills din Firebase si componenta copil CustomAgenda
//v-a fi trimisa ca si props catre CustomAgenda, unde va fi apleata cu argument ce reprezinta o functie
//de setare a datelor de stare
  makeRetriveDataCall= async(customAgendaRetriveData)=>{
  await getPayments(customAgendaRetriveData);
  }
//Functie cu ajutorul careia componenta AgendaModal este facuta vizibila sau nu
  setModalVisible = (bool) => {
    this.setState({ isModalVisible: bool });
  };
//Functie apelata la apasarea butonului de save din componenta AgendaModal, adauga un nou element in colectie 
//ascunde componenta AgendaModal, instiinteaza componenta CustomAgenda ca a fost introdusa o noua factura
  handleSave = async (payload) => {
    await addPayment(payload);
    this.setModalVisible(false);
    this.setState({gotNewBill:true});
  };
//Functie apelata la apasarea butonului de cancel din componenta AgendaModal, ascunde componenta AgendaModal
//fara a salva modificarile 
  handleCancel =  () =>{
    this.setModalVisible(false);
  }
//Vas iz Dis?
  onDataChange = async (payload) => {
          await this.setState({selectedData: result})
    }

  render() {
    const { isModalVisible } = this.state;
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Bills</Text>
          <TouchableHighlight
            style={styles.addButton}
            onPress={() => {
              this.setModalVisible(true); 
            }} underlayColor={'#f1f1f1'}>
            <View>
              <Text style={styles.plusSign}>+  </Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={{ flex: 1 }}>
          <CustomAgenda retriveData={this.makeRetriveDataCall} setGotNewBill={this.setGotNewBill} getGotNewBill={this.getGotNewBill}/*bills={this.state.data}*/ />
        </View>
        
        {this.state.isModalVisible && (
          <AgendaModal
            visibleModal={this.setModalVisible}
            onSave={this.handleSave.bind(this)}
            onCancel={this.handleCancel.bind(this)}
          />
        )}
      </View>

    );
  };
};

const styles = StyleSheet.create({
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
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    alignItems: 'center',

  },
  addButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: 70,
    height: 70,
    backgroundColor: '#4fa2d2',
    borderRadius: 50,
    marginBottom: 10
  },
  plusSign: {
    color: "#000000",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 20,
    textDecorationLine: "none",
    color:"white"
  },
  text: {
    marginVertical: 30,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
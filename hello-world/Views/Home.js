import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList,  TextInput, Modal, TouchableHighlight, Button  } from 'react-native';

 
export default class List extends Component {
    constructor(props) {
        super(props);
        //this.initData = Data
        this.state = {
            data: [ {id: 1, text: 'Transport', price: '50 lei'},
            {id: 2, text: 'Mancare', price: '50 lei'}],
            isModalVisible: false,
            inputText: '',
            inputPrice: '',
            editedItem: 0, 
            isNew:false,
        };
    }

    setModalVisible = (bool) => {
        this.setState({ isModalVisible: bool })
    }

    setIsNew=(bool)=>{
        this.setState({isNew:bool})
    }

    setInputText = (text,price) => {
        this.setState({ inputText: text, inputPrice: price})
    }

    setEditedItem = (id) => {
        this.setState({ editedItem: id })
    }

    handleEditItem = (editedItem) => {
        console.log(this.state.isNew)
        if(!this.state.isNew)
        {
        const newData = this.state.data.map( item => {
            if (item.id === editedItem ) {
                item.text = this.state.inputText
                item.price = this.state.inputPrice
                return item
            }
            return item
        })
        this.setState({ data: newData })
    }
    else{
        this.state.data.push({id: (this.state.data.length + 1), text: this.state.inputText, price:this.state.inputPrice})
        console.log("id : " + (this.state.data.length + 1))
        console.log(this.state.inputText)
        console.log(this.state.inputPrice)
        this.setIsNew(false)
    }
    }

    renderItem = ({item}) => (
        <TouchableHighlight onPress={() => {this.setModalVisible(true); this.setInputText(item.text,item.price),this.setEditedItem(item.id)}}
            underlayColor={'#f1f1f1'}> 
            <View style={styles.item} >
                <Text style={styles.text}> {item.text} </Text>
                <Text style={styles.price}> {item.price} </Text>
            </View>
        </TouchableHighlight>
    )
    
    render() {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Budgets</Text>
                </View>
                {/*TouchableHighlight trebuie sa aiba un singur copil, daca vrei mai multi ii pui intr-un view*/} 
                {/*Functioneaza, dar nu salveaza datele noi introduse*/} 
                { <TouchableHighlight onPress={() => {this.setModalVisible(true); this.setInputText(),this.setIsNew(true)}} underlayColor={'#f1f1f1'}> 
                    <View style={styles.item} >
                        <Text style={styles.text}>Save</Text>
                    </View>
                 </TouchableHighlight>}

                <FlatList 
                    data={this.state.data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={this.renderItem}
                    ListHeaderComponent={()=><Text style= {styles.text} >Category       Price</Text>  }
      
                />
                <Modal animationType="fade" visible={this.state.isModalVisible} 
                    onRequestClose={() => this.setModalVisible(false)}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Change text:</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => {this.setState({inputText: text}); console.log('state ', this.state.inputText)}}
                            defaultValue={this.state.inputText}
                            editable = {true}
                            multiline = {false}
                            maxLength = {200}
                        /> 
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(price) => {this.setState({inputPrice: price }); console.log('state ', this.state.inputPrice)}}
                            defaultValue={this.state.inputPrice}
                            editable = {true}
                            multiline = {false}
                            maxLength = {200}
                        /> 
                        <TouchableHighlight onPress={() => {this.handleEditItem(this.state.editedItem); this.setModalVisible(false)}} 
                            style={[styles.touchableHighlight, {backgroundColor: 'orange'}]} underlayColor={'#f1f1f1'}>
                            <Text style={styles.text}>Save</Text>
                        </TouchableHighlight>  
                    </View>           
                </Modal> 
            </View>
        )
    }
};

const styles = StyleSheet.create({
    header: {
        height: 120,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    contentContainer: {
        backgroundColor: 'white',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
        
    },
    marginLeft: {
        marginLeft: 5,
    },
    menu: {
        width: 20,
        height: 2,
        backgroundColor: '#111',
        margin: 2,
        borderRadius: 3,
    },
    text: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    price: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        textAlign: 'right'
    },

    textInput: {
        width: '90%',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'gray', 
        borderBottomWidth: 2,
        fontSize: 16,
    },
    modalView: {
        flex: 1, 
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableHighlight: {
        backgroundColor: 'white', 
        marginVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
    } 
})

// export default function Home()
// {
   
//     return (
//         <View style={styles.container}>
//          <Button title="Click me" onPress={() => console.log("msss")}></Button>
//          <Text>PAGINA DE Home</Text>
//       </View> 
//     );
    
// }
// const styles = StyleSheet.create({
//     container: {
//       marginTop: 100,
//       padding: 10,
//       textAlign: "center",
//       justifyContent: 'space-around'
//     },
//   });
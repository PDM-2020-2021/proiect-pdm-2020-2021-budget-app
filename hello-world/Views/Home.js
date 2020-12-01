import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Modal, TouchableHighlight, Button } from 'react-native';
import NumberFormat from 'react-number-format';

import { addCategory, getCategories, setItemIncategory, updateIsCheckedField } from '../Firebase/DataApi'

import * as firebase from 'firebase';
import 'firebase/firestore';

export default class List extends Component {

    //constructor
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isModalVisible: false,
            inputName: '',
            inputPrice: '',
            editedItem: 0,
            isNew: false,
        };
    }

//state
    // state = {
    //     data: []
    // };

//lifecycles
    componentDidMount() {
        getCategories(this.onCategoryReceived);
    }

  
    

    onCategoryReceived = (data) => {
        this.setState(prevStat => ({
            data: prevStat.data = data
        }));
    }
//librarie
    generateHex(){
        var r=Math.floor(Math.random() * 255)
        var g=Math.floor(Math.random() * 255)
        var b=Math.floor(Math.random() * 255)
        if(r<16)
        {
            r+=16
        }
        if(g<16)
        {
            g+=16
        }
        if(b<16)
        {
            b+=16
        }
        var hex="#"+r.toString(16)+g.toString(16)+b.toString(16)
        return hex
    }

    setModalVisible = (bool) => {
        this.setState({ isModalVisible: bool })
    }

    setIsNew = (bool) => {
        this.setState({ isNew: bool })
    }

    setInputText = (name, price) => {
        this.setState({ inputName: name, inputPrice: price })
    }

    setEditedItem = (id) => {
        this.setState({ editedItem: id })
    }



    handleEditItem = (editedItem) => {
        console.log(this.state.isNew)
        if (!this.state.isNew) {
            // console.log(this.generateHex())
            const newData = this.state.data.map(item => {
                if (item.id == editedItem) {
                    //item.name = this.state.inputName
                    item.price = this.state.inputPrice
                    return item
                }
                return item
            })
            this.setState({ data: newData })
        }
        else {
            
           
            var setData={
                color: this.generateHex(),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                id:this.state.data.length+1,
                isChecked: false,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
                name: this.state.inputName,
                price: parseInt(this.state.inputPrice,10)
              }
              setItemIncategory(setData)
              
            this.state.data.push({ id: (this.state.data.length + 1), name: this.state.inputName, price: this.state.inputPrice })
            console.log("id : " + (this.state.data.length + 1))
            console.log(this.state.inputName)
            console.log(this.state.inputPrice)
            this.setIsNew(false)
        }
    }

    renderItem = ({ item }) => (
        <View style={styles.flatList}>
            <Text style={styles.textCategory}> {item.name} </Text>
            <View>
                <TouchableHighlight onPress={() => { this.setModalVisible(true); this.setInputText(item.name, item.price), this.setEditedItem(item.id) }}
                    underlayColor={'#f1f1f1'}>
                    <NumberFormat 
                        value={item.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        renderText={value =>
                            <Text 
                                style={styles.price}>
                                {value} lei
                             </Text>} />
                </TouchableHighlight>
            </View>
        </View>
    )

    render() {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Budgets</Text>
                    <TouchableHighlight
                        style={styles.addButton}
                        onPress={() => { this.setModalVisible(true); this.setInputText(), this.setIsNew(true) }} underlayColor={'#f1f1f1'}>
                        <View >
                            <Text style={styles.plusSign}>+  </Text>
                        </View>
                    </TouchableHighlight>
                </View>

                {/*TouchableHighlight trebuie sa aiba un singur copil, daca vrei mai multi ii pui intr-un view*/}
                {/*Functioneaza, dar nu salveaza datele noi introduse*/}


                <FlatList
                    data={this.state.data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={this.renderItem}
                    ListHeaderComponent={() => <Text style={styles.text} >Category                            Price</Text>}

                />
                <Modal animationType="fade" visible={this.state.isModalVisible}
                    onRequestClose={() => this.setModalVisible(false)}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Change text:</Text>
                        <TextInput
                            editable={this.state.isNew}
                            style={styles.textInput}
                            onChangeText={(name) => { this.setState({ inputName: name }); console.log('state ', this.state.inputName) }}
                            defaultValue={this.state.inputName}
                            multiline={false}
                            maxLength={200}
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(price) => { this.setState({ inputPrice: price }); console.log('state ', this.state.inputPrice) }}
                            defaultValue={this.state.inputPrice}
                            editable={true}
                            multiline={false}
                            maxLength={200}
                        />

                        <TouchableHighlight onPress={() => { this.handleEditItem(this.state.editedItem); this.setModalVisible(false) }}
                            style={[styles.touchableHighlight]} underlayColor={'#f1f1f1'}>
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
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
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
    },
    flatList: {
        
        flexDirection: "row",
        flexWrap: "wrap",
        borderColor: 'gray',
        borderBottomWidth: 2,
    },
    addButton: {
        borderWidth: 0,
        borderColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        width: 70,
        height: 70,
        backgroundColor: '#ebeef2',
        borderRadius: 50,
        marginBottom: 10,
        marginRight: 10
    },
    plusSign: {
        color: "#000000",
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: 20, textDecorationLine: 'none'
    }
    ,
    textCategory: {
        width: '50%',
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    touchablePrice: {
        width: '50%'
    }
})

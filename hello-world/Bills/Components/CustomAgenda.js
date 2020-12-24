import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {
  getPayments,
  addPayment,
} from "../../Firebase/Bill";

export class CustomAgenda extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      BillsArray:[],//this.props.bills,
      BillsLoaded:false
    };
  } 

  reciveDataForSetState=(recivedData)=>{
    this.setState({BillsArray:recivedData})
    // console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    // console.log(this.state.data);
  }
   componentDidMount= async ()=>{
    // this.loadBills();
    await getPayments(this.reciveDataForSetState);
    console.log("componentDinMount");
    await this.loadBills(); 
    
    setTimeout(()=>{this.setState({BillsLoaded:true});},1000);    
   }
  
    generateBillDates=(day)=>{
      if(day<10)
      {
        day="0"+day.toString();
      }
      else
      day=day.toString();

      var generatedDatesArray=[];
      var d = new Date();
      var year=d.getFullYear();
      var month=d.getMonth();
      for (var i = 0, size = 12; i < size; i++){
      if(month>12)
      {
      month=1;
      year+=1;
      }
      var auxMonth=month.toString();
      if(month<10)
      {
        auxMonth="0"+auxMonth; 
      } 
      generatedDatesArray.push(year.toString() + '-' + auxMonth + '-' + day.toString() )  
      month+=1;    
      }
      return(generatedDatesArray) 
  }
  
 
  render() {
    console.log(this.state.BillsLoaded);

    if(this.state.BillsLoaded)
    {
      //console.log(this.state.items['2020-12-10'])
    return ( 
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadMonths.bind(this)}
        selected={'2020-11-04'}
        renderItem={this.renderItem.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
    }
    else
    {
      return <View><Text>Loading..</Text></View>
    }
  }
 
  createBill=(date,billName)=>{
    //console.log("IN createBill");
     this.state.items[date.toString()].push({
      name: billName,
    });
    //console.log(this.state.items[date]);
  };
  
   loadBills=()=>{ 
    
    var day={"timestamp": 1607099654};
        for (let i = -730; i < 730; i++) {
          var time = day.timestamp + i * 24 * 60 * 60 ;
          var strTime = this.timeToString(time);
          
          if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
          }
        }
        //console.log(this.state.items['2020-12-10']);
        console.log(this.state.BillsArray);
    for(let bill of this.state.BillsArray)
    {
      var billDay=bill.day;
      var generatedDates=this.generateBillDates(billDay);
      var billName=bill.billName;
       
      for(var i=0;i<generatedDates.length;i++)
      {  
       this.createBill(generatedDates[i],billName);
      } 
    }
    //console.log(this.state.items['2020-12-10']);
  } 
 
  loadMonths=()=>{ 
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
  };

  renderItem(item) {
    return (
      <TouchableOpacity
        
        style={[styles.item]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    var date = new Date(time*1000);
    return date.toISOString().split('T')[0];
    
  }
}


const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

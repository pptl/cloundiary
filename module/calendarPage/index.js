import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import RefTable from 'Module/calendarPage/refTable';
import Calendar from 'Module/calendarPage/calendar';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
    },
  });

const AddButton = () =>{
  return(
    <TouchableOpacity onPress={()=>console.log('createNewTask')} style={{height: 60, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{flexDirection: 'row', alignItems:'center'}}>
        <View style={{backgroundColor: '#BEDBEB', padding: 4, borderRadius: 30, marginRight: 8}}>
          <Image source={require(
// @ts-ignore
          'Images/icon_add2.png')} style={{height: 15, width: 15,}}/>
        </View>
        <Text>新增事項</Text>
      </View>
    </TouchableOpacity>
  )
}

const CalendarPage = () => {
    return (
        <View style={styles.container}>
            <RefTable/>
            <Calendar/>
            <AddButton/>
        </View>
    )
}


export default CalendarPage;
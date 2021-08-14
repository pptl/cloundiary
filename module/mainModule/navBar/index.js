import React from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
//import tw from 'tailwind-react-native-classnames';

// @ts-ignore
const homeIcon = require('Images/icon_home.png'),
    // @ts-ignore
    calendarIcon = require('Images/icon_calendar.png'),
    // @ts-ignore
    groupIcon = require('Images/icon_group.png'),
    // @ts-ignore
    noteIcon = require('Images/icon_note.png'),
    // @ts-ignore
    settingIcon = require('Images/icon_setting.png');
    

const NavButton = (props) => {
    const {
        text,
        img,
    } = props;

    return(
        <TouchableOpacity onPress={()=>console.log(text)} style={{alignItems:'center', justifyContent:'center', minWidth:32}}>
            <Image source={img} style={styles.icon}/>
            <Text style={{fontSize:10}}>{text}</Text>
        </TouchableOpacity>
    )
}

const NavBar = () => {
    return (
        <View style={styles.container}>
            <View style={{ height:'100%', justifyContent:'space-around', flexDirection:'row'}}>
                <NavButton text={'行事曆'} img={calendarIcon}/>
                <NavButton text={'便條紙'} img={noteIcon}/>
                <NavButton text={'首頁'} img={homeIcon}/>
                <NavButton text={'群組'} img={groupIcon}/>
                <NavButton text={'設定'} img={settingIcon}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 74,
        backgroundColor: '#fff',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
                
    },
    icon: {
        height: 31,
        width: 31,
    }
})

export default NavBar;

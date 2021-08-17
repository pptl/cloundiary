import React from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

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
    settingIcon = require('Images/icon_setting.png'),
    // @ts-ignore
    homeIconFocused = require('Images/icon_home_focused.png'),
    // @ts-ignore
    calendarIconFocused = require('Images/icon_calendar_focused.png'),
    // @ts-ignore
    groupIconFocused = require('Images/icon_group_focused.png'),
    // @ts-ignore
    noteIconFocused = require('Images/icon_note_focused.png'),
    // @ts-ignore
    settingIconFocused = require('Images/icon_setting_focused.png');
    
import {
  setPage,
} from 'Module/mainModule/slice';

import {
    CALENDAR,
    NOTE,
    HOME,
    GROUP,
    SETTING,
} from 'Module/mainModule/consts';

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

const NavButton = (props) => {
    const {
        text,
        img,
        pageName,
    } = props;

    const dispatch = useDispatch();

    return(
        <TouchableOpacity onPress={()=>dispatch(setPage(pageName))} style={{alignItems:'center', justifyContent:'center', minWidth:32}}>
            <Image source={img} style={styles.icon}/>
            <Text style={{fontSize:10}}>{text}</Text>
        </TouchableOpacity>
    )
}

const NavBar = () => {

    // @ts-ignore
    const currentPage = useSelector(state => state.mainReducer.page);

    
    return (
        <View style={styles.container}>
            <View style={{ height:'100%', justifyContent:'space-around', flexDirection:'row'}}>
                <NavButton text={'行事曆'} img={(currentPage === CALENDAR) ? calendarIconFocused : calendarIcon} pageName={CALENDAR}/>
                <NavButton text={'便條紙'} img={(currentPage === NOTE) ? noteIconFocused : noteIcon} pageName={NOTE}/>
                <NavButton text={'首頁'} img={(currentPage === HOME) ? homeIconFocused : homeIcon} pageName={HOME}/>
                <NavButton text={'群組'} img={(currentPage === GROUP) ? groupIconFocused : groupIcon} pageName={GROUP}/>
                <NavButton text={'設定'} img={(currentPage === SETTING) ? settingIconFocused : settingIcon} pageName={SETTING}/>
            </View>
        </View>
    )
}

export default NavBar;

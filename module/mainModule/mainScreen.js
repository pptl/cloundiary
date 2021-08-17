import React from 'react'
import { Text, StyleSheet, View, SafeAreaView, StatusBar,  } from 'react-native'
import NavBar from 'Module/mainModule/navBar';
//import tw from 'tailwind-react-native-classnames';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
//import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import HomePage from 'Module/homePage';
import CalendarPage from 'Module/calendarPage';
import NotePage from 'Module/notePage';
import GroupPage from 'Module/groupPage';
import SettingPage from 'Module/settingPage';

import {
  CALENDAR,
  NOTE,
  HOME,
  GROUP,
  SETTING,
} from 'Module/mainModule/consts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight,
  },
});

const PageContent = () => {

  // @ts-ignore
  const currentPage = useSelector(state => state.mainReducer.page);
  
  let content = <View></View>;

  switch(currentPage){
    case CALENDAR: 
      content = <CalendarPage/>;
      break;
    case NOTE: 
      content = <NotePage/>;
      break;
    case HOME: 
      content = <HomePage/>;
      break;
    case GROUP: 
      content = <GroupPage/>;
      break;
    case SETTING: 
      content = <SettingPage/>;
      break;
    default:
      content = <HomePage/>;
  }

  return (
    <View style={{flexGrow:1}}>
      {content}
    </View>
  )
}

const MainScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
          <LinearGradient colors={['#BCE2F8', 'transparent']} style={{flex:1}}>
            <View style={{marginTop: StatusBar.currentHeight}}></View>
            <View style={{marginTop: 48}}></View>
            <PageContent/>
            <NavBar/>
          </LinearGradient>
        </SafeAreaView>
    )
}

export default MainScreen;
/* 
const mapStateToProps = (state) => ({
  currentPage: state.mainReducer.page,
})

export default connect(mapStateToProps)(MainScreen);
 */

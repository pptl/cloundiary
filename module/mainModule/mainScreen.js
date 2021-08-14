import React from 'react'
import { Text, StyleSheet, View, Dimensions , SafeAreaView, StatusBar,  } from 'react-native'
import NavBar from 'Module/mainModule/navBar';
//import tw from 'tailwind-react-native-classnames';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';


const PageContent = () => {
  return (
    <View style={{flexGrow:1}}>
    </View>
  )
}

const MainScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
          <LinearGradient colors={['#BCE2F8', 'transparent']} style={{flex:1}}>
            <PageContent/>
            <NavBar/>
          </LinearGradient>
        </SafeAreaView>
    )
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
});


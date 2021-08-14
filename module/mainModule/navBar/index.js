import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames';
//const asas = require();

const NavBar = () => {
    return (
        <View style={styles.container}>
            <View>                    
                {/* <Image source={{uri:'@expo'}} style={{height:50, width:50}}></Image> */}
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
                
    }
})

export default NavBar;

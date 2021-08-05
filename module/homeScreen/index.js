import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
//import Text from 'Components/text';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>homeScreen</Text>
        </View>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
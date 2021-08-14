import React from 'react'
import Text from 'Components/Text';
import StyleSheet from 'Components/StyleSheet';
import View from 'Components/View';
import tw from 'tailwind-react-native-classnames';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={tw`text-red-500`}>homeScreensddqq</Text>
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
  
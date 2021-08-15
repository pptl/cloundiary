import React from 'react'
import Text from 'Components/Text';
import StyleSheet from 'Components/StyleSheet';
import View from 'Components/View';
import tw from 'tailwind-react-native-classnames';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const CalendarPage = () => {
    return (
        <View style={styles.container}>
            <Text style={tw`text-red-500`}>calendarPage</Text>
        </View>
    )
}

export default CalendarPage;
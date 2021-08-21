import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native'
import Icon from 'Components/SVGIcon/base64SvgIcon';

// @ts-ignore
const addIcon = require('Images/icon_add.png');

const mockData = [
    {
        text: '一般',
        backgroundColor: '#ABD4E8',
        iconName: '',
    },
    {
        text: '男友',
        backgroundColor: '#E8ABAB',
        iconName: 'heart',
    },
    {
        text: '活動',
        backgroundColor: '#EDD9A8',
        iconName: 'guitar',
    },
    {
        text: '課程',
        backgroundColor: '#BFDCA7',
        iconName: 'book',
    },
    {
        text: '禮物',
        backgroundColor: '#FF8C69',
        iconName: 'present',
    },
    {
        text: '禮物',
        backgroundColor: '#FF8C69',
        iconName: 'present',
    },
    {
        text: '禮物',
        backgroundColor: '#FF8C69',
        iconName: 'present',
    },
]

const styles = StyleSheet.create({
    chip:{
        marginRight: 6, 
        backgroundColor: '#fff', 
        padding: 2, 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderRadius :40, 
        shadowColor: '#000', 
        shadowOffset: {width:4, height:4}, 
        elevation: 4,
        justifyContent: 'space-around'
    }, 
})

const Chip = (props) => {
    const {
        data,
        index,
    } = props;

    const{
        text,
        backgroundColor,
    } = data;
    
    return(
        <View style={styles.chip}>
            <View style={{ padding: 2, backgroundColor: backgroundColor, borderRadius: 30 }}>
                <Icon 
                    name={data.iconName}
                    customStyles={{
                        tintColor: '#FFF',
                    }}
                />
            </View>
            {
                (index < 4) && <Text style={{marginHorizontal: 8, fontSize: 14}}>{text}</Text>
            }
            
        </View>
    )
}

const ChipsRow = (props) => {
    const {
        data = {},
    } = props;

    return (
        <View style={{flexDirection:'row', marginBottom: 10}}>
            <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{maxWidth:Dimensions.get('screen').width - 24}}>
            {
                data.map((data, index)=>{ return <Chip key={index+data} data={data} index={index}/>})
            }
            </ScrollView>

            <View style={{marginLeft:4, padding:4, backgroundColor: '#fff', borderRadius:30, shadowColor:'#000', shadowOffset:{width:4, height:4}, elevation: 4,}}>
                <Image source={addIcon} style={{width:20, height:20}}/>
            </View>
        </View>
        
    )
}


const RefTable = () => {

    return (
        <View /* style={styles.container} */>
            <ChipsRow data={mockData}/>
        </View>
    )
}


export default RefTable;

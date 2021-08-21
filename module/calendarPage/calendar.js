import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';
import { monthToDays } from 'tools';

//尚未測試跨月份
//從伺服器下來的資料必定已經依照start和end sort過了
//text最長4個字
const mockData = [
    {
        start: { month: 8, day: 2 },
        end: { month: 8, day: 2 },
        text: '吃飯時間',
        tagColor: '#ABD4E8',
    },
    {
        start: { month: 8, day: 7 },
        end: { month: 8, day: 7 },
        text: '睡覺時間',
        tagColor: '#E8ABAB',
    },
    {
        start: { month: 8, day: 14 },
        end: { month: 8, day: 16 },
        text: '考試',
        tagColor: '#EDD9A8',
    },
    {
        start: { month: 8, day: 16 },
        end: { month: 8, day: 20 },
        text: '約會',
        tagColor: '#FF8C69',
    }
];

const styles = StyleSheet.create({})

const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() +1;
//let month = 8;
//let day = date.getDate();

//本月有多少天
const currMonthDays = monthToDays(year, month);
const preMonthDays = (month === 1) ? 31 : monthToDays(year, month - 1);

const d = 1;
const m = (month > 3) ? month : month + 12;

if(m > 12) year -= 1;

const c = (year % 100 === 0) ? (year / 100) - 1 : Math.floor(year / 100) ;
const y = year % 100;
    
 //zeller 計算一個月的第一天是星期幾
 //不知道為什麼有時會錯
const w = Math.floor((y + (y/4) + (c/4) - 2*c + (26*(m+1)/10) + d - 1) % 7)
//console.log('w',w);

//找出這個月的星期6的日子
const saturdayArr = [];
for(let i = 1 ; i <= currMonthDays; i++ ){
    if((i+w) % 7 === 0)saturdayArr.push(i);
}

const eventArr = mockData;

//分割時長跨過星期六的event
const splitedEventArr = [];
let splitFlag = false;

for(let i = 0; i < eventArr.length; i++){
    splitFlag = false;

    for(let j = 0; j < saturdayArr.length; j++){
        if( saturdayArr[j] >= eventArr[i].start.day && saturdayArr[j] < eventArr[i].end.day && (eventArr[i].start.day - eventArr[i].end.day != 0) && (eventArr[i].start.month - eventArr[i].end.month === 0)){
            splitedEventArr.push({...eventArr[i], ...{end:{month: eventArr[i].end.month, day: saturdayArr[j]}}})
            splitedEventArr.push({...eventArr[i], ...{start:{month: eventArr[i].start.month, day: saturdayArr[j]+1}}})
            splitFlag = true;
            break;
        }
    }
    if(splitFlag === false){
        splitedEventArr.push(eventArr[i]);
    }
}



const Cell = (props)=>{
    const{
        children,
        tagData = [],
    } = props;

    let actived = tagData.length > 0;
    console.log(tagData)

    return(
        <View>
            <View>
                <Text style={{color:'#5D6065', textAlign: 'center'}}>{children}</Text>
            </View>
            <View>
                <View style={actived ? {height:16, marginBottom:4, width:`${(tagData[0].end.day - tagData[0].start.day + 1) * 100}%`, borderRadius:4, backgroundColor:tagData[0].tagColor} : {height:16, marginBottom:4}}>
                    {
                        actived && <Text style={{textAlign:'center', color: '#fff', fontSize:12}}>{tagData[0].text}</Text>
                    }
                </View>
                <View style={(actived && tagData.length > 1 ) ? {height:16,width:`${(tagData[1].end.day - tagData[1].start.day + 1) * 100}%`, borderRadius:4, backgroundColor:tagData[1].tagColor} : {height:16, marginBottom:4}}>
                    {
                        (actived && tagData.length > 1 )&& <Text style={{textAlign:'center', color:'#fff', fontSize:12}}>{tagData[1].text}</Text>
                    }
                </View> 
            </View>
        </View>
        
    )
}

const Calendar = () => {
    const headData = ['日','一','二','三','四','五','六'];
    const rowData = [];
    let tempArr = [];
    let tempDays = currMonthDays;

    for(let i = 0 ; i < 6 ; i++){
        //第一個星期
        if(i === 0){
            //上個月日期
            for(let k = (preMonthDays - w + 1); k <= preMonthDays ; k++){
                tempArr.push(<Text style={{color:'#5D6065', textAlign: 'center'}}>{k}</Text>);
            }
            //本月日期
            for(let z = 0; z < 7 - w; z++){

                let tagData = splitedEventArr.filter((e)=>{
                    if(e.start.day === (z + 1))return true;
                })
                tempArr.push(<Cell tagData={tagData}>{z + 1}</Cell>);
                tempDays--;
            }
            rowData.push(tempArr);
            tempArr = [];
        }
        else{
            for(let j = 0; j < 7; j++){
                //本月日期
                if(tempDays > 0){
                    let tagData = splitedEventArr.filter((e)=>{
                        if(e.start.day === (currMonthDays - tempDays + 1))return true;
                    })
                    tempArr.push(<Cell tagData={tagData}>{currMonthDays - tempDays + 1}</Cell>);
                    tempDays--;
                }else{
                    let tempNum = 1;
                    while(tempArr.length < 7){
                        tempArr.push(<Text style={{color:'#5D6065', textAlign: 'center'}}>{tempNum}</Text>);
                        tempNum++;
                    }
                    tempNum = 1;
                }
            }
            rowData.push(tempArr);
            tempArr = [];
            if(tempDays <= 0){
                break;
            }
        }
    }

    const headComponent = headData.map((data)=>{
        return (
            <Text style={(data === '日' || data === '六') ? {color: '#8DC0DC', textAlign: 'center'} : {color: '#5D6065', textAlign: 'center'} }>{data}</Text>
        )
    })

    return (
        <View style={{marginBottom:10, backgroundColor: '#fff', width: '100%', borderRadius: 25, shadowColor: '#000', shadowOffset: {width:0, height:0}, elevation: 6}}>
            <Table>
                <Row data={headComponent} style={{height: 35, borderBottomWidth:1 , borderColor: '#707070' }} textStyle={{ textAlign:'center',}}/>
                <Rows data={rowData} style={{height: 65, borderBottomWidth:1, borderColor: 'rgba(112,112,112,0.1)'}} textStyle={{ textAlign: 'center',}}/>
            </Table>
        </View>
    )
}

export default Calendar;


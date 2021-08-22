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
        text: '吃飯',
        tagColor: '#ABD4E8',
        priority: 0,
        isImportant: false,
    },
    {
        start: { month: 8, day: 2 },
        end: { month: 8, day: 3 },
        text: '哈咯',
        tagColor: '#BFDCA7',
        priority: 1,
        isImportant: false,
    },
    {
        start: { month: 8, day: 7 },
        end: { month: 8, day: 7 },
        text: '睡覺',
        tagColor: '#E8ABAB',
        priority: 0,
        isImportant: false,
    },
    {
        start: { month: 8, day: 13 },
        end: { month: 8, day: 16 },
        text: '考試',
        tagColor: '#EDD9A8',
        priority: 3,
        isImportant: false,
    },
    {
        start: { month: 8, day: 14 },
        end: { month: 8, day: 20 },
        text: '約會',
        tagColor: '#FF8C69',
        priority: 6,
        isImportant: false,
    },
    {
        start: { month: 8, day: 18 },
        end: { month: 8, day: 18 },
        text: '打電動',
        tagColor: '#E8ABAB',
        priority: 0,
        isImportant: false,
    },
    {
        start: { month: 8, day: 18 },
        end: { month: 8, day: 20 },
        text: '吃飯',
        tagColor: '#E8ABAB',
        priority: 2,
        isImportant: false,
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
        tagData = {},
    } = props;

    const {
        firstTag = null,
        secondTag = null,
    } = tagData;

    return(
        <View>
            <View>
                {
                    (typeof children === 'number') ? <Text style={{color:'#5D6065', textAlign: 'center'}}>{children}</Text> : children
                }
                
            </View>
            <View>
                <View style={(firstTag !== null) ? {height:16, paddingLeft:3, paddingRight:3, marginBottom:4, width:`${(firstTag?.end.day - firstTag?.start.day + 1) * 100}%` } : {height:16, marginBottom:4}}>
                    <View style={(firstTag !== null) ? {backgroundColor: firstTag?.tagColor,borderRadius:4} : {}}>
                        {
                            (firstTag !== null) && <Text style={{textAlign:'center', color: '#fff', fontSize:12}}>{firstTag?.text}</Text>
                        }
                    </View>
                </View>
                <View style={(secondTag !== null) ? {height:16, paddingLeft:3, paddingRight:3, width:`${(secondTag?.end.day - secondTag?.start.day + 1) * 100}%`} : {height:16, marginBottom:4}}>
                    <View style={(secondTag !== null) ? {backgroundColor: secondTag?.tagColor, borderRadius:4} : {}}>
                        {
                            (secondTag !== null) && <Text style={{textAlign:'center', color:'#fff', fontSize:12}}>{secondTag?.text}</Text>
                        }
                    </View>
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
    //記錄上一個照成{firstTag:null, secondTag:{}}的event的end
    //為了判斷tag在以上情況下到底要放在first或是second
    let tagPlaceTemp = 0;

    for(let i = 0 ; i < 6 ; i++){
        //第一個星期
        if(i === 0){
            //上個月日期
            for(let k = (preMonthDays - w + 1); k <= preMonthDays ; k++){
                tempArr.push(<Cell><Text style={{color:'#5D6065', textAlign: 'center'}}>{k}</Text></Cell>);
            }
            //本月日期
            for(let z = 0; z < 7 - w; z++){
                const today = z + 1;

                let tagData = splitedEventArr.filter((e)=>{
                    if(e.start.day === today)return true;
                })

                let todayTags = tagData.filter((e)=>{
                    if(e.start.day === today)return true;
                })
            
                let temp = {};
                //sort todayTags
                for(let i = 0;i < todayTags.length; i++){
                    for(let j = 0; j < i; j++){
                        if(todayTags[i].priority > todayTags[j].priority){
                            temp = todayTags[i];
                            todayTags[i] = todayTags[j];
                            todayTags[j] = temp;
                        }
                    }
                }
                let firstTag = null,
                    secondTag = null;

                if(todayTags.length > 0){
                    switch(tagData.length - todayTags.length){
                        case 0:
                                if(todayTags.length === 1){
                                    firstTag = todayTags[0];
                                }else{
                                    firstTag = todayTags[0];
                                    secondTag = todayTags[1];
                                }
                            break;
                        case 1:
                                if(tagPlaceTemp < today){
                                    secondTag = todayTags[0];
                                    tagPlaceTemp = todayTags[0].end.day;
                                }else{
                                    firstTag = todayTags[0];
                                }
                            break;
                    }
                }

                tempArr.push(<Cell tagData={{firstTag, secondTag}}>{today}</Cell>);
                tempDays--;
            }
            rowData.push(tempArr);
            tempArr = [];
        }
        else{
            for(let j = 0; j < 7; j++){
                //本月日期
                if(tempDays > 0){
                    const today = currMonthDays - tempDays + 1;

                    let tagData = splitedEventArr.filter((e)=>{
                        if((e.start.day <= today) && (e.end.day >= today))return true;
                    })
                    let todayTags = tagData.filter((e)=>{
                        if(e.start.day === today)return true;
                    })
                
                    let temp = {};
                    //sort todayTags
                    for(let i = 0;i < todayTags.length; i++){
                        for(let j = 0; j < i; j++){
                            if(todayTags[i].priority > todayTags[j].priority){
                                temp = todayTags[i];
                                todayTags[i] = todayTags[j];
                                todayTags[j] = temp;
                            }
                        }
                    }
                    let firstTag = null,
                        secondTag = null;
                    
                    
                    if(todayTags.length > 0){
                        switch(tagData.length - todayTags.length){
                            case 0:
                                    if(todayTags.length === 1){
                                        firstTag = todayTags[0];
                                    }else{
                                        firstTag = todayTags[0];
                                        secondTag = todayTags[1];
                                    }
                                break;
                            case 1:
                                    if(tagPlaceTemp < today){
                                        secondTag = todayTags[0];
                                        tagPlaceTemp = todayTags[0].end.day;
                                    }else{
                                        firstTag = todayTags[0];
                                    }
                                break;
                        }

                    }

                    tempArr.push(<Cell tagData={{firstTag, secondTag}}>{today}</Cell>);
                    tempDays--;
                }else{
                    let tempNum = 1;
                    while(tempArr.length < 7){
                        tempArr.push(<Cell><Text style={{color:'#5D6065', textAlign: 'center'}}>{tempNum}</Text></Cell>);
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


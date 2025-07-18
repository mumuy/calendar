import {minYear,maxYear} from './config/base.js';

// 24节气最小日期
const termMinDate = [4, 19, 3, 18, 4, 19, 4, 19, 4, 20, 4, 20, 6, 22, 6, 22, 6, 22, 7, 22, 6, 21, 6, 21];
// 24节气日期数据压缩：日期减去最小日期，差值视为4进制，再转32进制
const termData  = [
    '4lkmd5j6l5','55kql9lal9','59lanalala','5avbnatqla','7akmd5j6l5','55kql9lal9','59lalalala','5avbnatqla','7akmd5j6l5','55kql9lal9',
    '59lalalala','5avbnatqla','7akmd5j6l5','4lkql9lal9','55kqlalala','5ananalqla','5akmd5j5kl','4lkqd9l6l5','55kqlalal9','5ananalqla',
    '5akmd5j5kl','4lkmd9l6l5','55kqlalal9','59lanalqla','5akmd5j5kl','4lkmd9l6l5','55kql9lal9','59lanalala','5akmclj5al','4lkmd5j6l5',
    '55kql9lal9','59lanalala','5akmclj5al','4lkmd5j6l5','55kql9lal9','59lalalala','5akmclj5al','4lkmd5j6l5','55kql9lal9','59lalalala',
    '5akmclj5al','4lkmd5j6l5','55kql9lal9','59lalalala','5aklclj5al','4lkmd5j5kl','4lkql9l6l9','55kqlalala','5aclclb5al','2lkmd5j5kl',
    '4lkmd9l6l9','55kqlalala','5aclclb5al','2lkmd5j5kl','4lkmd9l6l5','55kql9lal9','5aalclb5al','2lkmd5j5kl','4lkmd5j6l5','55kql9lal9',
    '59alclalal','2lkmclj5al','4lkmd5j6l5','55kql9lal9','59alclalal','2lkmclj5al','4lkmd5j6l5','55kql9lal9','59alalalal','2lkmclj5al',
    '4lkmd5j6l5','55kql9lal9','59alalalal','2lklclj5al','4lkmd5j6l5','55kql9l6l9','59a5alalal','2lklclb5al','4lkmd5j5l5','55kqd9l6l9',
    '59a5alalal','2lklclb5al','4lkmd5j5kl','4lkmd9l6l9','55a5akalal','2lclclb5al','2lkmd5j5kl','4lkmd5l6l5','55a5akalak','2lalclalal',
    '2lkmclj5kl','4lkmd5j6l5','55a5akalak','2kalclalal','2lkmclj5al','4lkmd5j6l5','55a5akalak','2kalalalal','2lkmclj5al','4lkmd5j6l5',
    '55a5akalak','2kalalalal','2lkmclj5al','4lkmd5j6l5','55a5akalak','2kalalalal','2lklclb5al','4lkmd5j6l5','55a5akahak','2ka5alalal',
    '2lklclb5al','4lkmd5j5l5','55a52kahak','2ka5akalal','2lklclb5al','4lkmd5j5kl','4la12kahak','2ga5akalal','2lclclb5al','2lkmclj5kl',
    '4la12g8hak','2ga5akalak','2lalclalal','2lkmclj5kl','4la12g8hag','2ga5akalak','2kalalalal','2lkmclj5al','4la12g8hag','2ga5akalak',
    '2kalalalal','2lkmclj5al','4la12g8hag','2ga5akalak','2kalalalal','2lklclb5al','4la12g8hag','2ga5akalak','2kalalalal','2lklclb5al',
    '4la12g8hag','2ga52kahak','2ka5alalal','2lklclb5al','4la12g8gag','2ga12kahak','2ka5akalal','2lklclb5al','4la1208ga0','20a12g8hak',
    '2ga5akalal','2lalclalal','2la1208ga0','20a12g8hak','2ga5akalal','2lalalalal','2la1208ga0','20a12g8hag','2ga5akalak','2lalalalal',
    '2la1208g00','20a12g8hag','2ga5akalak','2kalalalal','2la1208g00','20a12g8hag','2ga5akalak','2kalalalal','2la0200g00','20a12g8hag',
    '2ga52kahak','2kalalalal','2la0200g00','20a12g8gag','2ga52kahak','2ka5akalal','2la0200g00','20a12g8gag','2ga12gahak','2ka5akalal',
    '2la0200g00','20a1208ga0','2ga12g8hak','2ga5akalal','2l00200000','a1208ga0','20a12g8hak','2ga5akalal','2l00000000','a1208ga0',
    '20a12g8hag','2ga5akalak','2l00000000','a1208g00','20a12g8hag','2ga5akalak','2k00000000','a1200g00','20a12g8hag','2ga5akalak',
    '2kalalalal'
];
// 24节气
const termMap = ['小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至'];

// 获取指定年份的24节气日期数据
export function getTermDate(sYear){
    if(sYear<minYear||sYear>maxYear){
        return false;
    }
    let data = termData[sYear-minYear];
    let num4 = parseInt(data,32).toString(4);
    if(num4.length!=24){
        num4 = '0'+num4;
    }
    return num4.split('').map(function(value,index){
        return +value+termMinDate[index];
    });
}

// 获取节气
export function getTerm(sYear,sMonth,sDay){
    let term = '';
    const termDate = getTermDate(sYear);
    if(termDate){
        termDate.push(31);
        termDate.forEach(function(day,index){
            let month = Math.floor(index/2)+1;
            if(sMonth==month&&sDay==day){
                term = termMap[index];
            }
        });
    }
    return term;
}

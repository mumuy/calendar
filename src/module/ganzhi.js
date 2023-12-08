import {getDateString} from './tool.js';
import {getTimestampBySolar} from './solar.js';
import {getTermDate} from './term.js';

// 天干
const ganMap = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
// 地支
const zhiMap = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

// 获取干支年: 1984年为甲子年
export function getGanZhiYear(lYear){
    let gzIndex = lYear - 1984;
    gzIndex = gzIndex%60>0?gzIndex%60:gzIndex%60+60;
    let gan = gzIndex%10;
    let zhi = gzIndex%12;
    return ganMap[gan]+zhiMap[zhi];
}

// 获取干支月
export function getGanZhiMonth(sYear,sMonth,sDay){
    let gzIndex = 0;
    let termDate = getTermDate(sYear);
    termDate.push(31);
    termDate.forEach(function(day,index){
        let month = Math.floor(index/2)+1;
        if(getDateString(sMonth,sDay)>=getDateString(month,day)){
            gzIndex = month;
        }
    });
    gzIndex += (sYear-1984)*12;
    gzIndex = gzIndex%60>0?gzIndex%60:gzIndex%60+60;
    let gan = gzIndex%10;
    let zhi = gzIndex%12;
    return ganMap[gan]+zhiMap[zhi];
}

// 获取干支日
export function getGanZhiDay(sYear,sMonth,sDay){
    let offset = Math.round((getTimestampBySolar(sYear, sMonth, sDay) -getTimestampBySolar(1900, 1, 30))/86400000);
    let gzIndex = offset+39;
    gzIndex = gzIndex%60>0?gzIndex%60:gzIndex%60+60;
    let gan = gzIndex%10;
    let zhi = gzIndex%12;
    return ganMap[gan]+zhiMap[zhi];
}

import {getDateString} from './tool.js';
import {getTimestampBySolar} from './solar.js';
import {getLunarByTimestamp} from './lunar.js';
import {getTermDate} from './term.js';

// 天干
const ganList = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
// 地支
const zhiList = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

function getGanZhiByIndex(gzIndex){
    gzIndex = gzIndex%60;
    if(gzIndex<0){
        gzIndex += 60;
    }
    let gan = gzIndex%10;
    let zhi = gzIndex%12;
    return ganList[gan]+zhiList[zhi];
}

// 获取干支年: 1984年为甲子年
export function getGanZhiYear(sYear, sMonth, sDay){
    let timestamp = getTimestampBySolar(sYear, sMonth, sDay);
    let { lYear } = getLunarByTimestamp(timestamp);
    let gzIndex = lYear - 1984;
    return getGanZhiByIndex(gzIndex);
}

// 获取干支月
export function getGanZhiMonth(sYear,sMonth,sDay){
    let result = '';
    const termDate = getTermDate(sYear);
    if(termDate){
        let gzIndex = 0;
        termDate.push(31);
        termDate.forEach(function(day,index){
            let month = Math.floor(index/2)+1;
            if(getDateString(sMonth,sDay)>=getDateString(month,day)){
                gzIndex = month;
            }
        });
        gzIndex += (sYear-1984)*12;
        result = getGanZhiByIndex(gzIndex);
    }
    return result;
}

// 获取干支日
export function getGanZhiDay(sYear,sMonth,sDay){
    let offset = Math.round((getTimestampBySolar(sYear, sMonth, sDay) -getTimestampBySolar(1900, 1, 30))/86400000);
    let gzIndex = offset+39;
    return getGanZhiByIndex(gzIndex);
}

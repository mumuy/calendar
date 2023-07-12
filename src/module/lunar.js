import {
    monthData,
    minYear,
    minMonth,
    minDay,
    maxYear
} from './data/map';
// 月份
const monthMap = ['正','二','三','四','五','六','七','八','九','十','冬','腊'];
// 十位
const dayMap = ['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'];
// 参考时间点
const startTime = Date.UTC(minYear, minMonth-1, minDay, 0, 0, 0);

// 获取农历年闰月
export function getLeapMonth(lYear){
    let data =  parseInt(monthData[lYear - minYear],32);
    return data&0xf;
}

// 获取农历年长度
export function getLunarYearDays(lYear) {
    let offset = 0;
    let data = parseInt(monthData[lYear - minYear],32);
    for (let i = 1<<15; i >= 1<<4; i >>= 1) {
        offset += (data&i)?30:29;
    }
    if(getLeapMonth(lYear)){
        offset += (data&1<<16)?30:29;
    }
    return offset;
}

// 获得农历月份天数
export function getLunarMonthDays(lYear,lMonth,isLeap){
    let data = parseInt(monthData[lYear - minYear],32);
    let days = data&1<<(16 - lMonth)?30:29;
    if(isLeap&&lMonth==leapMonth){
        days = data&1<<16?30:29;
    }
    return days;
}

// 农历日期转时间戳
export function getTimestampByLunar(lYear,lMonth,lDay,isLeap){
    // 有效性验证
    if(lYear<minYear||lYear>maxYear){
        return null;
    }
    if(lMonth<1||lMonth>12){
        return null;
    }
    let leapMonth = getLeapMonth(lYear);
    if(isLeap&&leapMonth!=lMonth){
        return null;
    }
    let days = (isLeap?data&1<<16:1<<(17-lMonth))?30:29;
    if(lDay>days){
        return null;
    }
    // 时间戳获取
    let offset = 0;
    let data = parseInt(monthData[lYear - minYear],32);
    for(let year=minYear;year<lYear;year++){
        offset += getLunarYearDays(year);
    }
    for(let month=1;month<lMonth||isLeap&&month==lMonth;month++){
        offset += data&1<<(16 - month)?30:29;
    }
    if(isLeap&&lMonth>leapMonth){
        offset += data&1<<16?30:29;
    }
    offset += lDay;
    return startTime+offset*86400000;
}

// 时间戳转农历日期
export function getLunarByTimestamp(timestamp){
    let offset = Math.floor((timestamp - startTime)/86400000);
    let lYear = 0, lMonth = 0, lDay = 0, isLeap = false;
    let days;
    if(offset<0){
        return null;
    }
    let count = 0;
    for(lYear = minYear; lYear<=maxYear; lYear++){
        days = getLunarYearDays(lYear);
        if(count + days>=offset){
            break;
        }
        count+= days;
    }
    let data = parseInt(monthData[lYear - minYear],32);
    let leapMonth = getLeapMonth(lYear);
    offset -= count;
    count = 0;
    for(lMonth=1;lMonth<=12;lMonth++){
        days = data&1<<(16 - lMonth)?30:29;
        if(count+days>=offset){
            break;
        }
        count += days;
        if(leapMonth&&lMonth==leapMonth){
            isLeap = true;
            days = data&1<<16?30:29;
            if(count+days>=offset){
                break;
            }
            count += days;
        }
    }
    lDay = offset-count;
    return {
        lYear:lYear,
        lMonth:lMonth,
        lDay:lDay,
        isLeap:isLeap,
        lMonthZH:(isLeap?'闰':'')+monthMap[lMonth-1]+'月',
        lDayZH:dayMap[lDay-1]
    };
}

import {
    monthData,
    minYear,
    maxYear
} from './data/map';

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

// 获取偏移天数（参考日期：1900年1月30日） - 通过农历
export function getOffsetByLunar(lYear,lMonth,lDay,isLeap){
    let offset = 0;
    let data = parseInt(monthData[lYear - minYear],32);
    let leapMonth = getLeapMonth(lYear);
    if(lYear<minYear||lYear>maxYear){
        return -1;
    }
    for(let year=minYear;year<lYear;year++){
        offset += getLunarYearDays(year);
    }
    if(lMonth<1||lMonth>12){
        return -1;
    }
    for(let month=1;month<lMonth||isLeap&&month==lMonth;month++){
        offset += data&1<<(16 - month)?30:29;
    }
    if(isLeap&&lMonth>leapMonth){
        offset += data&1<<16?30:29;
    }
    let days = (isLeap?data&1<<16:1<<(17-lMonth))?30:29;
    if(lDay>days){
        return -1;
    }
    offset += lDay;
    return offset;
}

// 获取农历日期（参考日期：1900年1月30日）
export function getLunarByOffset(offset){
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
        isLeap:isLeap
    };
}

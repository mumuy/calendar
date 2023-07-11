import {
    weekMap
} from './data/map';

// 获取偏移天数（参考日期：1900年1月30日） - 通过公历
export function getOffsetBySolar(sYear,sMonth,sDay){
    return Math.round((Date.UTC(sYear, sMonth-1, sDay, 0, 0, 0) - Date.UTC(1900, 0, 30, 0, 0, 0))/86400000);
}

// 获取公历日期
export function getSolarByTimestamp(timestamp){
    let now = new Date(timestamp);
    let week = now.getDay();
    return {
        'sYear':now.getFullYear(),
        'sMonth':now.getMonth()+1,
        'sDay':now.getDate(),
        'week':week,
        'weekZH':'星期'+weekMap[week],
    };
}

// 获取公历一个月天数
export function getSolarMonthDays(year,month){
    let day = new Date(year,month,0);
    return  day.getDate();
}

import {getDateString} from './tool.js';

// 星期
const weekMap = ['日','一','二','三','四','五','六'];

// 公历日期转时间戳
export function getTimestampBySolar(sYear,sMonth,sDay){
    return Date.UTC(sYear, sMonth-1, sDay, 0, 0, 0);
};

// 通过时间戳获取日期
export function getSolarByTimestamp(timestamp){
    let now = new Date(timestamp);
    let week = now.getDay();
    let item = {
        sYear:now.getFullYear(),
        sMonth:now.getMonth()+1,
        sDay:now.getDate(),
        week:week,
        weekZH:'星期'+weekMap[week]
    };
    item['date'] = getDateString(item['sYear'],item['sMonth'],item['sDay']);
    return item;
}

// 获取公历一个月天数
export function getSolarMonthDays(sYear,sMonth){
    return  new Date(sYear,sMonth,0).getDate();
}
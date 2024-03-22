import {
    minYear,
    minMonth,
    minDay,
    maxYear
} from './config/base.js';
// 闰月数据压缩：1位闰月大小+12位平月大小及4位长度闰月月份转2进制，再转32进制
const monthData = [
    'iuo','in0','19bg','l6l','1kj0','1mag','2pak','ll0','16mg','lei',
    'in0','19dm','196g','1kig','3kil','1da0','1ll0','1bd2','15dg','2ibn',
    'ibg','195g','1d5l','qig','ra0','3aqk','ar0','15bg','kni','ibg',
    'pb6','1l50','1qig','rkl','mmg','ar0','31n3','14n0','3i6n','1iag',
    '1l50','3m56','1dag','ll0','39dk','9eg','14mg','1kli','1aag','1dan',
    'r50','1dag','2kql','jd0','19dg','2hbj','klg','1ad8','1qag','ql0',
    '1bl6','1aqg','ir0','1an4','19bg','kj0','1sj3','1mag','mqn','ll0',
    '15mg','jel','img','196g','1l6k','1kig','1lao','1da0','1dl0','35d6',
    '15dg','idg','1abk','195g','1cjq','qig','ra0','1bq6','1ar0','15bg',
    'inl','ibg','p5g','t53','1qig','qqo','le0','1ar0','15ml','14n0',
    '1ib0','1mak','1l50','1mig','tai','ll0','1atn','9eg','14mg','1ill',
    '1aag','1d50','1el4','1bag','lep','it0','19dg','2kbm','klg','1a9g',
    'uak','ql0','1bag','mqi','ir0','19n6','1970','1kj0','1qj5','1l9g',
    'ml0','tl3','15mg','inr','img','196g','3k5m','1kig','1l90','1na5',
    '1dd0','lmg','ldi','idg','19bn','195g','1aig','3cil','r90','1bd0',
    '2ir3','14rg','ifo','ibg','p5g','2q56','1qig','qp0','39m4','1an0',
    '18n0','1kn3','1ib0','1lan','1l50','1mig','nal','ll0','19mg','lek',
    'kmg','1ado','1aag','1d50','1dl6','1bag','ld0','1at4','19dg','klg',
    '1cjj','q9g','spn','ql0','1bag','2iql','ir0','19bg','l74','1kb0',
    '1qb8','1l90','1ml0','2ql6','lmg','in0','1aek','18mg','1kag','1sii',
    '1l90'
];
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
    let leapMonth = getLeapMonth(lYear);
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
    for(let month=1;month<lMonth||isLeap&&month==lMonth&&lMonth==leapMonth;month++){
        offset += data&1<<(16 - month)?30:29;
    }
    if(leapMonth&&lMonth>leapMonth){
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
    if(offset<=0){
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
            days = data&1<<16?30:29;
            if(count+days>=offset){
                isLeap = true;
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

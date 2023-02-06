import {
    termMinDate,
    termData,
    monthData,
    termMap,
    animalMap,
    zodiacMap,
    zodiacDate,
    ganMap,
    zhiMap,
    monthMap,
    weekMap,
    dayMap,
    sFestival,
    sFestival2,
    lFestival,
    lFestival2,
    oFestival
} from './data';

// 农历有效期范围
const minYear = 1900, minMonth=1, minDay = 30;
const maxYear = 2100;

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

// 获取干支纪年: 1984年为甲子年
export function getGanZhiYear(lYear){
    let gzIndex = lYear - 1984;
    gzIndex = gzIndex%60>0?gzIndex%60:gzIndex%60+60;
    let gan = gzIndex%10;
    let zhi = gzIndex%12;
    return ganMap[gan]+zhiMap[zhi];
}

// 获取生肖纪年: 1984年为鼠年
export function getAnimalYear(lYear){
    let diff = lYear - 1984;
    let animal = diff%12;
    return animalMap[animal>-1?animal:animal+12];
}

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

// 获取偏移天数（参考日期：1900年1月30日）
export function getOffsetByDate(lYear,lMonth,lDay,isLeap){
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
export function getDateByOffset(offset){
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

// 获取公历一个月天数
export function getSolarMonthDays(year,month){
    let day = new Date(year,month,0);
    return  day.getDate();
}

// 格式化日期字符串
export function getDateString(){
    return Array.from(arguments).map(function(value){
        return (''+value).padStart(2,'0');
    }).join('-');
};

// 获取日期详情
export function getDateInfo(timestamp){
    let now = new Date(timestamp);
    let date = now.getDate();
    let week = now.getDay();
    let index = Math.ceil(date/7);
    let offset = Math.round((timestamp - Date.UTC(1900, 0, 30, 0, 0, 0))/86400000);
    let result = {
        'sYear':now.getFullYear(),
        'sMonth':now.getMonth()+1,
        'sDay':now.getDate(),
        'week':week,
        'weekZH':'星期'+weekMap[week],
    };
    let zoIndex = 11;
    zodiacDate.forEach(function(day,index){
        let month = index+1;
        if(getDateString(result['sMonth'],result['sDay'])>=getDateString(month,day)){
            zoIndex = index%12;
        }
    });
    result['zodiac'] =  zodiacMap[zoIndex]+'座';
    let festivals = [];
    let dateStr = getDateString(result['sMonth'],result['sDay']);
    if(sFestival[dateStr]){
        festivals.push(sFestival[dateStr]);
    }
    if(sFestival2[dateStr]){
        festivals.push(sFestival2[dateStr]);
    }
    dateStr = getDateString(result['sMonth'],index,week);
    if(oFestival[dateStr]){
        festivals.push(oFestival[dateStr]);
    }
    if(offset>-1){
        let termDate = getTermDate(result['sYear']);
        // 干支日
        let gzIndex = offset+39;
        gzIndex = gzIndex%60>0?gzIndex%60:gzIndex%60+60;
        let gan = gzIndex%10;
        let zhi = gzIndex%12;
        result['gzDayZH'] = ganMap[gan]+zhiMap[zhi];
        // 干支月
        gzIndex = 0;
        termDate.push('31');
        termDate.forEach(function(day,index){
            let month = Math.floor(index/2)+1;
            if(result['sMonth']==month&&result['sDay']==day){
                result['term'] = termMap[index];
            }else{
                result['term'] = "";
            }
            if(getDateString(month,day)>=getDateString(result['sMonth'],result['sDay'])){
                if(!gzIndex){
                    gzIndex = month;
                }
            }
        });
        gzIndex += (result['sYear']-1984)*12-1;
        gzIndex = gzIndex%60>0?gzIndex%60:gzIndex%60+60;
        gan = gzIndex%10;
        zhi = gzIndex%12;
        result['gzMonthZH'] = ganMap[gan]+zhiMap[zhi];
        result = Object.assign(result,getDateByOffset(offset));
        result['animal'] = getAnimalYear(result['lYear']);
        result['gzYearZH'] = getGanZhiYear(result['lYear']);
        let leapMonth = getLeapMonth(result['lYear']);
        result['lMonthZH'] = (result['lMonth']==leapMonth&&result['isLeap']?'闰':'')+monthMap[result['lMonth']-1]+'月';
        result['lDayZH'] = dayMap[result['lDay']-1];
        dateStr = getDateString(result['lMonth'],result['lDay']);
        if(result['lMonth']==12&&result['lDay']==getLunarMonthDays(result['lYear'],12)){
            festivals.push(lFestival['12-30']);
        }else{
            if(lFestival[dateStr]){
                festivals.push(lFestival[dateStr]);
            }
            if(lFestival2[dateStr]){
                festivals.push(lFestival2[dateStr]);
            }
        }
    }
    result['festival'] = festivals.join(' ');
    return result;
}

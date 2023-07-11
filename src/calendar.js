import {
    monthMap,
    dayMap,
    minYear,
    maxYear
} from './module/data/map';
import {getLeapMonth,getOffsetByLunar,getLunarByOffset} from './module/lunar';
import {getOffsetBySolar,getSolarByTimestamp} from './module/solar';
import {getTerm} from './module/term';
import {getGanZhiYear,getGanZhiMonth,getGanZhiDay} from './module/ganzhi';
import {getFestivalsBySolar,getFestivalsByLunar} from './module/festival';
import {getZodiac} from './module/zodiac';
import {getAnimalYear} from './module/animal';

function getDateInfo(timestamp){
    let result = getSolarByTimestamp(timestamp);
    let offset = getOffsetBySolar(result['sYear'],result['sMonth'],result['sDay']);
    result = Object.assign(result,getLunarByOffset(offset));
    result['zodiac'] =  getZodiac(result['sMonth'],result['sDay']);
    let festivals = [];
    festivals = festivals.concat(getFestivalsBySolar(result['sYear'],result['sMonth'],result['sDay']));
    if(offset>-1){
        result['gzYearZH'] = getGanZhiYear(result['sYear']);
        result['gzMonthZH'] = getGanZhiMonth(result['sYear'],result['sMonth'],result['sDay']);
        result['gzDayZH'] = getGanZhiDay(result['sYear'],result['sMonth'],result['sDay']);
        result['animal'] = getAnimalYear(result['lYear']);
        result['term'] = getTerm(result['sYear'],result['sMonth'],result['sDay']);
        let leapMonth = getLeapMonth(result['lYear']);
        result['lMonthZH'] = (result['lMonth']==leapMonth&&result['isLeap']?'闰':'')+monthMap[result['lMonth']-1]+'月';
        result['lDayZH'] = dayMap[result['lDay']-1];
        festivals = festivals.concat(getFestivalsByLunar(result['lYear'],result['lMonth'],result['lDay']));
    }
    result['festival'] = festivals.join(' ');
    return result;
}

export default {
    Solar:function(sYear,sMonth,sDay){
        let time = Date.UTC(sYear, sMonth-1, sDay, 0, 0, 0);
        return time?getDateInfo(time):null;
    },
    Lunar:function(lYear,lMonth,lDay,isLeap){
        let l_month = getLeapMonth(lYear);
        if(isLeap&&l_month!=lMonth){
            return null;
        }
        let startTime = Date.UTC(minYear, minMonth-1, minDay, 0, 0, 0);
        let offset = getOffsetByLunar(lYear,lMonth,lDay,isLeap);
        let time = startTime+offset*86400000;
        return offset>-1?getDateInfo(time):null;
    },
    getToday:function(){
        let time = (new Date()).getTime();
        return getDateInfo(time);
    }
};

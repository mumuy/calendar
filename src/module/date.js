import {getSolarByTimestamp} from './solar.js';
import {getLunarByTimestamp} from './lunar.js';
import {getTerm} from './term.js';
import {getGanZhiYear,getGanZhiMonth,getGanZhiDay} from './ganzhi.js';
import {getZodiac} from './zodiac.js';
import {getAnimalYear} from './animal.js';
import {getFestivalsBySolar,getFestivalsByLunar,getTermFestivalsBySolar} from './festival.js';

// 获取指定日志下的数据
export function getDateInfo(timestamp){
    let result = getSolarByTimestamp(timestamp);
    result['zodiac'] =  getZodiac(result['sMonth'],result['sDay']);
    let festivals = [];
    let temp = getLunarByTimestamp(timestamp);
    if(temp){
        Object.assign(result,temp);
        result['gzYearZH'] = getGanZhiYear(result['lYear']);
        result['gzMonthZH'] = getGanZhiMonth(result['sYear'],result['sMonth'],result['sDay']);
        result['gzDayZH'] = getGanZhiDay(result['sYear'],result['sMonth'],result['sDay']);
        result['animal'] = getAnimalYear(result['lYear']);
        result['term'] = getTerm(result['sYear'],result['sMonth'],result['sDay']);
        festivals = festivals.concat(getTermFestivalsBySolar(result['sYear'],result['sMonth'],result['sDay']));
        festivals = festivals.concat(getFestivalsByLunar(result['lYear'],result['lMonth'],result['lDay']));
    }else{
        Object.assign(result,{
            lYear:null,
            lMonth:null,
            lDay:null,
            isLeap:false,
            lMonthZH:'',
            lDayZH:'',
            gzYearZH:'',
            gzMonthZH:'',
            gzDayZH:'',
            animal:'',
            term:''
        });
    }
    festivals = festivals.concat(getFestivalsBySolar(result['sYear'],result['sMonth'],result['sDay']));
    result['festival'] = festivals.join(' ');
    return result;
}

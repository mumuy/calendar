import {getSolarByTimestamp} from './solar';
import {getLunarByTimestamp} from './lunar';
import {getTerm} from './term';
import {getGanZhiYear,getGanZhiMonth,getGanZhiDay} from './ganzhi';
import {getZodiac} from './zodiac';
import {getAnimalYear} from './animal';
import {getFestivalsBySolar,getFestivalsByLunar,getTermFestivalsBySolar} from './festival';

// 月份
const monthMap = ['正','二','三','四','五','六','七','八','九','十','冬','腊'];
// 十位
const dayMap = ['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'];

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
        result['lMonthZH'] = (result['isLeap']?'闰':'')+monthMap[result['lMonth']-1]+'月';
        result['lDayZH'] = dayMap[result['lDay']-1];
        festivals = festivals.concat(getFestivalsByLunar(result['lYear'],result['lMonth'],result['lDay']));
    }
    festivals = festivals.concat(getFestivalsBySolar(result['sYear'],result['sMonth'],result['sDay']));
    result['festival'] = festivals.join(' ');
    return result;
}

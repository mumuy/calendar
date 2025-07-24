import {getSolarByTimestamp} from './solar.js';
import {getLunarByTimestamp} from './lunar.js';
import {getTerm} from './term.js';
import {getGanZhiYear,getGanZhiMonth,getGanZhiDay} from './ganzhi.js';
import {getZodiac} from './zodiac.js';
import {getAnimalYear} from './animal.js';
import {getFestivalsBySolar,getFestivalsByLunar,getTermFestivalsBySolar} from './festival.js';

// 获取指定日期的数据
export function getDateInfo(timestamp){
    const solar = getSolarByTimestamp(timestamp);
    const lunar = getLunarByTimestamp(timestamp);
    return Object.assign(
        {
            lYear:null,
            lMonth:null,
            lDay:null,
            isLeap:false,
            lMonthZH:'',
            lDayZH:'',
        },
        solar,
        lunar||{},
        {
            zodiac:getZodiac(solar['sMonth'],solar['sDay']),                                    // 星座
            term:getTerm(solar['sYear'],solar['sMonth'],solar['sDay']),                         // 节气
            animal:getAnimalYear(solar['sYear'],solar['sMonth'],solar['sDay']),                 // 生肖
            gzYearZH:getGanZhiYear(solar['sYear'],solar['sMonth'],solar['sDay']),               // 干支年
            gzMonthZH:getGanZhiMonth(solar['sYear'],solar['sMonth'],solar['sDay']),             // 干支月
            gzDayZH:getGanZhiDay(solar['sYear'],solar['sMonth'],solar['sDay']),                 // 干支日
            festival:[].concat(
                getFestivalsBySolar(solar['sYear'],solar['sMonth'],solar['sDay']),              // 公历节日
                getTermFestivalsBySolar(solar['sYear'],solar['sMonth'],solar['sDay']),          // 节气相关节日
                lunar?getFestivalsByLunar(lunar['lYear'],lunar['lMonth'],lunar['lDay']):[]      // 农历节日
            ).join(' ')
        }
    );
}

import {getDateString} from './tool';
import {getSolarByTimestamp} from './solar';
import {getLunarByTimestamp,getLunarMonthDays} from './lunar';
import {getTermDate} from './term';
import {getGanZhiDay} from './ganzhi';

// 公历主要节日
export const sFestival = {
    '01-01':'元旦',
    '02-14':'情人节',
    '03-08':'妇女节',
    '03-12':'植树节',
    '04-01':'愚人节',
    '05-01':'劳动节',
    '05-04':'青年节',
    '06-01':'儿童节',
    '07-01':'建党节',
    '08-01':'建军节',
    '09-10':'教师节',
    '10-01':'国庆节',
    '11-01':'万圣节',
    '12-13':'国家公祭日',
    '12-24':'平安夜',
    '12-25':'圣诞节',
};
// 公历非主要节日
export const sFestival2 = {
    '01-10':'中国人民警察节',
    '01-26':'国际海关日',
    '02-02':'世界湿地日',
    '02-10':'国际气象节',
    '03-01':'国际海豹日',
    '03-03':'全国爱耳日',
    '03-05':'雷锋纪念日',
    '03-09':'保护母亲河日',
    '03-14':'国际警察日',
    '03-15':'消费者权益日',
    '03-17':'国际航海日',
    '03-18':'全国爱肝日',
    '03-21':'世界睡眠日',
    '03-22':'世界水日',
    '03-23':'世界气象日',
    '03-24':'防治结核病日',
    '03-27':'学生安全教育日',
    '04-07':'世界卫生日',
    '04-13':'泼水节',
    '04-15':'国家安全教育日',
    '04-22':'世界地球日',
    '04-23':'世界读书日',
    '04-24':'中国航天日',
    '04-26':'知识产权日',
    '05-02':'世界哮喘日',
    '05-08':'世界微笑日 世界红十字日',
    '05-12':'国际护士节 防灾减灾日',
    '05-15':'国际家庭日',
    '05-18':'博物馆日',
    '05-20':'学生营养日',
    '05-22':'生物多样性日',
    '05-31':'世界无烟日',
    '06-06':'世界环境日',
    '06-06':'全国爱眼日',
    '06-11':'中国人口日',
    '06-14':'世界献血者日',
    '06-23':'国际奥林匹克日',
    '06-25':'全国土地日',
    '06-26':'国际禁毒日',
    '07-01':'香港回归日',
    '07-02':'体育记者日',
    '07-11':'世界人口日',
    '08-08':'全民健身日',
    '08-12':'国际青年节',
    '08-19':'中国医师节',
    '08-26':'律师咨询日',
    '09-08':'国际扫盲日',
    '09-16':'中国脑健康日 臭氧层保护日',
    '09-17':'清洁地球日',
    '09-18':'九一八纪念日',
    '09-20':'全国爱牙日',
    '09-21':'国际和平日',
    '09-27':'世界旅游日',
    '09-30':'烈士纪念日',
    '10-04':'世界动物日',
    '10-05':'世界教师日',
    '10-08':'全国高血压日',
    '10-09':'世界邮政日',
    '10-13':'世界保健日',
    '10-14':'世界标准日',
    '10-15':'国际盲人节',
    '10-16':'世界粮食日',
    '11-08':'记者节',
    '11-09':'消防宣传日',
    '11-14':'世界糖尿病日',
    '11-17':'世界学生日',
    '12-01':'艾滋病日',
    '12-03':'国际残疾人日',
    '12-04':'国家宪法日',
    '12-09':'世界足球日',
    '12-10':'世界人权日',
    '12-11':'国际山岳日',
    '12-15':'强化免疫日',
};
// 农历主要节日
export const lFestival = {
    '01-01':'春节',
    '01-15':'元宵节',
    '02-02':'龙头节',
    '03-03':'上巳节',
    '05-05':'端午节',
    '07-07':'七夕节',
    '07-15':'中元节',
    '08-15':'中秋节',
    '09-09':'重阳节',
    '10-15':'下元节',
    '12-08':'腊八节',
    '12-23':'北小年',
    '12-24':'南小年',
    '12-30':'除夕'
};
// 农历非主要节日
export const lFestival2 = {
    '06-24':'火把节',
    '10-01':'寒衣节',
};
// 公历星期推算节日
export const oFestival = {
    '05-02-00':'母亲节',
    '06-03-00':'父亲节',
    '11-04-04':'感恩节',
};
// 节气推算节日
export const tFestival = ['初伏','中伏','末伏','出伏','复活节'];

// 通过公历获取节日
export function getFestivalsBySolar(sYear,sMonth,sDay){
    let festivals = [];
    let now = new Date(sYear,sMonth-1,sDay);
    let date = now.getDate();
    let week = now.getDay();
    let index = Math.ceil(date/7);
    let dateStr = getDateString(sMonth,sDay);
    if(sFestival[dateStr]){
        festivals.push(sFestival[dateStr]);
    }
    if(sFestival2[dateStr]){
        festivals.push(sFestival2[dateStr]);
    }
    dateStr = getDateString(sMonth,index,week);
    if(oFestival[dateStr]){
        festivals.push(oFestival[dateStr]);
    }
    return festivals;
}

// 获取节气作用节日
export function getTermFestivalsBySolar(sYear,sMonth,sDay){
    let festivals = [];
    let termDate = getTermDate(sYear);
    let dayTime = 86400000;
    // 三伏天
    let xiazhi = new Date(sYear,5,termDate[11]);
    let qiufen = new Date(sYear,7,termDate[14]);
    let count = 0;
    for(let time = xiazhi.getTime();time<=qiufen.getTime();time+=dayTime){
        let solar = getSolarByTimestamp(time);
        let ganzhi = getGanZhiDay(solar['sYear'],solar['sMonth'],solar['sDay']);
        if(ganzhi.indexOf('庚')>-1){
            count++;
            if(solar['sYear']==sYear&&solar['sMonth']==sMonth&&solar['sDay']==sDay){
                if(count==3){
                    festivals.push('初伏');
                }else if(count==4){
                    festivals.push('中伏');
                }
            }
        }
    }
    count = 0;
    for(let time = qiufen.getTime();time<=qiufen.getTime()+dayTime*20;time+=dayTime){
        let solar = getSolarByTimestamp(time);
        let ganzhi = getGanZhiDay(solar['sYear'],solar['sMonth'],solar['sDay']);
        if(ganzhi.indexOf('庚')>-1){
            count++;
            if(solar['sYear']==sYear&&solar['sMonth']==sMonth&&solar['sDay']==sDay){
                if(count==1){
                    festivals.push('末伏');
                }else if(count==2){
                    festivals.push('出伏');
                }
            }
        }
    }
    // 复活节
    let chunfen = new Date(sYear,2,termDate[5]);
    let hasFullMoon = false;
    let hasSunDay = false;
    for(let time = chunfen.getTime();time<=chunfen.getTime()+30*dayTime;time+=dayTime){
        if(!hasFullMoon){
            let lunar = getLunarByTimestamp(time);
            if(lunar['lDay']==15){
                hasFullMoon = true;
            }
        }else if(!hasSunDay){
            let solar = getSolarByTimestamp(time);
            if(solar['week']==0){
                hasSunDay = true;
                if(solar['sYear']==sYear&&solar['sMonth']==sMonth&&solar['sDay']==sDay){
                    festivals.push('复活节');
                }
            }
        }
    }
    return festivals;
}

// 通过农历获取节日
export function getFestivalsByLunar(lYear,lMonth,lDay){
    let festivals = [];
    let dateStr = getDateString(lMonth,lDay);
    if(lMonth==12&&lDay==getLunarMonthDays(lYear,12)){
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

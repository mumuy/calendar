import {getDateString} from './tool.js';
import {getSolarByTimestamp} from './solar.js';
import {getLunarMonthDays} from './lunar.js';
import {getTermDate} from './term.js';
import {getGanZhiDay} from './ganzhi.js';

// 公历主要节日
export const sFestival = {
    '01-01':[{
        'name':'元旦',
        'found':'1949'
    }],
    '02-14':[{
        'name':'情人节',
        'found':'0270'
    }],
    '03-08':[{
        'name':'妇女节',
        'found':'1949-12'
    }],
    '03-12':[{
        'name':'植树节',
        'found':'1979'
    }],
    '04-01':[{
        'name':'愚人节',
        'found':'1564'
    }],
    '05-01':[{
        'name':'劳动节',
        'found':'1949-12'
    }],
    '05-04':[{
        'name':'青年节',
        'found':'1949-12'
    }],
    '06-01':[{
        'name':'儿童节',
        'found':'1949-11'
    }],
    '07-01':[{
        'name':'建党节',
        'found':'1938-05'
    }],
    '08-01':[{
        'name':'建军节',
        'found':'1933-07-11'
    }],
    '09-10':[{
        'name':'教师节',
        'found':'1985-06'
    }],
    '10-01':[{
        'name':'国庆节',
        'found':'1949-12-02'
    }],
    '11-01':[{
        'name':'万圣节',
        'found':'0600'
    }],
    '12-05':[{
        'name':'国际志愿人员日',
        'found':'1985-12-17'
    }],
    '12-13':[{
        'name':'国家公祭日',
        'found':'2014-02-27'
    }],
    '12-25':[{
        'name':'圣诞节',
        'found':'0336'
    }],
};
// 公历非主要节日
export const sFestival2 = {
    '01-10':[{
        'name':'中国人民警察节',
        'found':'2020-07-21'
    }],
    '01-26':[{
        'name':'国际海关日',
        'found':'1983-01-26'
    }],
    '02-02':[{
        'name':'世界湿地日',
        'found':'1996'
    }],
    '02-10':[{
        'name':'国际气象节',
        'found':'1991-02-10'
    }],
    '03-01':[{
        'name':'国际海豹日',
        'found':'1983'
    }],
    '03-03':[{
        'name':'全国爱耳日',
        'found':'1998-03'
    }],
    '03-05':[{
        'name':'雷锋纪念日',
        'found':'1963-03-05'
    }],
    '03-09':[{
        'name':'保护母亲河日',
        'found':'2002'
    }],
    '03-15':[{
        'name':'消费者权益日',
        'found':'1983'
    }],
    '03-17':[{
        'name':'国际航海日',
        'found':'1977-11'
    }],
    '03-18':[{
        'name':'全国爱肝日',
        'found':'2001'
    }],
    '03-21':[{
        'name':'世界森林日',
        'found':'2012-12'
    },{
        'name':'世界睡眠日',
        'found':'2001'
    }],
    '03-22':[{
        'name':'世界水日',
        'found':'1993-01-18'
    }],
    '03-23':[{
        'name':'世界气象日',
        'found':'1961'
    }],
    '03-24':[{
        'name':'防治结核病日',
        'found':'1995-03-24'
    }],
    '03-27':[{
        'name':'学生安全教育日',
        'found':'1996-03-25'
    }],
    '04-07':[{
        'name':'世界卫生日',
        'found':'1948-06'
    }],
    '04-13':[{
        'name':'泼水节',
        'found':''
    }],
    '04-15':[{
        'name':'国家安全教育日',
        'found':'2015-07-01'
    }],
    '04-22':[{
        'name':'世界地球日',
        'found':'1970'
    }],
    '04-23':[{
        'name':'世界读书日',
        'found':'1995-11-15'
    }],
    '04-24':[{
        'name':'中国航天日',
        'found':'2016-03-08'
    }],
    '04-26':[{
        'name':'知识产权日',
        'found':'2001-04-26'
    }],
    '05-02':[{
        'name':'世界防治哮喘日',
        'found':'1998-12-11'
    }],
    '05-08':[{
        'name':'世界微笑日',
        'found':'1948'
    },
    {
        'name':'世界红十字日',
        'found':'1948'
    }],
    '05-12':[{
        'name':'国际护士节',
        'found':'1912'
    },
    {
        'name':'防灾减灾日',
        'found':'2009-05-12'
    }],
    '05-15':[{
        'name':'国际家庭日',
        'found':'1994-05-15'
    }],
    '05-18':[{
        'name':'国际博物馆日',
        'found':'1977-05-18'
    }],
    '05-19':[{
        'name':'中国旅游日',
        'found':'2001-05-19'
    }],
    '05-20':[{
        'name':'学生营养日',
        'found':'2001-03'
    }],
    '05-22':[{
        'name':'国际生物多样性日',
        'found':'2000-12-20'
    }],
    '05-30':[{
        'name':'五卅运动纪念日',
        'found':'1925-05-30'
    }],
    '05-31':[{
        'name':'世界无烟日',
        'found':'1987-11'
    }],
    '06-06':[{
        'name':'世界环境日',
        'found':'1972-06-05'
    }],
    '06-06':[{
        'name':'全国爱眼日',
        'found':'1996'
    }],
    '06-11':[{
        'name':'中国人口日',
        'found':'1990'
    }],
    '06-14':[{
        'name':'世界献血者日',
        'found':'2005-05-24'
    }],
    '06-23':[{
        'name':'国际奥林匹克日',
        'found':'1948-06-23'
    }],
    '06-25':[{
        'name':'全国土地日',
        'found':'1991-05-24'
    }],
    '06-26':[{
        'name':'国际禁毒日',
        'found':'1987-06-12'
    }],
    '07-01':[{
        'name':'香港回归纪念日',
        'found':'1997-07-01'
    }],
    '07-02':[{
        'name':'国际体育记者日',
        'found':'1995'
    }],
    '07-11':[{
        'name':'世界人口日',
        'found':'1989'
    }],
    '08-08':[{
        'name':'全民健身日',
        'found':'2009'
    }],
    '08-12':[{
        'name':'国际青年日',
        'found':'1999-12-17'
    }],
    '08-19':[{
        'name':'中国医师节',
        'found':'2017-11-03'
    }],
    '08-26':[{
        'name':'全国律师咨询日',
        'found':'1980-08-26'
    }],
    '09-03':[{
        'name':'抗战胜利纪念日',
        'found':'2014-02-27'
    }],
    '09-08':[{
        'name':'国际扫盲日',
        'found':'1965-11-17'
    }],
    '09-16':[{
        'name':'中国脑健康日',
        'found':'2000-09-16'
    },
    {
        'name':'国际臭氧层保护日',
        'found':'1995-01-23'
    }],
    '09-18':[{
        'name':'九一八事变纪念日',
        'found':'1931-09-18'
    }],
    '09-20':[{
        'name':'全国爱牙日',
        'found':'1989'
    }],
    '09-21':[{
        'name':'国际和平日',
        'found':'2001-09-07'
    }],
    '09-27':[{
        'name':'世界旅游日',
        'found':'1970-09-27'
    }],
    '09-28':[{
        'name':'孔子诞辰纪念日',
        'found':'1913-09-28'
    }],
    '09-30':[{
        'name':'烈士纪念日',
        'found':'2014-09-30'
    }],
    '10-04':[{
        'name':'世界动物日',
        'found':'1931'
    }],
    '10-05':[{
        'name':'世界教师日',
        'found':'1994'
    }],
    '10-08':[{
        'name':'全国高血压日',
        'found':'1998'
    }],
    '10-09':[{
        'name':'世界邮政日',
        'found':'1984'
    }],
    '10-13':[{
        'name':'世界保健日',
        'found':'1950'
    }],
    '10-14':[{
        'name':'世界标准日',
        'found':'1946'
    }],
    '10-15':[{
        'name':'国际盲人节',
        'found':'1984'
    }],
    '10-16':[{
        'name':'世界粮食日',
        'found':'1981-10-16'
    }],
    '10-24':[{
        'name':'联合国日',
        'found':'1947-10-24'
    }],
    '11-08':[{
        'name':'记者节',
        'found':'2000-08-01'
    }],
    '11-09':[{
        'name':'消防宣传日',
        'found':'1992'
    }],
    '11-14':[{
        'name':'世界防治糖尿病日',
        'found':'1991'
    }],
    '11-17':[{
        'name':'国际大学生节',
        'found':'1946-11-17'
    }],
    '12-01':[{
        'name':'世界艾滋病日',
        'found':'1988'
    }],
    '12-03':[{
        'name':'国际残疾人日',
        'found':'1992-10-12'
    }],
    '12-04':[{
        'name':'国家宪法日',
        'found':'2014-11-01'
    }],
    '12-09':[{
        'name':'世界足球日',
        'found':'1978'
    }],
    '12-10':[{
        'name':'世界人权日',
        'found':'1948-12-10'
    }],
    '12-11':[{
        'name':'国际山岳日',
        'found':'2003-12-11'
    }],
    '12-15':[{
        'name':'强化免疫日',
        'found':'1988'
    }],
    '12-20':[{
        'name':'澳门回归纪念日',
        'found':'1999-12-20'
    }],
};
// 农历主要节日
export const lFestival = {
    '01-01':[{
        'name':'春节',
        'found':''
    }],
    '01-15':[{
        'name':'元宵节',
        'found':''
    }],
    '02-02':[{
        'name':'龙头节',
        'found':''
    }],
    '03-03':[{
        'name':'上巳节',
        'found':''
    }],
    '05-05':[{
        'name':'端午节',
        'found':''
    }],
    '07-07':[{
        'name':'七夕节',
        'found':''
    }],
    '07-15':[{
        'name':'中元节',
        'found':''
    }],
    '08-15':[{
        'name':'中秋节',
        'found':''
    }],
    '09-09':[{
        'name':'重阳节',
        'found':''
    }],
    '10-15':[{
        'name':'下元节',
        'found':''
    }],
    '12-08':[{
        'name':'腊八节',
        'found':''
    }],
    '12-23':[{
        'name':'北小年',
        'found':''
    }],
    '12-24':[{
        'name':'南小年',
        'found':''
    }],
    '12-30':[{
        'name':'除夕',
        'found':''
    }],
};
// 农历非主要节日
export const lFestival2 = {
    '03-23':[{
        'name':'妈祖圣诞',
        'found':'0960'
    }],
    '06-24':[{
        'name':'火把节',
        'found':''
    }],
    '10-01':[{
        'name':'寒衣节',
        'found':''
    }],
};
// 公历星期推算节日
export const oFestival = {
    '03-04-01':[{
        'name':'中小学生安全教育日',
        'found':'1996'
    }],
    '05-02-00':[{
        'name':'母亲节',
        'found':'1913-05-10'
    }],
    '05-03-00':[{
        'name':'全国助残日',
        'found':'1990-12-28'
    }],
    '06-03-00':[{
        'name':'父亲节',
        'found':'1972'
    }],
    '09-03-00':[{
        'name':'世界清洁地球日',
        'found':'1993'
    }],
    '09-04-00':[{
        'name':'国际聋人日',
        'found':'1957'
    }],
    '10-01-01':[{
        'name':'国际住房日',
        'found':'1985-12-17'
    }],
    '11-04-04':[{
        'name':'感恩节',
        'found':'1941'
    }],
};
// 节气推算节日
const shujiu = ['一九','二九','三九','四九','五九','六九','七九','八九','九九'];
export const tFestival = ['寒食节','初伏','中伏','末伏','出伏','复活节'].concat(shujiu);

// 通过公历获取节日
export function getFestivalsBySolar(sYear,sMonth,sDay){
    const now = new Date(sYear,sMonth-1,sDay);
    const date = now.getDate();
    const week = now.getDay();
    const index = Math.ceil(date/7);
    const dateFull = getDateString(sYear,sMonth,sDay);
    return [
        sFestival[getDateString(sMonth,sDay)],
        sFestival2[getDateString(sMonth,sDay)],
        oFestival[getDateString(sMonth,index,week)]
    ].flatMap(function(list = []){
        return list.filter(item=>(dateFull>=item.found)).map(item=>item.name);
    });
}

// 获取节气作用节日
export function getTermFestivalsBySolar(sYear,sMonth,sDay){
    let festivals = [];
    let termDate = getTermDate(sYear);
    let dayTime = 86400000;
    // 寒食节
    (function(){
        let hanshi_time = new Date(sYear,3,termDate[6]-1).getTime();
        let solar = getSolarByTimestamp(hanshi_time);
        if(solar['sYear']==sYear&&solar['sMonth']==sMonth&&solar['sDay']==sDay){
            festivals.push('寒食节');
        }
    })();
    // 三伏天
    (function(){
        let xiazhi_time = new Date(sYear,5,termDate[11]).getTime();
        let qiufen_time = new Date(sYear,7,termDate[14]).getTime();
        let count = 0;
        for(let time = xiazhi_time;time<=qiufen_time;time+=dayTime){
            let solar = getSolarByTimestamp(time);
            let ganzhi = getGanZhiDay(solar['sYear'],solar['sMonth'],solar['sDay']);
            if(ganzhi.includes('庚')){
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
        for(let time = qiufen_time;time<=qiufen_time+dayTime*20;time+=dayTime){
            let solar = getSolarByTimestamp(time);
            let ganzhi = getGanZhiDay(solar['sYear'],solar['sMonth'],solar['sDay']);
            if(ganzhi.includes('庚')){
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
    })();
    // 数九
    (function(){
        let last_termDate = getTermDate(sYear-1);
        let last_dongzhi_time = new Date(sYear-1,11,last_termDate[23]).getTime();
        let dongzhi_time = new Date(sYear,11,termDate[23]).getTime();
        let count = 0;
        for(let time = last_dongzhi_time;time<=last_dongzhi_time+8*9*dayTime;time+=9*dayTime){
            let solar = getSolarByTimestamp(time);
            if(solar['sYear']==sYear&&solar['sMonth']==sMonth&&solar['sDay']==sDay){
                festivals.push(shujiu[count]);
            }
            count++;
        }
        count = 0;
        for(let time = dongzhi_time;time<=dongzhi_time+8*9*dayTime;time+=9*dayTime){
            let solar = getSolarByTimestamp(time);
            if(solar['sYear']==sYear&&solar['sMonth']==sMonth&&solar['sDay']==sDay){
                festivals.push(shujiu[count]);
            }
            count++;
        }
    })();
    // 复活节
    (function(){
        const getEasterDate = function(Y){
            if(Y<1900||Y>2100){
                return null;
            }
            const N = Y-1900;
            const A = N % 19;
            const Q = Math.floor(N / 4);
            const B = Math.floor((7*A+1) / 19);
            const M = (11*A+4-B) % 29;
            const W = (N+Q+31-M) % 7;
            const D = 25-M-W;
            if(D>0){
                return [4,D];
            }else{
                return [3,31+D];
            }
        };
        const result = getEasterDate(sYear);
        if(result){
            const [Month,Day] = result;
            if(Month==sMonth&&Day==sDay){
                festivals.push('复活节');
            }
        }
    })();
    return festivals;
}

// 通过农历获取节日
export function getFestivalsByLunar(lYear,lMonth,lDay){
    let festivals = [];
    const dateFull = getDateString(lYear,lMonth,lDay);
    const dateKey = getDateString(lMonth,lDay);
    if(lMonth==12&&lDay==getLunarMonthDays(lYear,12)){  // 除夕特殊处理
        festivals.push(lFestival['12-30'][0]['name']);
    }else{
        festivals = festivals.concat([
            lFestival[dateKey],
            lFestival2[dateKey]
        ].flatMap(function(list = []){
            return list.filter(item=>(dateFull>=item.found)).map(item=>item.name);
        }));
    }
    return festivals;
}
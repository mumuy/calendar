/*!
 * calendar.js v1.0.0
 * Chinese Calendar library
 * https://passer-by.com/calendar/
 *
 * Copyright (c) 2022-present, HaoLe Zheng
 *
 * Released under the MIT License
 * https://github.com/mumuy/calendar
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.calendar = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    // 农历有效期范围
    const minYear = 1900, minMonth=1, minDay = 30;
    const maxYear = 2100;
    // 24节气最小日期
    const termMinDate = [4, 19, 3, 18, 4, 19, 4, 19, 4, 20, 4, 20, 6, 22, 6, 22, 6, 22, 7, 22, 6, 21, 6, 21];
    // 24节气日期数据压缩：日期减去最小日期，差值视为4进制，再转32进制
    const termData  = [
        '4lkmd5j6l5','55kql9lal9','59lanalala','5avbnatqla','7akmd5j6l5','55kql9lal9','59lalalala','5avbnatqla','7akmd5j6l5','55kql9lal9',
        '59lalalala','5avbnatqla','7akmd5j6l5','4lkql9lal9','55kqlalala','5ananalqla','5akmd5j5kl','4lkqd9l6l5','55kqlalal9','5ananalqla',
        '5akmd5j5kl','4lkmd9l6l5','55kqlalal9','59lanalqla','5akmd5j5kl','4lkmd9l6l5','55kql9lal9','59lanalala','5akmclj5al','4lkmd5j6l5',
        '55kql9lal9','59lanalala','5akmclj5al','4lkmd5j6l5','55kql9lal9','59lalalala','5akmclj5al','4lkmd5j6l5','55kql9lal9','59lalalala',
        '5akmclj5al','4lkmd5j6l5','55kql9lal9','59lalalala','5aklclj5al','4lkmd5j5kl','4lkql9l6l9','55kqlalala','5aclclb5al','2lkmd5j5kl',
        '4lkmd9l6l9','55kqlalala','5aclclb5al','2lkmd5j5kl','4lkmd9l6l5','55kql9lal9','5aalclb5al','2lkmd5j5kl','4lkmd5j6l5','55kql9lal9',
        '59alclalal','2lkmclj5al','4lkmd5j6l5','55kql9lal9','59alclalal','2lkmclj5al','4lkmd5j6l5','55kql9lal9','59alalalal','2lkmclj5al',
        '4lkmd5j6l5','55kql9lal9','59alalalal','2lklclj5al','4lkmd5j6l5','55kql9l6l9','59a5alalal','2lklclb5al','4lkmd5j5l5','55kqd9l6l9',
        '59a5alalal','2lklclb5al','4lkmd5j5kl','4lkmd9l6l9','55a5akalal','2lclclb5al','2lkmd5j5kl','4lkmd5l6l5','55a5akalak','2lalclalal',
        '2lkmclj5kl','4lkmd5j6l5','55a5akalak','2kalclalal','2lkmclj5al','4lkmd5j6l5','55a5akalak','2kalalalal','2lkmclj5al','4lkmd5j6l5',
        '55a5akalak','2kalalalal','2lkmclj5al','4lkmd5j6l5','55a5akalak','2kalalalal','2lklclb5al','4lkmd5j6l5','55a5akahak','2ka5alalal',
        '2lklclb5al','4lkmd5j5l5','55a52kahak','2ka5akalal','2lklclb5al','4lkmd5j5kl','4la12kahak','2ga5akalal','2lclclb5al','2lkmclj5kl',
        '4la12g8hak','2ga5akalak','2lalclalal','2lkmclj5kl','4la12g8hag','2ga5akalak','2kalalalal','2lkmclj5al','4la12g8hag','2ga5akalak',
        '2kalalalal','2lkmclj5al','4la12g8hag','2ga5akalak','2kalalalal','2lklclb5al','4la12g8hag','2ga5akalak','2kalalalal','2lklclb5al',
        '4la12g8hag','2ga52kahak','2ka5alalal','2lklclb5al','4la12g8gag','2ga12kahak','2ka5akalal','2lklclb5al','4la1208ga0','20a12g8hak',
        '2ga5akalal','2lalclalal','2la1208ga0','20a12g8hak','2ga5akalal','2lalalalal','2la1208ga0','20a12g8hag','2ga5akalak','2lalalalal',
        '2la1208g00','20a12g8hag','2ga5akalak','2kalalalal','2la1208g00','20a12g8hag','2ga5akalak','2kalalalal','2la0200g00','20a12g8hag',
        '2ga52kahak','2kalalalal','2la0200g00','20a12g8gag','2ga52kahak','2ka5akalal','2la0200g00','20a12g8gag','2ga12gahak','2ka5akalal',
        '2la0200g00','20a1208ga0','2ga12g8hak','2ga5akalal','2l00200000','a1208ga0','20a12g8hak','2ga5akalal','2l00000000','a1208ga0',
        '20a12g8hag','2ga5akalak','2l00000000','a1208g00','20a12g8hag','2ga5akalak','2k00000000','a1200g00','20a12g8hag','2ga5akalak',
        '2kalalalal'
    ];
    // 闰月数据压缩：1位闰月大小+12位平月大小及4位长度闰月月份转2进制，再转32进制
    var monthData = [
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
    // 24节气
    const termMap = ['小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至'];
    // 12生肖
    const animalMap = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
    // 12星座
    const zodiacMap = ['水瓶','双鱼','白羊','金牛','双子','巨蟹','狮子','处女','天秤','天蝎','射手','摩羯'];
    const zodiacDate = [20,19,21,20,21,22,23,23,23,24,23,22];
    // 天干
    const ganMap = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
    // 地支
    const zhiMap = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
    // 月份
    const monthMap = ['正','二','三','四','五','六','七','八','九','十','冬','腊'];
    // 星期
    const weekMap = ['日','一','二','三','四','五','六'];
    // 十位
    const dayMap = ['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'];
    // 公历节日
    const sFestival = {
        '1-1':'元旦',
        '2-14':'情人节',
        '3-8':'妇女节',
        '3-12':'植树节',
        '4-1':'愚人节',
        '5-1':'劳动节',
        '5-4':'青年节',
        '6-1':'儿童节',
        '7-1':'建党节',
        '8-1':'建军节',
        '9-10':'教师节',
        '9-30':'烈士纪念日',
        '10-1':'国庆节',
        '12-13':'国家公祭日',
        '12-24':'平安夜',
        '12-25':'圣诞节',
    };
    // 农历节日
    const lFestival = {
        '1-1':'春节',
        '1-15':'元宵节',
        '2-2':'龙抬头',
        '3-3':'上巳节',
        '5-5':'端午节',
        '7-7':'七夕节',
        '7-15':'中元节',
        '8-15':'中秋节',
        '9-9':'重阳节',
        '10-15':'下元节',
        '12-8':'腊八节',
        '12-23':'北小年',
        '12-24':'南小年',
        '12-30':'除夕'
    };
    // 其他节日
    const oFestival = {
        '5-2-0':'母亲节',
        '6-3-0':'父亲节',
        '11-4-4':'感恩节',
    };

    // 获取指定年份的24节气日期数据
    var getTermDate = function(sYear){
        if(sYear<minYear||sYear>maxYear){
            return false;
        }
        var data = termData[sYear-minYear];
        var num4 = parseInt(data,32).toString(4);
        if(num4.length!=24){
            num4 = '0'+num4;
        }
        return num4.split('').map(function(value,index){
            return +value+termMinDate[index];
        });
    };
    // 获取干支纪年: 1984年为甲子年
    var getGanZhiYear = function(lYear){
        var gzIndex = lYear - 1984;
        gzIndex = gzIndex%60>0?gzIndex%60:gzIndex%60+60;
        var gan = gzIndex%10;
        var zhi = gzIndex%12;
        return ganMap[gan]+zhiMap[zhi];
    };
    // 获取生肖纪年: 1984年为鼠年
    var getAnimalYear = function(lYear){
        var diff = lYear - 1984;
        var animal = diff%12;
        return animalMap[animal>-1?animal:animal+12];
    };
    // 获取农历年闰月
    var getLeapMonth = function(lYear){
        var data =  parseInt(monthData[lYear - minYear],32);
        return data&0xf;
    };
    // 获取农历年长度
    var getLunarYearDays = function(lYear) {
        var offset = 0;
        var data = parseInt(monthData[lYear - minYear],32);
        for (var i = 1<<15; i >= 1<<4; i >>= 1) {
            offset += (data&i)?30:29;
        }
        if(getLeapMonth(lYear)){
            offset += (data&1<<16)?30:29;
        }
        return offset;
    };
    // 获得农历月份天数
    var getLunarMonthDays = function(lYear,lMonth,isLeap){
        var data = parseInt(monthData[lYear - minYear],32);
        var days = data&1<<(16 - lMonth)?30:29;
        if(isLeap&&lMonth==leapMonth){
            days = data&1<<16?30:29;
        }
        return days;
    };
    // 获取偏移天数（参考日期：1900年1月30日）
    var getOffsetByDate = function(lYear,lMonth,lDay,isLeap){
        var offset = 0;
        var data = parseInt(monthData[lYear - minYear],32);
        var leapMonth = getLeapMonth(lYear);
        if(lYear<minYear||lYear>maxYear){
            return -1;
        }
        for(var year=minYear;year<lYear;year++){
            offset += getLunarYearDays(year);
        }
        if(lMonth<1||lMonth>12){
            return -1;
        }
        for(var month=1;month<lMonth||isLeap&&month==lMonth;month++){
            offset += data&1<<(16 - month)?30:29;
        }
        if(isLeap&&lMonth>leapMonth){
            offset += data&1<<16?30:29;
        }
        var days = (isLeap?data&1<<16:1<<(17-lMonth))?30:29;
        if(lDay>days){
            return -1;
        }
        offset += lDay;
        return offset;
    };
    // 获取农历日期（参考日期：1900年1月30日）
    var getDateByOffset = function(offset){
        var lYear = 0, lMonth = 0, lDay = 0, isLeap = false;
        var days;
        if(offset<0){
            return null;
        }
        var count = 0;
        for(var lYear = minYear; lYear<=maxYear; lYear++){
            days = getLunarYearDays(lYear);
            if(count + days>=offset){
                break;
            }
            count+= days;
        }
        var data = parseInt(monthData[lYear - minYear],32);
        var leapMonth = getLeapMonth(lYear);
        offset -= count;
        count = 0;
        for(var lMonth=1;lMonth<=12;lMonth++){
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
    };
    var getDateStr = function(month,day){
        return month.toString().padStart(2,'0')+day.toString().padStart(2,'0');
    };
    var getDateInfo = function(timestamp){
        var now = new Date(timestamp);
        var date = now.getDate();
        var week = now.getDay();
        var index = Math.ceil(date/7);
        var offset = Math.round((timestamp - Date.UTC(1900, 0, 30, 0, 0, 0))/86400000);
        var result = {
            'sYear':now.getFullYear(),
            'sMonth':now.getMonth()+1,
            'sDay':now.getDate(),
            'week':week,
            'weekZH':'星期'+weekMap[week],
        };
        var zoIndex = 11;
        zodiacDate.forEach(function(day,index){
            var month = index+1;
            if(getDateStr(result['sMonth'],result['sDay'])>=getDateStr(month,day)){
                zoIndex = index%12;
            }
        });
        result['zodiac'] =  zodiacMap[zoIndex]+'座';
        var festivals = [];
        if(sFestival[result['sMonth']+'-'+result['sDay']]){
            festivals.push(sFestival[result['sMonth']+'-'+result['sDay']]);
        }
        if(oFestival[result['sMonth']+'-'+index+'-'+week]){
            festivals.push(oFestival[result['sMonth']+'-'+index+'-'+week]);
        }
        if(offset>-1){
            var termDate = getTermDate(result['sYear']);
            // 干支日
            var gzIndex = offset+39;
            gzIndex = gzIndex%60>0?gzIndex%60:gzIndex%60+60;
            var gan = gzIndex%10;
            var zhi = gzIndex%12;
            result['gzDayZH'] = ganMap[gan]+zhiMap[zhi];
            // 干支月
            gzIndex = 0;
            termDate.push('31');
            termDate.forEach(function(day,index){
                var month = Math.floor(index/2)+1;
                if(result['sMonth']==month&&result['sDay']==day){
                    result['term'] = termMap[index];
                }else{
                    result['term'] = "";
                }
                if(getDateStr(month,day)>=getDateStr(result['sMonth'],result['sDay'])){
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
            var leapMonth = getLeapMonth(result['lYear']);
            result['lMonthZH'] = (result['lMonth']==leapMonth&&result['isLeap']?'闰':'')+monthMap[result['lMonth']-1]+'月';
            result['lDayZH'] = dayMap[result['lDay']-1];
            if(result['lMonth']==12&&result['lDay']==getLunarMonthDays(result['lYear'],12)){
                festivals.push(lFestival['12-30']);
            }else if(lFestival[result['lMonth']+'-'+result['lDay']]){
                festivals.push(lFestival[result['lMonth']+'-'+result['lDay']]);
            }

        }
        result['festival'] = festivals.join(' ');
        return result;
    };

    return {
        Solar:function(sYear,sMonth,sDay){
            var time = Date.UTC(sYear, sMonth-1, sDay, 0, 0, 0);
            return time?getDateInfo(time):null;
        },
        Lunar:function(lYear,lMonth,lDay,isLeap){
            var startTime = Date.UTC(minYear, minMonth-1, minDay, 0, 0, 0);
            var offset = getOffsetByDate(lYear,lMonth,lDay,isLeap);
            var time = startTime+offset*86400000;
            return offset>-1?getDateInfo(time):null;
        }
    };
}));

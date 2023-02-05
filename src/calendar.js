import {getDateInfo,getLeapMonth,getOffsetByDate} from './module/method';

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
        let offset = getOffsetByDate(lYear,lMonth,lDay,isLeap);
        let time = startTime+offset*86400000;
        return offset>-1?getDateInfo(time):null;
    },
    getToday:function(){
        let time = (new Date()).getTime();
        return getDateInfo(time);
    }
};

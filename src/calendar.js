import {getDateInfo} from './module/date';
import {getTimestampBySolar} from './module/solar';
import {getTimestampByLunar} from './module/lunar';

export default {
    Solar:function(sYear,sMonth,sDay){
        let timestamp = getTimestampBySolar(sYear,sMonth,sDay);
        return timestamp?getDateInfo(timestamp):null;
    },
    Lunar:function(lYear,lMonth,lDay,isLeap){
        let timestamp = getTimestampByLunar(lYear,lMonth,lDay,isLeap);
        return timestamp?getDateInfo(timestamp):null;
    },
    getToday:function(){
        let timestamp = (new Date()).getTime();
        return getDateInfo(timestamp);
    }
};

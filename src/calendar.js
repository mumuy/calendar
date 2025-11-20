import {getDateInfo} from './module/date.js';
import {getTimestampBySolar} from './module/solar.js';
import {getTimestampByLunar} from './module/lunar.js';

export default {
    getDateBySolar:function(sYear,sMonth,sDay){
        let timestamp = getTimestampBySolar(sYear,sMonth,sDay);
        return timestamp?getDateInfo(timestamp):null;
    },
    getDateByLunar:function(lYear,lMonth,lDay,isLeap){
        let timestamp = getTimestampByLunar(lYear,lMonth,lDay,isLeap);
        return timestamp?getDateInfo(timestamp):null;
    },
    getDateByTimestamp:function(timestamp){
        return getDateInfo(timestamp);
    },
    getToday:function(){
        return getDateInfo(Date.now());
    }
};

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
    getToday:function(){
        let timestamp = Date.now();
        return getDateInfo(timestamp);
    }
};

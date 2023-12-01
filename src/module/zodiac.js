import {getDateString} from './tool.js';

const zodiacMap = ['水瓶','双鱼','白羊','金牛','双子','巨蟹','狮子','处女','天秤','天蝎','射手','摩羯'];
const zodiacDate = [20,19,21,20,21,22,23,23,23,24,23,22];

// 获取星座
export function getZodiac(sMonth,sDay){
    let zoIndex = 11;
    zodiacDate.forEach(function(day,index){
        let month = index+1;
        if(getDateString(sMonth,sDay)>=getDateString(month,day)){
            zoIndex = index%12;
        }
    });
    return zodiacMap[zoIndex]+'座';
}

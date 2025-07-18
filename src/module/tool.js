// 格式化日期字符串
export function getDateString(...param){
    return param.map(value=>(''+value).padStart(2,'0')).join('-');
}

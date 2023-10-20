// 格式化日期字符串
export function getDateString(...param){
    return Array.from(param).map(function(value){
        return (''+value).padStart(2,'0');
    }).join('-');
}

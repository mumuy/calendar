// 格式化日期字符串
export function getDateString(){
    return Array.from(arguments).map(function(value){
        return (''+value).padStart(2,'0');
    }).join('-');
}

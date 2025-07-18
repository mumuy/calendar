// 12生肖
const animalMap = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];

// 获取生肖纪年: 1984年为鼠年
export function getAnimalYear(lYear){
    const diff = lYear - 1984;
    const animal = diff%12;
    return animalMap[animal>-1?animal:animal+12];
}

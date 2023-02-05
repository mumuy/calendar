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
    '01-01':'元旦',
    '02-14':'情人节',
    '03-08':'妇女节',
    '03-12':'植树节',
    '04-01':'愚人节',
    '05-01':'劳动节',
    '05-04':'青年节',
    '06-01':'儿童节',
    '07-01':'建党节',
    '08-01':'建军节',
    '09-10':'教师节',
    '09-30':'烈士纪念日',
    '10-01':'国庆节',
    '12-13':'国家公祭日',
    '12-24':'平安夜',
    '12-25':'圣诞节',
};
// 农历节日
const lFestival = {
    '01-01':'春节',
    '01-15':'元宵节',
    '02-02':'龙抬头',
    '03-03':'上巳节',
    '05-05':'端午节',
    '07-07':'七夕节',
    '07-15':'中元节',
    '08-15':'中秋节',
    '09-09':'重阳节',
    '10-15':'下元节',
    '12-08':'腊八节',
    '12-23':'北小年',
    '12-24':'南小年',
    '12-30':'除夕'
};
// 其他节日
const oFestival = {
    '05-02-00':'母亲节',
    '06-03-00':'父亲节',
    '11-04-04':'感恩节',
};

export {
    termMinDate,
    termData,
    monthData,
    termMap,
    animalMap,
    zodiacMap,
    zodiacDate,
    ganMap,
    zhiMap,
    monthMap,
    weekMap,
    dayMap,
    sFestival,
    lFestival,
    oFestival
}

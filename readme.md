# 中国农历公历换算算法

## 方法调用

```js
// 农历日期: 2022年(大致)闰四月初十
calendar.Lunar(2022,4,10,true);

// 公历日期：2022年10月1日
calendar.Solar(2022,10,1);
```

## 返回结果

```js
{
    "sYear":2022,
    "sMonth":10,
    "sDay":1,
    "lYear":2022,
    "lMonth":9,
    "lDay":6,
    "isLeap":false,
    "lMonthZH":"九月",
    "lDayZH":"初六",
    "gzYearZH":"壬寅",
    "gzMonthZH":"己酉",
    "gzDayZH":"丁亥",
    "week":6,
    "weekZH":"星期六",
    "animal":"虎",
    "term":"",
    "zodiac":"天秤座",
    "festival":"国庆节"
}
```

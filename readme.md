# 中国农历公历换算算法

## 参考标准

算法根据《中华人民共和国国家标准GB/T33661—2017〈农历的编算和颁行〉》标准开发，明确了干支纪年和生肖纪年起于正月初一0点，与农历新年同步。

## 网页组件
```html
<widget-calendar date="2023-01-01"></widget-calendar>
```

```html
<widget-calendar>
    <div slot="item">
        <p>双鱼座</p>
    </div>    
</widget-calendar>
```

#### 自定义事件-选中日期: onSelect

```js
document.querySelector('widget-calendar').addEventListener('onSelect',function(event){
}
```

#### 自定义事件-切换日期: onChange

```js
document.querySelector('widget-calendar').addEventListener('onChange',function(event){
}
```

#### 自定义事件-初始化: onInit

```js
document.querySelector('widget-calendar').addEventListener('onInit',function(event){
}
```

## 方法调用

```js
// 农历日期: 2023年闰二月初十
calendar.getDateByLunar(2023,2,10,true);

// 公历日期：2022年10月1日
calendar.getDateBySolar(2022,10,1);

// 今天
calendar.getToday();
```

## 返回结果

```js
{
    "date":'2022-10-01',
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

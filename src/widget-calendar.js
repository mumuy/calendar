/*
*   万年历组件
*/
import {holidayMap,scheduleMap} from './module/data/holiday';
import {getDateString} from './module/tool';
import {getSolarMonthDays} from './module/solar';
import {sFestival,lFestival,oFestival,tFestival} from './module/festival';
import calendar from './calendar';

class WidgetCalendar extends HTMLElement {
    constructor() {
        super();

        // 全局变量
        let _ = this;
        _.today = calendar.getToday();
        _.currentDateInfo = _.today;
        _.currentMonthData = [];    // 当前日期所在月份数据
        _.currentMonthDay = 1;     // 当前日期当月几号
    }
    static get observedAttributes(){
        return ['date','mode'];
    }
    get date(){
        let today_date = getDateString(this.today['sYear'],this.today['sMonth'],this.today['sDay']);
        return this.getAttribute('date')||today_date;
    }
    set date(date){
        this.setAttribute('date',date);
    }
    get mode(){
        return this.getAttribute('mode')||'default';
    }
    attributeChangedCallback(name, oldValue, newValue){
    }
    connectedCallback () {
        let _ = this;
        // 模板
        _.attachShadow({mode:'open'});
        _.render();
        _.addStyle();
        // 节点
        _.$module = _.shadowRoot.querySelector('.mod-calendar');
        _.$tbody = _.$module.querySelector('tbody');
        _.$year = _.$module.querySelector('.year');
        _.$month = _.$module.querySelector('.month');
        _.$holiday = _.$module.querySelector('.holiday');
        _.$goback = _.$module.querySelector('.goback');
        _.$prev_year = _.$module.querySelector('.prev-year');
        _.$next_year = _.$module.querySelector('.next-year');
        _.$prev_month = _.$module.querySelector('.prev-month');
        _.$next_month = _.$module.querySelector('.next-month');
        _.$info = _.$module.querySelector('.info');

        _.$year.onchange = function(){
            let year = _.$year.value;
            let month = _.$month.value;
            _.formatTable({'year':year,'month':month,'day':_.currentMonthDay});
            _.formatSetting(year);
        };
        _.$month.onchange = function(){
            let year = _.$year.value;
            let month = _.$month.value;
            _.formatTable({'year':year,'month':month,'day':_.currentMonthDay});
        };
        _.$holiday.onchange = function(){
            let value = _.$holiday.value;
            if(value){
                let [year,month,day] = value.split('-');
                _.formatTable({'year':year,'month':month,'day':day});
            }
        };
        _.$goback.onclick = function(){
            _.formatTable();
            _.formatSetting();
        };
        _.$prev_year.onclick = function(){
            let year = _.$year.value;
            let month = _.$month.value;
            year--;
            _.formatTable({'year':year,'month':month,'day':_.currentMonthDay});
            _.formatSetting(year);
        };
        _.$next_year.onclick = function(){
            let year = _.$year.value;
            let month = _.$month.value;
            year++;
            _.formatTable({'year':year,'month':month,'day':_.currentMonthDay});
            _.formatSetting(year);
        };
        _.$prev_month.onclick = function(){
            let year = _.$year.value;
            let month = _.$month.value;
            month--;
            _.formatTable({'year':year,'month':month,'day':_.currentMonthDay});
            if(month==0){
                _.formatSetting(--year);
            }
        };
        _.$next_month.onclick = function(){
            let year = _.$year.value;
            let month = _.$month.value;
            month++;
            _.formatTable({'year':year,'month':month,'day':_.currentMonthDay});
            if(month==13){
                _.formatSetting(++year);
            }
        };
        _.$tbody.onclick = function(event){
            event = event || window.event;
            let target = event.target || event.srcElement;
            while(target.tagName!='TD'&&target.tagName!='TABLE'){
                target = target.parentNode;
            }
            let id = target.getAttribute('data-id');
            if(target.tagName=='TD'&&id){
                let data = _.currentMonthData[id];
                _.currentMonthDay = data['sDay'];
                let that_date = getDateString(data['sYear'],data['sMonth'],data['sDay']);
                if(that_date!=_.date){
                    _.date = that_date;
                    _.formatDate(_.date);
                }
                _.dispatchEvent(new CustomEvent('onSelect',{'detail':calendar.getDateBySolar(data['sYear'],data['sMonth'],data['sDay'])}));
            }
        };
        this.formatDate(_.date);
        setTimeout(function(){
            _.dispatchEvent(new CustomEvent('onInit',{'detail':_.currentDateInfo}));
        },1);
    }
    render(){
        this.shadowRoot.innerHTML = `<div class="mod-calendar mode-${this.mode}">
            <div class="info"></div>
            <div class="box">
                <div class="selector">
                    <span>
                        <a class="prev prev-year" href="javascript:;">&lt;</a>
                        <select class="year">
                            `+(function(){
                                let list = [];
                                for(let i=1900;i<=2100;i++){
                                    list.push('<option value="'+i+'">'+i+'年</option>');
                                }
                                return list.join('');
                            })()+`
                        </select>
                        <a class="next next-year" href="javascript:;">&gt;</a>
                    </span>
                    <span>
                        <a class="prev prev-month" href="javascript:;">&lt;</a>
                        <select class="month">
                            `+(function(){
                                let list = [];
                                for(let i=1;i<=12;i++){
                                    list.push('<option value="'+i+'">'+i+'月</option>');
                                }
                                return list.join('');
                            })()+`
                        </select>
                        <a class="next next-month" href="javascript:;">&gt;</a>
                    </span>
                    <span>
                        <select class="holiday">
                            <option value="">假日安排</option>
                        </select>
                    </span>
                    <span>
                        <a class="goback" href="javascript:;">返回今天</a>
                    </span>
                </div>
                <div class="table">
                    <table>
                        <thead>
                            <tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;
    }
    addStyle(){
        const $style = document.createElement('style');
        $style.textContent = `
            :host {
                display: inline-block;
                width: 100%;
                min-width: 300px;
                max-width: 600px;
                vertical-align: bottom;
                white-space: initial;
                font-family: Arial,Helvetica,"Microsoft Yahei";
                color: #333;
                container-type: inline-size;
                --primary-color: #2095f2;
                --secondary-color: #ffaa00;
                --base-size: clamp(0.8px,calc(100cqw / 600),1px);
                --base-size-mobile: clamp(0.8px,calc(100cqw / 480),1px);
            }
            *{
                padding:0;
                margin:0;
            }
            a{
                text-decoration: none;
                color:#333;
            }
            .mod-calendar {
                display: flex;
                flex-direction: row-reverse;
                padding: calc(var(--base-size) * 2);
                background: var(--primary-color);
                font-size: calc(var(--base-size) * 14);
            }
            .mod-calendar .info {
                position: relative;
                width: calc(var(--base-size) * 180);
                padding-top: calc(var(--base-size) * 15);
                text-align: center;
                color: #fff;
            }
            .mod-calendar .info a{
                color: #fff;
            }
            .mod-calendar .info p {
                line-height: calc(var(--base-size) * 20);
            }
            .mod-calendar .info .day {
                width: calc(var(--base-size) * 80);
                height: calc(var(--base-size) * 80);
                margin: calc(var(--base-size) * 15) auto;
                line-height: calc(var(--base-size) * 80);
                font-size: calc(var(--base-size) * 48);
                background: var(--secondary-color);
                color: #fff;
                border-radius: calc(var(--base-size) * 8);
            }
            .mod-calendar .info .detail{
                margin-bottom: calc(var(--base-size) * 15);
            }
            .mod-calendar .info .list{
                padding: calc(var(--base-size) * 10) 0;
                border-top: calc(var(--base-size) * 1) dotted rgba(255,255,255,0.5);
            }
            .mod-calendar .info .list .item{
                padding: calc(var(--base-size) * 5) 0;
            }
            .mod-calendar .info .list .item a{
                color: #fff;
            }
            .mod-calendar .info .list ::slotted([slot="item"]) {
                padding: calc(var(--base-size) * 5) 0!important;
            }
            .mod-calendar .box {
                flex: 1;
            }
            .mod-calendar .selector {
                position: relative;
                padding: calc(var(--base-size) * 4) calc(var(--base-size) * 6);
                background: #fff;
                vertical-align: middle;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
            }
            .mod-calendar .selector span {
                display: inline-block;
                vertical-align: middle;
                background: #fff;
                margin: 0 calc(var(--base-size) * 1);
            }
            .mod-calendar .selector a {
                float: left;
                position: relative;
                height: calc(var(--base-size) * 24);
                padding: 0 calc(var(--base-size) * 5);
                border: calc(var(--base-size) * 1) solid #ebebeb;
                background: #fafafa;
                line-height: calc(var(--base-size) * 24);
                vertical-align: middle;
            }
            .mod-calendar .selector a:hover {
                border-color: var(--secondary-color);
                color: var(--secondary-color);
            }
            .mod-calendar .selector select {
                float: left;
                min-width: calc(var(--base-size) * 60);
                height: calc(var(--base-size) * 26);
                padding-left: calc(var(--base-size) * 4);
                border: calc(var(--base-size) * 1) solid #ebebeb;
                margin: 0 calc(var(--base-size) * -1);
                background: #fff;
                line-height: calc(var(--base-size) * 24);
                vertical-align: middle;
                font-size: calc(var(--base-size) * 14);
                color: #333;
                outline: none;
            }
            .mod-calendar .selector button {
                height: calc(var(--base-size) * 26);
                border: calc(var(--base-size) * 1) solid #ebebeb;
                line-height: calc(var(--base-size) * 24);
                background: #fafafa;
            }
            .mod-calendar table {
                width: 100%;
                table-layout: fixed;
                background: #fff;
                color: #666;
                border-collapse: collapse;
                border-spacing: 0;
            }
            .mod-calendar table tr {
                border-top: calc(var(--base-size) * 1) solid #ebebeb;
            }
            .mod-calendar table th,.mod-calendar table td {
                position: relative;
                border: calc(var(--base-size) * 1) solid #ebebeb;
                text-align: center;
            }
            .mod-calendar table th {
                line-height: calc(var(--base-size) * 30);
                font-weight: normal;
            }
            .mod-calendar table td {
                position: relative;
                line-height: calc(var(--base-size) * 20);
            }
            .mod-calendar table thead {
                background: #f8f8f8;
            }
            .mod-calendar table tbody a {
                display: block;
                position: relative;
                margin: 0 auto;
                padding: calc(var(--base-size) * 6) 0;
                border: calc(var(--base-size) * 1) solid transparent;
                line-height: calc(var(--base-size) * 20);
                cursor: pointer;
            }
            .mod-calendar table tbody a:hover {
                border: calc(var(--base-size) * 1) solid #cccccc;
            }
            .mod-calendar table tbody span {
                display: block;
            }
            .mod-calendar table tbody i {
                position: absolute;
                left: calc(var(--base-size) * 2);
                top: 0;
                line-height: calc(var(--base-size) * 20);
                font-style: normal;
                color: #fff;
            }
            .mod-calendar table .s1 {
                font-size: calc(var(--base-size) * 18);
                color: #212121;
            }
            .mod-calendar table .s2 {
                font-size: calc(var(--base-size) * 13);
                color: #757575;
            }
            .mod-calendar table td.active a {
                border: calc(var(--base-size) * 1) solid var(--secondary-color);
            }
            .mod-calendar table td.holiday a {
                background: #f1f9f1
            }
            .mod-calendar table td.holiday.active a,.mod-calendar table td.holiday a:hover{
                border: calc(var(--base-size) * 1) solid #4bae4f;
            }
            .mod-calendar table td.holiday i {
                color: #4bae4f;
            }
            .mod-calendar table td.today{
                background: var(--secondary-color);
            }
            .mod-calendar table td.today a{
                border: calc(var(--base-size) * 1) solid var(--secondary-color);
            }
            .mod-calendar table td.today .s1{
                color: #fff;
            }
            .mod-calendar table td.today .s2{
                color: rgba(255,255,255,0.8);
            }
            .mod-calendar table td.work a {
                background: #fef0ef;
            }
            .mod-calendar table td.work.active a,.mod-calendar table td.work a:hover{
                border: calc(var(--base-size) * 1) solid #f44336;
            }
            .mod-calendar table td.work i {
                color: #f44336;
            }
            .mod-calendar table td.disabled a {
                opacity: 0.4;
            }
            .mode-simple .info{
                display: none;
            }
            .mode-simple .selector{
                background: none;
                text-align: center;
            }
            @container (max-width: 480px){
                .mod-calendar{
                    flex-direction: column;
                    font-size: calc(var(--base-size-mobile) * 12);
                }
                .mod-calendar .info{
                    width: auto;
                    padding-top: calc(var(--base-size-mobile) * 10);
                    padding-left: calc(var(--base-size-mobile) * 10);
                    overflow:hidden;
                }
                .mod-calendar .info p{
                    text-align: left;
                    line-height: calc(var(--base-size-mobile) * 18);
                }
                .mod-calendar .info .day{
                    float: left;
                    width: calc(var(--base-size-mobile) * 56);
                    height: calc(var(--base-size-mobile) * 56);
                    margin: calc(var(--base-size-mobile) * 6) 0;
                    line-height: calc(var(--base-size-mobile) * 56);
                    font-size: calc(var(--base-size-mobile) * 24);
                }
                .mod-calendar .info .detail{
                    padding-top: calc(var(--base-size-mobile) * 5);
                    margin-left: calc(var(--base-size-mobile) * 70);
                    margin-bottom: calc(var(--base-size-mobile) * 10);
                }
                .mod-calendar .info .list{
                    position: absolute;
                    top: calc(var(--base-size-mobile) * 10);
                    right: calc(var(--base-size-mobile) * 10);
                    padding:0;
                    border-top: none;
                    text-aign: right;
                }
                .mod-calendar .info .list .item{
                    padding: calc(var(--base-size-mobile) * 2) 0;
                }
                .mod-calendar .info .list ::slotted([slot="item"]) {
                    padding: calc(var(--base-size-mobile) * 2) 0!important;
                }
                .mod-calendar .selector span{
                    position: relative;
                    width: 32%;
                    border: calc(var(--base-size-mobile) * 1); solid #ebebeb;
                    margin: 0;
                    text-align: center;
                    box-sizing: border-box;
                }
                .mod-calendar .selector span:has(.goback){
                    display: none;
                }
                .mod-calendar .selector span:last-child{
                    display: none;
                }
                .mod-calendar .selector select{
                    float: none;
                    border-color: transparent;
                    padding-left:0;
                }
                .mod-calendar .selector a{
                    position: absolute;
                    top:0;
                    background: none;
                    border-color: transparent;
                }
                .mod-calendar .selector .prev{
                    left: 0;
                    border-right-color: transparent;
                }
                .mod-calendar .selector .next{
                    right: 0;
                    margin-right: 0;
                    border-left-color: transparent;
                }
                .mod-calendar .selector .goback{
                    position: absolute;
                    top: calc(var(--base-size-mobile) * 75);
                    right: calc(var(--base-size-mobile) * 10);
                    height: calc(var(--base-size-mobile) * 20);
                    background: #ffbb00;
                    line-height: calc(var(--base-size-mobile) * 20);
                    font-size: calc(var(--base-size-mobile) * 14);
                    color: #fff;
                    border-radius: calc(var(--base-size-mobile) * 3);
                }
                .mod-calendar .selector .goback:hover{
                    border-color:#ffbb00;
                    color: #fff;
                }
                .mod-calendar table tbody a{
                    width: auto;
                    line-height: calc(var(--base-size-mobile) * 18);
                }
                .mod-calendar table tr{
                    border-top: none;
                }
                .mod-calendar table th, .mod-calendar table td{
                    position: relative;
                }
                .mod-calendar table td{
                    height: calc(var(--base-size-mobile) * 48);
                    line-height: calc(var(--base-size-mobile) * 16);
                }
                .mod-calendar table .s2{
                    font-size: calc(var(--base-size-mobile) * 12);
                }
            }
        `;
        this.shadowRoot.appendChild($style);
    }
    formatTable(param){
        let _ = this;
        let thatDay = _.today;
        if(param){
            thatDay = calendar.getDateBySolar(+param['year'],+param['month'],+param['day']);
        }
        let that_date = getDateString(thatDay['sYear'],thatDay['sMonth'],thatDay['sDay']);
        //获取日历信息
        let firstDay = calendar.getDateBySolar(thatDay['sYear'],thatDay['sMonth'],1);
        let monthDays = getSolarMonthDays(thatDay['sYear'],thatDay['sMonth']);
        _.currentMonthData = [];
        // 上月日期
        for(let i=firstDay['week'];i>0;i--){
            let obj = calendar.getDateBySolar(firstDay['sYear'],firstDay['sMonth'],firstDay['sDay']-i);
            _.currentMonthData.push(obj);
        }
        // 当月日期
        for(let i=0;i<monthDays;i++){
            let obj = calendar.getDateBySolar(firstDay['sYear'],firstDay['sMonth'],firstDay['sDay']+i);
            _.currentMonthData.push(obj);
        }
        // 下月日期
        let lastDay = _.currentMonthData.at(-1);
        for(let i=1;lastDay['week']+i<7;i++){
            let obj = calendar.getDateBySolar(lastDay['sYear'],lastDay['sMonth'],lastDay['sDay']+i);
            _.currentMonthData.push(obj);
        }
        // 是否增加一行
        if(_.currentMonthData.length<=35){
            let lastDay = _.currentMonthData.at(-1);
            for(let i=1;_.currentMonthData.length<42;i++){
                let obj = calendar.getDateBySolar(lastDay['sYear'],lastDay['sMonth'],lastDay['sDay']+i);
                _.currentMonthData.push(obj);
            }
        }

        // 格式化结构
        let map = {
            'work':'班',
            'holiday':'休'
        };
        let html = '<tr>';
        for(let i=0,len=_.currentMonthData.length;i<len;i++){
            let item = _.currentMonthData[i];
            let item_date = getDateString(item['sYear'],item['sMonth'],item['sDay']);
            let classnameList = [];
            if(item_date==that_date){
                classnameList.push('active');
            }
            if(item['sYear']!=thatDay['sYear']||item['sMonth']!=thatDay['sMonth']){
                classnameList.push('disabled');
            }
            if(item['date']==_.today['date']){
                classnameList.push('today');
            }
            let sign = '';
            if(scheduleMap[item['sYear']]){
                let holiday = scheduleMap[item['sYear']];
                let dateStr = getDateString(item['sMonth'],item['sDay']);
                if(typeof holiday[dateStr] != 'undefined'){
                    sign = holiday[dateStr]?'holiday':'work';
                    classnameList.push(sign);
                }
            }
            let festivals = item['festival'].split(' ').filter(function(value){
                if(value.length<=3){
                    return Object.values(sFestival).includes(value)||Object.values(lFestival).includes(value)||Object.values(oFestival).includes(value)||Object.values(tFestival).includes(value);
                }
            });
            let festival = festivals.length?festivals[0]:'';
            html += `<td class="`+classnameList.join(' ')+`" data-id="`+i+`">
                <a href="javascript:;">
                    <span class="s1">`+item['sDay']+`</span>
                    <span class="s2">`+(item['term']||festival||item['lDayZH'])+`</span>
                    `+(sign&&map[sign]?'<i>'+map[sign]+'</i>':'')+`
                </a>
            </td>`;
            if(i%7==6&&i<len-1){
                html+='</tr><tr>';
            }
        }
        html+='</tr>';
        _.$year.value = thatDay['sYear'];
        _.$month.value = thatDay['sMonth'];
        _.$info.innerHTML = `<p>${that_date} ${thatDay['weekZH']}</p>
            <div class="day">${thatDay['sDay']}</div>
            <div class="detail">
                <p>${thatDay['lMonthZH']}${thatDay['lDayZH']}</p>
                <p>${thatDay['gzYearZH']}年 【${thatDay['animal']}年】</p>
                <p>${thatDay['gzMonthZH']}月 ${thatDay['gzDayZH']}日</p>
            </div>
            <div class="list">
                <slot name="item"></slot>
                <div class="item">${thatDay['festival'].trim().split(' ').map(value=>`<p>${value}</p>`).join('')}</div>
            </div>
        `;
        _.$tbody.innerHTML = html;

        _.currentDateInfo = thatDay;
        _.dispatchEvent(new CustomEvent('onChange',{'detail':thatDay}));
    }
    formatSetting(year){
        let _ = this;
        year = year||(new Date()).getFullYear();
        _.$holiday.innerHTML = '';
        let $o = new Option("假日安排","");
        _.$holiday.add($o);
        if(holidayMap[year]){
            let items = holidayMap[year];
            for(let i=0;i<items.length;i++){
                let $option = new Option(items[i]['name'],items[i]['value']);
                _.$holiday.add($option);
            }
        }else{
            const list = ['元旦','春节','清明','劳动节','端午节','中秋节','国庆节'];
            for(let m=1;m<=12;m++){
                for(let d=1;d<=31;d++){
                    let date = calendar.getDateBySolar(year,m,d);
                    if(date['sMonth']==m&&date['sDay']==d){
                        let types = [];
                        if(date['term']){
                            types.push(date['Term']);
                        }
                        if(date['festival']){
                            types = [].concat(types,date['festival'].split(' '));
                        }
                        types.forEach(function(type){
                            if(list.indexOf(type)>-1){
                                let $option = new Option(type,date['sYear']+'-'+date['sMonth']+'-'+date['sDay']);
                                _.$holiday.add($option);
                            }
                        });
                    }
                }
            }
        }
    }
    formatDate(date){
        let _ = this;
        _.date = date;
        if(_.date){
            let [year,month,day] = _.date.split('-');
            _.formatTable({'year':year,'month':month,'day':day});
            _.formatSetting(year);
        }else{
            _.formatTable();
            _.formatSetting();
        }
    }
}

if(!customElements.get('widget-calendar')){
    customElements.define('widget-calendar', WidgetCalendar);
}

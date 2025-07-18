/*
*   万年历组件
*/
import {minYear,maxYear} from './module/config/base.js';
import {holidayMap,scheduleMap} from './module/config/holiday.js';
import {getDateString} from './module/tool.js';
import {getTimestampBySolar,getSolarByTimestamp,getSolarMonthDays} from './module/solar.js';
import {sFestival,lFestival,oFestival,tFestival} from './module/festival.js';
import calendar from './calendar.js';

import styleSheet from './style/widget.css' with { type: 'css'};

class WidgetCalendar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        // 全局变量
        let _ = this;
        _.today = calendar.getToday();
        _.currentDateInfo = _.today;
        _.currentMonthData = [];    // 当前日期所在月份数据
        _.currentMonthDay = 1;      // 当前日期当月几号
    }
    static get observedAttributes(){
        return ['date','mode'];
    }
    get date(){
        let today_date = getDateString(this.today['sYear'],this.today['sMonth'],this.today['sDay']);
        return this.getAttribute('date')||today_date;
    }
    set date(value){
        this.setAttribute('date',value);
    }
    get mode(){
        return this.getAttribute('mode')||'default';
    }
    set mode(value){
        this.setAttribute('mode',value);
    }
    attributeChangedCallback(name, oldValue, newValue){
        if(name=='date'&&oldValue!=newValue){
            this.formatDate(newValue);
        }
    }
    connectedCallback () {
        let _ = this;
        // 模板
        if(_.shadowRoot.adoptedStyleSheets){
            _.shadowRoot.adoptedStyleSheets = [styleSheet];
        }else{
            const $style = document.createElement('style');
            $style.rel = 'stylesheet';
            $style.textContent = [...styleSheet.cssRules].map(item=>item.cssText).join('');
            _.shadowRoot.appendChild($style);
        }
        _.render();
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

        let changeDate = function(year,month,day){
            day = Math.min(getSolarMonthDays(year,month),day);
            _.currentMonthDay = day;
            let timestamp = getTimestampBySolar(year,month,day);
            let thatDay = getSolarByTimestamp(timestamp);
            if(thatDay.date!=_.date){
                _.date = thatDay.date;
            }
        };

        _.$year.onchange = function(){
            let year = _.$year.value||_.$year.getAttribute('data-value');
            let month = _.$month.value||_.$month.getAttribute('data-value');
            changeDate(year,month,_.currentMonthDay);
        };
        _.$month.onchange = function(){
            let year = _.$year.value||_.$year.getAttribute('data-value');
            let month = _.$month.value||_.$month.getAttribute('data-value');
            changeDate(year,month,_.currentMonthDay);
        };
        _.$holiday.onchange = function(){
            let value = _.$holiday.value;
            if(value){
                let [year,month,day] = value.split('-');
                changeDate(year,month,day);
            }
        };
        _.$goback.onclick = function(){
            if(_.today.date!=_.date){
                _.date = _.today.date;
            }
        };
        _.$prev_year.onclick = function(){
            let year = _.$year.value||_.$year.getAttribute('data-value');
            let month = _.$month.value||_.$month.getAttribute('data-value');
            year--;
            changeDate(year,month,_.currentMonthDay);
        };
        _.$next_year.onclick = function(){
            let year = _.$year.value||_.$year.getAttribute('data-value');
            let month = _.$month.value||_.$month.getAttribute('data-value');
            year++;
            changeDate(year,month,_.currentMonthDay);
        };
        _.$prev_month.onclick = function(){
            let year = _.$year.value||_.$year.getAttribute('data-value');
            let month = _.$month.value||_.$month.getAttribute('data-value');
            month--;
            changeDate(year,month,_.currentMonthDay);
        };
        _.$next_month.onclick = function(){
            let year = _.$year.value||_.$year.getAttribute('data-value');
            let month = _.$month.value||_.$month.getAttribute('data-value');
            month++;
            changeDate(year,month,_.currentMonthDay);
        };
        _.$tbody.onclick = function(event){
            let target = event.target;
            while(target.tagName!='TD'&&target.tagName!='TABLE'){
                target = target.parentNode;
            }
            let id = target.getAttribute('data-id');
            if(target.tagName=='TD'&&id){
                let thatDay = _.currentMonthData[id];
                _.currentMonthDay = thatDay['sDay'];
                changeDate(thatDay['sYear'],thatDay['sMonth'],thatDay['sDay']);
                _.dispatchEvent(new CustomEvent('onSelect',{'detail':calendar.getDateBySolar(thatDay['sYear'],thatDay['sMonth'],thatDay['sDay'])}));
            }
        };
        _.formatDate(_.date);
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
                            ${(function(){
                                let list = [];
                                for(let i=minYear;i<=maxYear;i++){
                                    list.push('<option value="'+i+'">'+i+'年</option>');
                                }
                                return list.join('');
                            })()}
                        </select>
                        <a class="next next-year" href="javascript:;">&gt;</a>
                    </span>
                    <span>
                        <a class="prev prev-month" href="javascript:;">&lt;</a>
                        <select class="month">
                            ${(function(){
                                let list = [];
                                for(let i=1;i<=12;i++){
                                    list.push('<option value="'+i+'">'+i+'月</option>');
                                }
                                return list.join('');
                            })()}
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
        let lastDay = _.currentMonthData[_.currentMonthData.length-1];
        for(let i=1;lastDay['week']+i<7;i++){
            let obj = calendar.getDateBySolar(lastDay['sYear'],lastDay['sMonth'],lastDay['sDay']+i);
            _.currentMonthData.push(obj);
        }
        // 是否增加一行
        if(_.currentMonthData.length<=35){
            let lastDay = _.currentMonthData[_.currentMonthData.length-1];
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
            if(item['date']==_.today.date){
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
            let lunar_festival = item['festival'].split(' ').find(function(value){
                if(value.length<=3){
                    return Object.values(lFestival).flat().map(item=>item.name).includes(value);
                }
                return false;
            });
            let other_festival = item['festival'].split(' ').find(function(value){
                if(value.length<=3){
                    return Object.values(sFestival).flat().map(item=>item.name).includes(value)
                    ||Object.values(oFestival).flat().map(item=>item.name).includes(value)
                    ||tFestival.includes(value);
                }
                return false;
            });
            html += `<td class="${classnameList.join(' ')}" data-id="`+i+`">
                <a href="javascript:;">
                    <span class="s1">${item['sDay']}</span>
                    <span class="s2">${lunar_festival||item['term']||other_festival||item['lDayZH']||'&nbsp;'}</span>
                    ${sign&&map[sign]?'<i>'+map[sign]+'</i>':''}
                </a>
            </td>`;
            if(i%7==6&&i<len-1){
                html+='</tr><tr>';
            }
        }
        html+='</tr>';

        let lunar_festivals = thatDay['festival'].split(' ').filter(function(value){
            return Object.values(lFestival).flat().map(item=>item.name).includes(value);
        });
        let other_festivals = thatDay['festival'].split(' ').filter(function(value){
            return !Object.values(lFestival).flat().map(item=>item.name).includes(value);
        });
        _.$year.value = thatDay['sYear'];
        _.$month.value = thatDay['sMonth'];
        _.$year.setAttribute('data-value',thatDay['sYear']);
        _.$month.setAttribute('data-value',thatDay['sMonth']);
        _.$info.innerHTML = `<p>${that_date} ${thatDay['weekZH']}</p>
            <div class="day">${thatDay['sDay']}</div>
            <div class="detail">
                ${thatDay['lMonthZH']?`<p>${thatDay['lMonthZH']}${thatDay['lDayZH']}</p>`:``}
                ${thatDay['gzYearZH']?`<p>${thatDay['gzYearZH']}年 【${thatDay['animal']}年】</p>`:``}
                ${thatDay['gzMonthZH']?`<p>${thatDay['gzMonthZH']}月 ${thatDay['gzDayZH']}日</p>`:``}
            </div>
            <div class="list">
                <slot name="item"></slot>
                <div class="item">${lunar_festivals.map(value=>`<p>${value}</p>`).join('')+thatDay['term'].split(' ').map(value=>`<p>${value}</p>`).join('')+other_festivals.map(value=>`<p>${value}</p>`).join('')}</div>
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
        }else if(year>=2011){
            const list = ['元旦','春节','清明','劳动节','端午节','中秋节','国庆节'];
            for(let m=1;m<=12;m++){
                for(let d=1;d<=31;d++){
                    let date = calendar.getDateBySolar(year,m,d);
                    if(date['sMonth']==m&&date['sDay']==d){
                        let types = [];
                        if(date['term']){
                            types.push(date['term']);
                        }
                        if(date['festival']){
                            types = [].concat(types,date['festival'].split(' '));
                        }
                        types.forEach(function(type){
                            if(list.includes(type)){
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
        if(date){
            _.date = date;
            let [year,month,day] = date.split('-');
            _.formatSetting(year);
            _.formatTable({'year':year,'month':month,'day':day});
        }else{
            _.date = _.today.date;
            _.formatSetting();
            _.formatTable();
        }
    }
}

if(!customElements.get('widget-calendar')){
    customElements.define('widget-calendar', WidgetCalendar);
}

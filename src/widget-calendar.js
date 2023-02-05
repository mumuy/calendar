/*
*   万年历组件
*/
import {holidayMap,scheduleMap} from './module/holiday';
import {getSolarMonthDays,getDateString} from './module/method';
import calendar from './calendar';

class WidgetCalendar extends HTMLElement {
    constructor() {
        super();
        let _ = this;
        const $shadow = this.attachShadow({mode:'open'});
        $shadow.innerHTML = `<div class="mod-calendar">
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
                                return list;
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
                                return list;
                            })()+`
                        </select>
                        <a class="next next-month" href="javascript:;">&gt;</a>
                    </span>
                    <span>
                        <select class="holiday">
                            <option value="">假日安排</option>
                        </select>
                    </span>
                    <a class="goback" href="javascript:;">返回今天</a>
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

        // 样式
        const $style = document.createElement('style');
        $style.textContent = `
            *{
                padding:0;
                margin:0;
            }
            a{
                text-decoration: none;
                color:#333;
            }
            .mod-calendar {
                display: inline-block;
                width: 600px;
                background: #2095f2;
            }
            .mod-calendar .info {
                float: right;
                position: relative;
                width: 180px;
                padding-top: 15px;
                text-align: center;
                color: #fff;
            }
            .mod-calendar .info p {
                line-height: 22px;
            }
            .mod-calendar .info .day {
                width: 80px;
                height: 80px;
                margin: 15px auto 7px;
                line-height: 80px;
                font-size: 48px;
                background: #fb0;
                border-radius: 8px;
            }
            .mod-calendar .info .festival {
                margin: 15px 10px;
                padding-top: 15px;
                border-top: 1px dotted #fefefe
            }
            .mod-calendar .box {
                margin-right: 180px;
                border: 2px solid #2095f2;
                background: #fff;
            }
            .mod-calendar .selector {
                position: relative;
                padding: 5px 12px;
                vertical-align: middle;
                overflow: hidden;
            }
            .mod-calendar .selector span {
                float: left;
            }
            .mod-calendar .selector a {
                float: left;
                position: relative;
                height: 24px;
                padding: 0 5px;
                border: 1px solid #ebebeb;
                background: #fafafa;
                line-height: 24px;
                vertical-align: middle;
            }
            .mod-calendar .selector a:hover {
                border-color: #fb0;
                color: #fb0;
            }
            .mod-calendar .selector .goback {
                margin-left: 7px;
            }
            .mod-calendar .selector .prev {
                left: 1px;
            }
            .mod-calendar .selector .next {
                margin-right: 7px;
                right: 1px;
            }
            .mod-calendar .selector select {
                float: left;
                min-width: 60px;
                height: 26px;
                padding-left: 4px;
                border: 1px solid #ebebeb;
                background: #fff;
                line-height: 24px;
                vertical-align: middle;
                font-size: 14px;
                color: #333;
                outline: none;
            }
            .mod-calendar .selector button {
                height: 26px;
                border: 1px solid #ebebeb;
                line-height: 24px;
                background: #fafafa;
            }
            .mod-calendar table {
                width: 100%;
                table-layout: fixed;
                color: #666;
                border-collapse: collapse;
                border-spacing: 0;
            }
            .mod-calendar table tr {
                border-top: 1px solid #ebebeb;
            }
            .mod-calendar table th,.mod-calendar table td {
                border: 1px solid #ebebeb;
                text-align: center;
            }
            .mod-calendar table th {
                line-height: 32px;
                font-weight: normal;
            }
            .mod-calendar table td {
                position: relative;
                line-height: 20px;
            }
            .mod-calendar table thead {
                background: #f8f8f8;
            }
            .mod-calendar table tbody a {
                display: block;
                position: relative;
                margin: 0 auto;
                padding: 7px 0;
                border: 1px solid transparent;
                cursor: pointer;
            }
            .mod-calendar table tbody a:hover {
                border: 1px solid #cccccc;
            }
            .mod-calendar table tbody span {
                display: block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .mod-calendar table tbody i {
                position: absolute;
                left: 2px;
                top: 0;
                line-height: 20px;
                font-style: normal;
                color: #fff;
            }
            .mod-calendar table tbody .s1 {
                font-size: 18px;
                color: #212121;
            }
            .mod-calendar table tbody .s2 {
                font-size: 13px;
                color: #757575;
            }
            .mod-calendar table tbody .active a {
                border: 1px solid #cccccc;
            }
            .mod-calendar table tbody .holiday a {
                background: #f1f9f1
            }
            .mod-calendar table tbody .holiday.active a,.mod-calendar table tbody .holiday a:hover{
                border: 1px solid #4bae4f;
            }
            .mod-calendar table tbody .holiday i {
                color: #4bae4f;
            }
            .mod-calendar table tbody .work a {
                background: #fef0ef;
            }
            .mod-calendar table tbody .work.active a,.mod-calendar table tbody .work a:hover{
                border: 1px solid #f44336;
            }
            .mod-calendar table tbody .work i {
                color: #f44336;
            }
            .mod-calendar table tbody .disabled a {
                opacity: 0.4;
            }
            .mod-calendar table tbody a.current{
                border: 1px solid #fb0;
            }
            @media screen and (max-width: 640px) {
            	.mod-panel{
            		border: none;
            		background: none;
            		margin-bottom: 10px;
            	}
            	.mod-panel .hd{
            		padding: 0;
            		margin-bottom: 0;
            		line-height: 22px;
            	}
            	.mod-panel .hd h1 {
            	    line-height: 36px;
            	    font-size: 18px;
            	}
            	.mod-panel .hd img{
            		width: 80px;
            		height: 50px;
            	}

            	.inner{
            		overflow:visible;
            	}

            	.mod-calendar{
            		width: 100%;
            		margin-bottom: 12px;
            		font-size: 12px;
            	}
            	.mod-calendar .info{
            		float: none;
            		width: auto;
            		padding-top: 10px;
            		padding-left: 10px;
            		overflow:hidden;
            	}
            	.mod-calendar .info p{
            		text-align: left;
            	}
            	.mod-calendar .info .day{
            		float: left;
            		width: 58px;
            		height: 58px;
            		margin: 7px 0 12px;
            		line-height: 58px;
            		font-size: 24px;
            	}
            	.mod-calendar .info .sub{
            		margin-left: 70px;
            		padding-top: 5px;
            	}
            	.mod-calendar .sub p{
            		line-height: 21px;
            	}
            	.mod-calendar .info .festival{
            		position: absolute;
            		top: 10px;
            		right: 9px;
            		margin: 0;
            		padding:0;
            		border-top: none;
            	}
            	.mod-calendar .box{
            		margin-right: 0;
            		padding:10px 0;
            		border: none;
            	}
            	.mod-calendar .selector span{
            		float: left;
            		position: relative;
            		width: 33.33%;
            		border:1px solid #ccc;
            		margin-right: -1px;
            		text-align: center;
            		box-sizing: border-box;
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
            	.mod-calendar tbody a{
            		width: auto;
            	}
            	.mod-calendar tr{
            		border-top: none;
            	}
            	.mod-calendar th, .mod-calendar td{
            		position: relative;
            		height: 48px;
            		border: 1px solid #ccc;
            		line-height: 16px;
            	}
            	.mod-calendar .today{
            		background: #fc0;
            	}
            	.mod-calendar .today a{
            		border-right: none;
            	}
            	.mod-calendar .s2{
            		color: #333;
            	}
            	.mod-calendar tbody a.active, .mod-calendar tbody a:hover{
            		padding: 7px 1px;
            		border:1px solid #fc0;
            	}
            	.mod-calendar .disabled .s1, .mod-calendar .disabled .s2{
            		color: #999;
            	}
            	.mod-calendar .selector .goback{
            		position: absolute;
            	    top: 75px;
            	    right: 10px;
            	    height: 20px;
            	    background: #ffbb00;
            	    line-height: 20px;
            	    font-size: 14px;
            	    color: #fff;
            	    border-radius: 3px;
            	}
            	.mod-calendar .selector .goback:hover{
            		border-color:#ffbb00;
            		color: #fff;
            	}
            }
        `;
        $shadow.appendChild($style);

        //万年历
        (function(_date){
            let today = calendar.getToday();
            let today_date = getDateString(today['sYear'],today['sMonth'],today['sDay']);
            _date = _date||today_date;
            let $module = $shadow.querySelector('.mod-calendar');
            let $tbody = $module.querySelector('tbody');
            let $year = $module.querySelector('.year');
            let $month = $module.querySelector('.month');
            let $holiday = $module.querySelector('.holiday');
            let $goback = $module.querySelector('.goback');
            let $prev_year = $module.querySelector('.prev-year');
            let $next_year = $module.querySelector('.next-year');
            let $prev_month = $module.querySelector('.prev-month');
            let $next_month = $module.querySelector('.next-month');
            let $info = $module.querySelector('.info');
            let _data = [];
            let _day = 1;
            let formatTable = function(param){
                let thatDay = today;
                if(param){
                    thatDay = calendar.Solar(+param['year'],+param['month'],+param['day']);
                }
                let that_date = getDateString(thatDay['sYear'],thatDay['sMonth'],thatDay['sDay']);
                //获取日历信息
                _data = (function(){
                    let firstDay = calendar.Solar(thatDay['sYear'],thatDay['sMonth'],1);
                    let monthDays = getSolarMonthDays(thatDay['sYear'],thatDay['sMonth']);
                    let result = [];
                    // 上月日期
                    for(let i=firstDay['week'];i>0;i--){
                        let obj = calendar.Solar(firstDay['sYear'],firstDay['sMonth'],firstDay['sDay']-i);
                        result.push(obj);
                    }
                    // 当月日期
                    for(let i=0;i<monthDays;i++){
                        let obj = calendar.Solar(firstDay['sYear'],firstDay['sMonth'],firstDay['sDay']+i);
                        result.push(obj);
                    }
                    // 下月日期
                    let lastDay = result.at(-1);
                    for(let i=1;lastDay['week']+i<7;i++){
                        let obj = calendar.Solar(lastDay['sYear'],lastDay['sMonth'],lastDay['sDay']+i);
                        result.push(obj);
                    }
                    // 是否增加一行
                    if(result.length<=35){
                        let lastDay = result.at(-1);
                        for(let i=1;result.length<42;i++){
                            let obj = calendar.Solar(lastDay['sYear'],lastDay['sMonth'],lastDay['sDay']+i);
                            result.push(obj);
                        }
                    }
                    return result;
                })();

                let map = {
                    'work':'班',
                    'holiday':'休'
                };
                let html = '<tr>';
                for(let i=0,len=_data.length;i<len;i++){
                    let item = _data[i];
                    let item_date = getDateString(item['sYear'],item['sMonth'],item['sDay']);
                    let classnameList = [];
                    if(item_date==that_date){
                        classnameList.push('active');
                    }
                    if(item['sYear']!=thatDay['sYear']||item['sMonth']!=thatDay['sMonth']){
                        classnameList.push('disabled');
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
                    let festival = item['festival'].split(' ')[0];
                    if(festival.length>3){
                        festival = '';
                    }
                    html += `<td class="`+classnameList.join(' ')+`" data-id="`+i+`">
                        <a href="javascript:;" class="`+(item_date==_date?'current':'')+`">
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
                $year.value = thatDay['sYear'];
                $month.value = thatDay['sMonth'];
                $info.innerHTML = '<p>'+that_date+' '+thatDay['weekZH']+'</p>\
                <div class="day">'+thatDay['sDay']+'</div>\
                <div class="sub"><p>'+thatDay['lMonthZH']+thatDay['lDayZH']+'</p>\
                <p>'+thatDay['gzYearZH']+'年 【'+thatDay['animal']+'年】</p>\
                <p>'+thatDay['gzMonthZH']+'月 '+thatDay['gzDayZH']+'日</p></div>\
                <div class="festival"><p>'+thatDay['festival'].replace(/\s/g,'</p><p>')+'</p></div>';
                $tbody.innerHTML = html;
            };
            let formatSetting = function(year){
                year = year||(new Date()).getFullYear();
                $holiday.innerHTML = '';
                let $o = new Option("假日安排","");
                $holiday.add($o);
                if(holidayMap[year]){
                    let items = holidayMap[year];
                    for(let i=0;i<items.length;i++){
                        let $option = new Option(items[i]['name'],items[i]['value']);
                        $holiday.add($option);
                    }
                }else{
                    const list = ['元旦','春节','清明','劳动节','端午节','中秋节','国庆节'];
                    for(let m=1;m<=12;m++){
                        for(let d=1;d<=31;d++){
                            let date = calendar.Solar(year,m,d);
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
                                        $holiday.add($option);
                                    }
                                });
                            }
                        }
                    }
                }
            };
            $year.onchange = function(){
                let year = $year.value;
                let month = $month.value;
                formatTable({'year':year,'month':month,'day':_day});
                formatSetting(year);
            };
            $month.onchange = function(){
                let year = $year.value;
                let month = $month.value;
                formatTable({'year':year,'month':month,'day':_day});
            };
            $holiday.onchange = function(){
                let value = this.value;
                if(value){
                    let [year,month,day] = value.split('-');
                    formatTable({'year':year,'month':month,'day':day});
                }
            };
            $goback.onclick = function(){
                formatTable();
                formatSetting();
            };
            $prev_year.onclick = function(){
                let year = $year.value;
                let month = $month.value;
                year--;
                formatTable({'year':year,'month':month,'day':_day});
                formatSetting(year);
            };
            $next_year.onclick = function(){
                let year = $year.value;
                let month = $month.value;
                year++;
                formatTable({'year':year,'month':month,'day':_day});
                formatSetting(year);
            };
            $prev_month.onclick = function(){
                let year = $year.value;
                let month = $month.value;
                month--;
                formatTable({'year':year,'month':month,'day':_day});
                if(month==0)formatSetting(--year);
            };
            $next_month.onclick = function(){
                let year = $year.value;
                let month = $month.value;
                month++;
                formatTable({'year':year,'month':month,'day':_day});
                if(month==13)formatSetting(++year);
            };
            $tbody.onclick = function(e){
                e = e || window.event;
                let target = e.target || e.srcElement;
                while(target.tagName!='TD'&&target.tagName!='TABLE'){
                    target = target.parentNode;
                }
                let id = target.getAttribute('data-id');
                if(target.tagName=='TD'&&id){
                    let data = _data[id];
                    _day = data['sDay'];
                    formatTable({'year':data['sYear'],'month':data['sMonth'],'day':data['sDay']});
                    _.dispatchEvent(new CustomEvent('onSelected',{'detail':calendar.Solar(data['sYear'],data['sMonth'],data['sDay'])}));
                }
            };
            if(_date){
                let [year,month,day] = _date.split('-');
                formatTable({'year':year,'month':month,'day':day});
                formatSetting(year);
            }else{
                formatTable();
                formatSetting();
            }
        })();
    }
}

customElements.define('widget-calendar', WidgetCalendar);

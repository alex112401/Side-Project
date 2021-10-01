var eventlist=[];
var comeventlist=[];
var tabs;
var currenttab;//for圖表控制    
var currentTab;//for事件控制

var dailyeffobjlist=[];
var dailyeffdatelist=[];
var dailyeffnumlist=[];
var temppredtimelist=[];
var tempcomptimelist=[];

var dailyaccomdatelist=[];
var dailyaccomdatecomlist=[];
var dailyaccomdatetotallist=[];
var eventcountobjlist=[];
var eventcountlist=[];
var comeventcountobjlist=[];
var comeventcountlist=[];
var dailyaccomnumlist=[];
var neweventdate;
var completeeventdate;
var checkdate;
var checkstate = '';

var emergecountlist=[0,0,0,0];

var emergeeffnumlist=[0,0,0,0];

var today = new Date();

const app = new Vue({

    data: {
        currentTab: '未完成',
        tabs: ['未完成', '已完成'],

        eventname: "會議",
        eventdate: "09:00",
        eventcosttime: 1,
        emerge: "普通",

        totaltime: 0,
        emptytime: 8,
        
        eventlist:[],

        comeventlist:[],

        charttabs:  ["每日完成率", "每日效率", "緊急程度分布", "緊急程度效率分布"],
        currenttab: "每日完成率",

    },

    methods: {

        DailyEffcal: function(){
            var checkindex = 0;
            var check = true;

            if(this.comeventlist.length>0){
                checkdate = this.comeventlist[this.comeventlist.length-1].eventdate;

                var tempcheckdatelist = [];

                for(k=0;k<dailyeffobjlist.length;k++){
                    tempcheckdatelist[k] = dailyeffobjlist[k].eventdate;
                }

                check = tempcheckdatelist.includes(checkdate);
                
                checkindex = this.comeventlist.length-1;

                if(check == false){
                    dailyeffobjlist.push({
                        eventdate: this.comeventlist[checkindex].eventdate, 
                        predtime: parseFloat(this.comeventlist[checkindex].eventcosttime).toFixed(2), 
                        comptime: parseFloat(this.comeventlist[checkindex].comtime).toFixed(2)});

                    dailyeffobjlist = dailyeffobjlist.sort(function(a, b){
                        var dateA = a.eventdate.toUpperCase();
                        var dateB = b.eventdate.toUpperCase();
                        if (dateA < dateB){return -1;};
                        if (dateA > dateB){return 1;};
                        return 0;
                    });                                                      

                    for(i=0;i<dailyeffobjlist.length;i++){
                        dailyeffdatelist[i] = dailyeffobjlist[i].eventdate;
                        temppredtimelist[i] = dailyeffobjlist[i].predtime;
                        tempcomptimelist[i] = dailyeffobjlist[i].comptime;
                        dailyeffnumlist[i] = parseInt((temppredtimelist[i]/tempcomptimelist[i])*100);
                    }       

                }else{
                    plusindex = dailyeffdatelist.indexOf(this.comeventlist[checkindex].eventdate);
                    temppredtimelist[plusindex] += parseFloat(this.comeventlist[checkindex].eventcosttime).toFixed(2);
                    tempcomptimelist[plusindex] += parseFloat(this.comeventlist[checkindex].comtime).toFixed(2);
                    dailyeffnumlist[plusindex] = parseInt((temppredtimelist[plusindex]/tempcomptimelist[plusindex])*100);                            
                }
                
            }  
        },

        SetDailyEffChart: function(){
            let newPromise = new Promise((resolve) => {
                resolve()
            })
        
            newPromise.then(() => {
                var mychart = echarts.init(document.getElementById("main"));
        
                var option = {
                    title: {
                        text: "工作效率 = 預估完成時間/實際完成時間",
                        x: 'center'
                    },
                    tooltip: {},

                    legend: {
                        x: 'right',
                        y: 'center',
                        data:['工作效率(%)'],
                    },
                    yAxis:{

                    },
                    xAxis:{
                        data: dailyeffdatelist
                        
                    },

                    series: [
                        {
                            name: '工作效率(%)',
                            type: 'bar',
                            data: dailyeffnumlist,
                            itemStyle: {
                                color: '#66B3FF'
                            }
                        },
                        
                        {
                            name: '工作效率(%)',
                            type: 'line',
                            data: dailyeffnumlist,
                            itemStyle: {
                                color: '#F75000'
                            }
                        },
                    ],                        
                };
            
                mychart.setOption(option);
            })
        },

        DailyAccomcal: function(){
            var checkindex = 0;
            var check = true;

            if(this.eventlist.length>0 && checkstate == 'newevent'){
                checkindex = this.eventlist.length-1;

                var tempcheckdatelist = [];

                for(k=0;k<eventcountobjlist.length;k++){
                    tempcheckdatelist[k] = eventcountobjlist[k].eventdate;
                }

                check = tempcheckdatelist.includes(checkdate);

                if(check == false){        

                    eventcountobjlist.push({
                        eventdate: neweventdate,
                        count: 1
                    });

                    eventcountobjlist = eventcountobjlist.sort(function(a, b){
                        var dateA = a.eventdate.toUpperCase();
                        var dateB = b.eventdate.toUpperCase();
                        if (dateA < dateB){return -1;};
                        if (dateA > dateB){return 1;};
                        return 0;
                    });               

                    for(i=0;i<eventcountobjlist.length;i++){
                        dailyaccomdatelist[i] = eventcountobjlist[i].eventdate;
                        eventcountlist[i] = eventcountobjlist[i].count
                    }  
                    
                }else{
                    plusindex = dailyaccomdatelist.indexOf(checkdate);
                    eventcountobjlist[plusindex].count +=1;
                    eventcountlist[plusindex] = eventcountobjlist[plusindex].count;
                }                                                                        
            }

            if(this.comeventlist.length>0 && checkstate == 'complete'){
                checkindex = this.comeventlist.length-1;

                var tempcheckdatelist = [];

                for(k=0;k<comeventcountobjlist.length;k++){
                    tempcheckdatelist[k] = comeventcountobjlist[k].eventdate;
                }

                check = tempcheckdatelist.includes(checkdate);

                if(check == false){             

                    comeventcountobjlist.push({
                        eventdate: completeeventdate,
                        count: 1
                    });

                    comeventcountobjlist = comeventcountobjlist.sort(function(a, b){
                        var dateA = a.eventdate.toUpperCase();
                        var dateB = b.eventdate.toUpperCase();
                        if (dateA < dateB){return -1;};
                        if (dateA > dateB){return 1;};
                        return 0;
                    });               

                    for(i=0;i<comeventcountobjlist.length;i++){
                        dailyaccomdatecomlist[i] = comeventcountobjlist[i].eventdate;
                        comeventcountlist[i] = comeventcountobjlist[i].count
                    }  
                    
                }else{
                    plusindex = dailyaccomdatecomlist.indexOf(checkdate);
                    comeventcountobjlist[plusindex].count +=1;
                    comeventcountlist[plusindex] = comeventcountobjlist[plusindex].count;
                
                }                                                
                
            }

            //計算DailyAccom
            temptotaldate = dailyaccomdatelist.concat(dailyaccomdatecomlist);
            dailyaccomdatetotallist = temptotaldate.filter(function(ele , pos){
                return temptotaldate.indexOf(ele) == pos;
            }) ;

            dailyaccomdatetotallist = dailyaccomdatetotallist.sort(function(a, b){
                var dateA = a.toUpperCase();
                var dateB = b.toUpperCase();
                if (dateA < dateB){return -1;};
                if (dateA > dateB){return 1;};
                return 0;
            });    
            

            for(a=0;a<dailyaccomdatetotallist.length;a++){
                totalindex = dailyaccomdatetotallist.indexOf(dailyaccomdatetotallist[a]);
                dateindex = dailyaccomdatelist.indexOf(dailyaccomdatetotallist[a]);
                comdateindex = dailyaccomdatecomlist.indexOf(dailyaccomdatetotallist[a]);

                if(dateindex !=-1 && comdateindex != -1){
                    
                    dailyaccomnumlist[totalindex] = comeventcountlist[comdateindex]/(comeventcountlist[comdateindex]+eventcountlist[dateindex])*100;
                }else if(comdateindex == -1 ){
                    dailyaccomnumlist[totalindex] = 0;
                }else if(dateindex == -1){
                    dailyaccomnumlist[totalindex] = 100;
                }
            }

        },

        SetDailyAccomChart: function(){
            let newPromise = new Promise((resolve) => {
                resolve()
            })
        
            newPromise.then(() => {
                var mychart = echarts.init(document.getElementById("main"));
        
                var option = {
                    title: {
                        text: '每日完成率 = 已完成事件/(未完成事件+已完成事件)',
                        x: 'center'
                    },
                    tooltip: {},
                    legend: {
                        x: 'right',
                        y: 'center',
                        data:['完成率(%)'],
                    },
                    yAxis:{

                    },
                    xAxis:{
                        data: dailyaccomdatetotallist
                    },

                    series: [{
                        name: '完成率(%)',
                        type: 'bar',
                        data: dailyaccomnumlist,
                        itemStyle: {
                            color: '#66B3FF'
                        }
                    },{
                        name: '完成率(%)',
                        type: 'line',
                        data: dailyaccomnumlist,
                        itemStyle: {
                            color: '#F75000'
                        }
                    }]
            };
        
            mychart.setOption(option);
            })
        },

        NewIncompleteEvent: function(){
            totaltime = this.totaltime;
            totaltime = 0;
            for(j=0;j<this.eventlist.length;j++){
                totaltime = totaltime + this.eventlist[j].eventcosttime;
            }
            
            var dup = this.eventlist.some(function(item, index, array){
                return item.eventname == document.getElementById("eventname").value;
            })

            if(document.getElementById("eventname").value=='' ||
            document.getElementById("eventdate").value=='' ||
            document.getElementById("eventcosttime").value=='' ||
            document.getElementById("emerge").value==''
            ){
                alert('請完成填寫');
            }else if(dup == true){
                alert('名稱重複，請輸入可辨識的名稱');
            }else{
                if((totaltime + parseFloat(document.getElementById("eventcosttime").value).toFixed(2)) > this.emptytime){
                    alert('超過可用時間');
                }else{
                    this.eventname = document.getElementById("eventname").value;
                    this.eventdate = document.getElementById("eventdate").value;
                    this.eventcosttime = parseFloat(document.getElementById("eventcosttime").value).toFixed(2);
                    this.emerge = document.getElementById("emerge").value;

                    ///////eventlsit陣列push
                    this.eventlist.push(
                        {eventname: this.eventname, 
                        eventdate: this.eventdate, 
                        eventcosttime: this.eventcosttime, 
                        emerge:this.emerge}
                        );
                    ///////
                    
                    this.$emit('update', this.eventlist);
                    neweventdate = this.eventdate;
                    checkdate = neweventdate;
                    checkstate = "newevent";
                }
            }

            //////DailyAccomcal();///////////
            var checkindex = 0;
            var check = true;

            if(this.eventlist.length>0 && checkstate == 'newevent'){
                checkindex = this.eventlist.length-1;

                var tempcheckdatelist = [];

                for(k=0;k<eventcountobjlist.length;k++){
                    tempcheckdatelist[k] = eventcountobjlist[k].eventdate;
                }

                check = tempcheckdatelist.includes(checkdate);

                if(check == false){        

                    eventcountobjlist.push({
                        eventdate: neweventdate,
                        count: 1
                    });

                    eventcountobjlist = eventcountobjlist.sort(function(a, b){
                        var dateA = a.eventdate.toUpperCase();
                        var dateB = b.eventdate.toUpperCase();
                        if (dateA < dateB){return -1;};
                        if (dateA > dateB){return 1;};
                        return 0;
                    });               

                    for(i=0;i<eventcountobjlist.length;i++){
                        dailyaccomdatelist[i] = eventcountobjlist[i].eventdate;
                        eventcountlist[i] = eventcountobjlist[i].count
                    }  
                    
                }else{
                    plusindex = dailyaccomdatelist.indexOf(checkdate);
                    eventcountobjlist[plusindex].count +=1;
                    eventcountlist[plusindex] = eventcountobjlist[plusindex].count;
                }                                                                        
            }

            if(this.comeventlist.length>0 && checkstate == 'complete'){
                checkindex = this.comeventlist.length-1;

                var tempcheckdatelist = [];

                for(k=0;k<comeventcountobjlist.length;k++){
                    tempcheckdatelist[k] = comeventcountobjlist[k].eventdate;
                }

                check = tempcheckdatelist.includes(checkdate);

                if(check == false){             

                    comeventcountobjlist.push({
                        eventdate: completeeventdate,
                        count: 1
                    });

                    comeventcountobjlist = comeventcountobjlist.sort(function(a, b){
                        var dateA = a.eventdate.toUpperCase();
                        var dateB = b.eventdate.toUpperCase();
                        if (dateA < dateB){return -1;};
                        if (dateA > dateB){return 1;};
                        return 0;
                    });               

                    for(i=0;i<comeventcountobjlist.length;i++){
                        dailyaccomdatecomlist[i] = comeventcountobjlist[i].eventdate;
                        comeventcountlist[i] = comeventcountobjlist[i].count
                    }  
                    
                }else{
                    plusindex = dailyaccomdatecomlist.indexOf(checkdate);
                    comeventcountobjlist[plusindex].count +=1;
                    comeventcountlist[plusindex] = comeventcountobjlist[plusindex].count;
                
                }                                                
                
            }

            //計算DailyAccom
            temptotaldate = dailyaccomdatelist.concat(dailyaccomdatecomlist);
            dailyaccomdatetotallist = temptotaldate.filter(function(ele , pos){
                return temptotaldate.indexOf(ele) == pos;
            }) ;

            dailyaccomdatetotallist = dailyaccomdatetotallist.sort(function(a, b){
                var dateA = a.toUpperCase();
                var dateB = b.toUpperCase();
                if (dateA < dateB){return -1;};
                if (dateA > dateB){return 1;};
                return 0;
            });    
            

            for(a=0;a<dailyaccomdatetotallist.length;a++){
                totalindex = dailyaccomdatetotallist.indexOf(dailyaccomdatetotallist[a]);
                dateindex = dailyaccomdatelist.indexOf(dailyaccomdatetotallist[a]);
                comdateindex = dailyaccomdatecomlist.indexOf(dailyaccomdatetotallist[a]);

                if(dateindex !=-1 && comdateindex != -1){
                    
                    dailyaccomnumlist[totalindex] = comeventcountlist[comdateindex]/(comeventcountlist[comdateindex]+eventcountlist[dateindex])*100;
                }else if(comdateindex == -1 ){
                    dailyaccomnumlist[totalindex] = 0;
                }else if(dateindex == -1){
                    dailyaccomnumlist[totalindex] = 100;
                }
            }

            ///////////////////////
        },

        Setemptytime: function(){
            this.totaltime = 0;
            this.emptytime = parseFloat(document.getElementById("emptytime").value).toFixed(2);
            for(j=0;j<this.eventlist.length;j++){
                this.totaltime =this.totaltime + this.eventlist[j].eventcosttime;
            }
        },

        DeleteincomEvent: function(){
            this.eventlist = [];
            eventcountobjlist=[];
            eventcountlist=[];
        },

        DeletecomEvent: function(){
            this.comeventlist = [];
            dailyeffobjlist=[];
            dailyeffdatelist=[];
            dailyaccomdatecomlist=[];
            comeventcountobjlist=[];
            comeventcountlist=[];
        },

    },

    components: {
        'tab-incomplete': {

            template: 
            '<div class="incom-tab">'+
                '<h3 v-if="emptytime >= totaltime">可用時間：{{ emptytime }} 小時</h3>'+
                '<h3 v-else>可用時間不足，請先刪除事件或是調整可用時間設定！</h3>'+
                '<div v-if="eventlist.length > 0">'+
                    '<table class="table table-dark table-striped table-hover ">'+
                        '<thead>'+
                            '<tr>'+
                                '<th scope="col"> 事件名稱 </th>'+
                                '<th scope="col"> 事件日期 </th>'+
                                '<th scope="col"> 預估時間(小時) </th>'+
                                '<th scope="col"> 緊急程度 </th>'+
                                '<th scope="col"> 完成 </th>'+
                                '<th scope="col"> 刪除 </th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+
                            '<tr scope="row" v-for="i in eventlist" :key="i.eventname">'+
                                '<td text-align: center>{{ i.eventname }}</td>'+
                                '<td>{{ i.eventdate }} </td>'+
                                '<td>{{ i.eventcosttime }} </td>'+
                                '<td>{{ i.emerge }} </td>'+
                                '<td><button v-on:click="CompleteEvent(i.eventname, i.eventdate, i.eventcosttime, i.emerge)">完成</button></td>'+
                                '<td><button v-on:click="DeleteEvent(i.eventname)">刪除</button></td>'+
                            '</tr>'+
                        '</tbody>'+
                    '</table>'+
                '</div>'+
                '<div v-else><h4>沒有未完成事件</h4></div>'+
            '</div>',

            props: 
            {
                currenttab: String,
                totaltime: Number,
                emptytime: Number,                
                eventlist: Array,
                comeventlist: Array
            },

            methods: {
                CompleteEvent(comeventname, comeventstarttime, comeventcosttime, comemerge){
                    usercomtime = prompt('完成時間','1');
                    if(usercomtime != null){
                        index = this.eventlist.findIndex(x => x.eventname === comeventname);
                        this.comeventlist.push({
                            eventname: comeventname, 
                            eventdate: comeventstarttime, 
                            eventcosttime: comeventcosttime, 
                            emerge:comemerge, 
                            comtime:parseFloat(usercomtime).toFixed(2)});
                        this.$emit('update', this.comeventlist);
                        this.eventlist.splice(index, 1);
                        this.$emit('update', this.eventlist);

                        var tempdatelist=[];
                        var tempdatecheck = true;
                        for(c=0;c<this.eventlist.length;c++){
                            tempdatelist[c] = this.eventlist[c].eventdate;
                            if(tempdatelist.includes(comeventstarttime)){
                                tempdatecheck = true;
                            }else{
                                tempdatecheck = false;
                            }
                        }

                        if(eventcountobjlist.length>0){
                            if(tempdatecheck == false){
                                accomindex = dailyaccomdatelist.indexOf(comeventstarttime);
                                dailyaccomdatelist.splice(accomindex, 1);
                                eventcountobjlist[accomindex].count -=1;
                                eventcountlist[accomindex] = eventcountobjlist[accomindex].count;    
                            

                            }else{
                                accomindex = dailyaccomdatelist.indexOf(comeventstarttime);
                                eventcountobjlist[accomindex].count -=1;
                                eventcountlist[accomindex] = eventcountobjlist[accomindex].count;    

                                if(comeventcountlist[accomindex]>0){
                                    comeventcountlist[accomindex] += 1;
                                }else{
                                    comeventcountlist[accomindex] = 1;
                                }
                            }
                            completeeventdate = comeventstarttime;
                            checkdate = completeeventdate;
                            checkstate = "complete";
                            console.log("checkstate = " + checkstate)
                        }     
                        
                        this.$parent.DailyEffcal();
                        this.$parent.DailyAccomcal();

                    }
                },  

                DeleteEvent(deleventname){
                    index = this.eventlist.findIndex(x => x.eventname === deleventname);
                    this.eventlist.splice(index, 1);
                    this.$emit('update', this.eventlist);
                                           
                    var tempdatelist=[];
                    for(c=0;c<this.eventlist.length;c++){
                        tempdatelist[c] = this.eventlist[c].eventdate;
                        if(!tempdatelist.includes(comeventstarttime)){
                            accomindex = dailyaccomdatelist.indexOf(comeventstarttime);
                            dailyaccomdatelist.splice(accomindex, 1);
                        }
                    }
                },
            },

        },

        'tab-complete': {
            
            data() {
                return{
                    workprogress: 0,
                }
            },

            template: 
            '<div class="com-tab">'+
                '{{ Workprogresscal() }}'+
                '<h3 v-if="workprogress <= 1">完成進度：0%</h3>'+
                '<h3 v-else>完成進度：{{workprogress}}%</h3>'+
                '<div v-if="comeventlist.length > 0">'+
                    '<table class="table table-dark table-striped table-hover ">'+
                        '<tr>'+
                            '<th scope="col"> 事件名稱 </th>'+
                            '<th scope="col"> 事件日期 </th>'+
                            '<th scope="col"> 預估時間(小時) </th>'+
                            '<th scope="col"> 緊急程度 </th>'+
                            '<th scope="col"> 完成時間(小時) </th>'+
                        '</tr>'+
                        '<tr v-for="i in comeventlist" :key="i.eventname">'+
                            '<td>{{ i.eventname }} </td>'+
                            '<td>{{ i.eventdate }} </td>'+
                            '<td>{{ i.eventcosttime }} </td>'+
                            '<td>{{ i.emerge }} </td>'+
                            '<td>{{ i.comtime }} </td>'+
                        '</tr>'+
                    '</table>'+
                '</div>'+
                '<div v-else><h4>沒有已完成事件</h4></div>'+
            '</div>',

            props: 
            {                
                eventlist: Array,
                comeventlist: Array,
            },

            methods:{
                Workprogresscal: function(){
                    if(this.comeventlist.length>0 || this.eventlist.length>0){
                        this.workprogress = Math.round((this.comeventlist.length / (this.eventlist.length + this.comeventlist.length) * 10000) / 100);
                    }else{
                        this.workprogress = 0;
                    }
                },
            },

        },
        
        "dailyeff":{
            template:
            '<div class="border border-info " id="main" style="width: 800px;height: 350px;"></div>',
            
            props:{
                currenttab: String,
                comeventlist: Array
            },

        },

        "dailyaccom":{
            template:
            '<div class="border border-info" id="main" style="width: 800px;height: 350px;"></div>',
                        
            props:{
                currenttab: String,
                comeventlist: Array,
                eventlist: Array,
            },
            

        },

        "emergechart":{
            template:
            '<div class="border border-info" id="main" style="width: 800px;height: 350px;"> {{ initchart() }} </div>',
                        
            props:{
                currenttab: String,
                comeventlist: Array,
                eventlist: Array,
            },

            methods:{
                initchart(){

                    var emergecount = 0;
                    var importcount = 0;
                    var normalcount = 0;
                    var lazycount = 0;

                    for(i=0;i<this.eventlist.length;i++){
                        if(this.eventlist[i].emerge == '緊急'){
                            emergecount +=1;
                        }else if(this.eventlist[i].emerge == '重要'){
                            importcount +=1;
                        }else if(this.eventlist[i].emerge == '普通'){
                            normalcount +=1;
                        }else if(this.eventlist[i].emerge == '可暫緩'){
                            lazycount +=1;
                        }
                    }

                    for(i=0;i<this.comeventlist.length;i++){
                        if(this.comeventlist[i].emerge == '緊急'){
                            emergecount +=1;
                        }else if(this.comeventlist[i].emerge == '重要'){
                            importcount +=1;
                        }else if(this.comeventlist[i].emerge == '普通'){
                            normalcount +=1;
                        }else if(this.comeventlist[i].emerge == '可暫緩'){
                            lazycount +=1;
                        }
                    }


                    emergecountlist = [          // 数据数组，name 为数据项名称，value 为数据项值
                        {value:emergecount, name:'緊急'},
                        {value:importcount, name:'重要'},
                        {value:normalcount, name:'普通'},
                        {value:lazycount, name:'可暫緩'},
                    ]

                    let newPromise = new Promise((resolve) => {
                        resolve()
                    })
                
                    newPromise.then(() => {
                        var mychart = echarts.init(document.getElementById("main"));
                
                    var option = {
                        title: {
                            text: '緊急程度分布',
                            x: 'center'
                        },
                        series: [
                            {
                                name: '事件統計',
                                type: 'pie',    // 设置图表类型为饼图
                                radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                                roseType: 'angle',
                                data: emergecountlist
                            }
                        ]
                    };
                
                    mychart.setOption(option);
                    })
                
                }
            },
        },

        "emergeeff":{
            template:
            '<div class="border border-info" id="main" style="width: 800px;height: 350px;"> {{ initchart() }} </div>',
                        
            props:{
                currenttab: String,
                comeventlist: Array

            },

            methods:{
                initchart(){

                    var predtimelist=[0,0,0,0];
                    var costtimelist=[0,0,0,0];

                    for(i=0;i<this.comeventlist.length;i++){
                        switch(this.comeventlist[i].emerge){
                            case '可暫緩':
                                predtimelist[0] += parseFloat(this.comeventlist[i].eventcosttime).toFixed(2);
                                costtimelist[0] += parseFloat(this.comeventlist[i].comtime).toFixed(2);
                                break;
                            case '普通':
                                predtimelist[1] += parseFloat(this.comeventlist[i].eventcosttime).toFixed(2);
                                costtimelist[1] += parseFloat(this.comeventlist[i].comtime).toFixed(2);
                                break;
                            case '重要':
                                predtimelist[2] += parseFloat(this.comeventlist[i].eventcosttime).toFixed(2);
                                costtimelist[2] += parseFloat(this.comeventlist[i].comtime).toFixed(2);
                                break;
                            case '緊急':
                                predtimelist[3] += parseFloat(this.comeventlist[i].eventcosttime).toFixed(2);
                                costtimelist[3] += parseFloat(this.comeventlist[i].comtime).toFixed(2);
                                break;                                            
                        }                        
                    }

                    for(j=0;j<4;j++){
                        emergeeffnumlist[j] = predtimelist[j]/costtimelist[j]*100;
                    }
                    
                    console.log("emergeeffnumlist " + emergeeffnumlist);
                    
                    let newPromise = new Promise((resolve) => {
                        resolve()
                    })
                
                    newPromise.then(() => {
                        var mychart = echarts.init(document.getElementById("main"));
                
                    var option = {
                        title: {
                            text: "工作效率 = 預估完成時間/實際完成時間",
                            x: 'center'
                        },
                        tooltip:{},
                        legend: {
                            x: 'right',
                            y: 'center',
                            data:['工作效率(%)'],
                        },
                        xAxis:{
                            data:["可暫緩","普通","重要","緊急"]
                        },
                        yAxis: {},
                        series: [{
                            name: '工作效率(%)',
                            type: 'bar',
                            data: emergeeffnumlist
                        }]
                    };
                
                    mychart.setOption(option);
                    })
                
                }
            },
        },
    },
});

app.$mount("#EventControl");


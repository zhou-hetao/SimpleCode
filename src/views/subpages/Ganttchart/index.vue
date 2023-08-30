<template>
    <div>
      <div class="legend">
        <div class="legendBox">
          <div class="legendSml legendColor1"></div>
          <div>{{ $t('message.time') }}</div>
        </div>
        <div class="legendBox">
          <div class="legendSml legendColor2"></div>
          <div>实际时间</div>
        </div>
        <div class="legendBox">
          <div class="legendSml legendColor3"></div>
          <div>超出时间</div>
        </div>
      </div>
      <!-- <button @click="undapta()">更新数据</button> -->
  
      <div ref="gantt" class="left-container" />
    </div>
  </template>
  <script>
  import moment from "moment"; // moment格式化时间
  import gantt from "dhtmlx-gantt"; // 引入模块
  import "dhtmlx-gantt/codebase/dhtmlxgantt.css"; //皮肤
  
  export default {
    name: "gantt",
    data() {
      return {
        tasks: {
          data: [],
        },
      };
    },
    mounted() {
      let arr = [
        { //没有实际结束   实际开始在计划之前（不显示） b121
          id: "7086894358414229504",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "0",
          dispNo: 1,
          scheduleNameCn: "签约",
          scheduleNameEn: "Sign",
          scheduleBeginDate: "2023-07-01",
          scheduleEndDate: "2024-01-24",
          actualBeginDate: "2023-06-05",
          actualEndDate:null,
          stageCode: "VESSEL_SCHEDULE_1",
          completedPercent: 22,
          scheduleRemark: null,
          fileIds: null,
          businessCode: null,
        },
        {//有实际结束   实际开始在计划之后（显示） b12
          id: "7086894728481865728",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "7086894358414229504",
          dispNo: null,
          scheduleNameCn: "采购设备",
          scheduleNameEn: "caigoushebei",
          scheduleBeginDate: "2023-07-01",
          scheduleEndDate: "2024-01-24",
          actualBeginDate:"2023-07-05",
          actualEndDate:"2023-07-28",
          stageCode: "",
          completedPercent: 13,
          scheduleRemark: "",
          fileIds: null,
          businessCode: null,
        },
        {//有实际结束   实际开始在计划之前（显示） j21
          id: "7088381175781130240",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "7086894358414229504",
          dispNo: null,
          scheduleNameCn: "审图",
          scheduleNameEn: "Plan Approval",
          scheduleBeginDate: "2023-07-18",
          scheduleEndDate: "2024-02-24",
          actualBeginDate:"2023-06-05",
          actualEndDate:"2023-07-28",
          stageCode: "",
          completedPercent: 31,
          scheduleRemark: "",
          fileIds: null,
          businessCode: null,
        },
        {//有实际结束   实际开始在计划之后（显示） j21
          id: "7086894358431006720",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "0",
          dispNo: 2,
          scheduleNameCn: "开工",
          scheduleNameEn: "Start",
          scheduleBeginDate: "2023-07-01",
          scheduleEndDate: "2023-08-24",
          actualBeginDate:"2023-07-10",
          actualEndDate:"2023-09-28",
          stageCode: "VESSEL_SCHEDULE_2",
          completedPercent: 6,
          scheduleRemark: null,
          fileIds: null,
          businessCode: null,
        },
        {//有实际结束   实际开始(相等于计划开始)在计划之后（显示） "b21"
          id: "7088384223853150208",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "7086894358431006720",
          dispNo: null,
          scheduleNameCn: "加工",
          scheduleNameEn: "Steel Fabrication",
          scheduleBeginDate: "2023-07-01",
          scheduleEndDate: "2023-08-24",
          actualBeginDate:"2023-07-01",
          actualEndDate:"2023-12-28",
          stageCode: "",
          completedPercent: 6,
          scheduleRemark: "",
          fileIds: null,
          businessCode: null,
        },
        {///有实际结束   对应相等
          id: "7088384248909922304",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "7086894358431006720",
          dispNo: null,
          scheduleNameCn: "完善",
          scheduleNameEn: "Steel Fabrication",
          scheduleBeginDate: "2023-07-01",
          scheduleEndDate: "2023-08-24",
          actualBeginDate:"2023-07-01",
          actualEndDate:"2023-08-24",
          stageCode: "",
          completedPercent: 6,
          scheduleRemark: "",
          fileIds: null,
          businessCode: null,
        },
        {//有实际结束   计划 包含实际 "b12"
          id: "7086894358472949760",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "0",
          dispNo: 3,
          scheduleNameCn: "审核",
          scheduleNameEn: "Keel",
          scheduleBeginDate: "2023-08-01",
          scheduleEndDate: "2024-08-24",
          actualBeginDate:"2023-08-28",
          actualEndDate:"2023-12-24",
          stageCode: "VESSEL_SCHEDULE_3",
          completedPercent: 0,
          scheduleRemark: null,
          fileIds: null,
          businessCode: null,
        },
        {//没有实际   计划 包含实际 b12
          id: "7086894358485532672",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "0",
          dispNo: 4,
          scheduleNameCn: "试用",
          scheduleNameEn: "Launch",
          scheduleBeginDate: "2023-08-01",
          scheduleEndDate: "2024-08-24",
          actualBeginDate:null,
          actualEndDate:null,
          stageCode: "VESSEL_SCHEDULE_4",
          completedPercent: 0,
          scheduleRemark: null,
          fileIds: null,
          businessCode: null,
        },
        {//有实际   实际开始  大于   计划开始 b121
          id: "7086894358502309888",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "0",
          dispNo: 5,
          scheduleNameCn: "交付",
          scheduleNameEn: "Voyage",
          scheduleBeginDate: "2023-08-01",
          scheduleEndDate: "2024-08-24",
          actualBeginDate:"2023-08-28",
          actualEndDate:null,
          stageCode: "VESSEL_SCHEDULE_5",
          completedPercent: 0,
          scheduleRemark: null,
          fileIds: null,
          businessCode: null,
        },
        {//没有相交时间  实际在后  l12
          id: "7086894358544252928",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "0",
          dispNo: 6,
          scheduleNameCn: "使用中",
          scheduleNameEn: "Delivery",
          scheduleBeginDate: "2023-05-01",
          scheduleEndDate: "2023-06-24",
          actualBeginDate:"2023-08-28",
          actualEndDate:"2024-10-28",
          stageCode: "VESSEL_SCHEDULE_6",
          completedPercent: 0,
          scheduleRemark: null,
          fileIds: null,
          businessCode: null,
        },
        {//没有相交时间  实际在前  l21
          id: "70868943585442529288948",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "0",
          dispNo: 6,
          scheduleNameCn: "反馈",
          scheduleNameEn: "Delivery",
          scheduleBeginDate: "2023-12-01",
          scheduleEndDate: "2024-06-24",
          actualBeginDate:"2023-08-28",
          actualEndDate:"2023-10-28",
          stageCode: "VESSEL_SCHEDULE_6",
          completedPercent: 0,
          scheduleRemark: null,
          fileIds: null,
          businessCode: null,
        },
        {//两端超出  l12s
          id: "7086894358544252928894887478",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "0",
          dispNo: 6,
          scheduleNameCn: "结项",
          scheduleNameEn: "Delivery",
          scheduleBeginDate: "2023-8-01",
          scheduleEndDate: "2023-10-24",
          actualBeginDate:"2023-06-28",
          actualEndDate:"2023-12-28",
          stageCode: "VESSEL_SCHEDULE_6",
          completedPercent: 0,
          scheduleRemark: null,
          fileIds: null,
          businessCode: null,
        },
        {//实际开始  和  计划结束相等  ts13
          id: "7086894358544252928894887478454",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "0",
          dispNo: 6,
          scheduleNameCn: "结项1",
          scheduleNameEn: "Delivery",
          scheduleBeginDate: "2023-8-01",
          scheduleEndDate: "2023-8-16",
          actualBeginDate:"2023-8-16",
          actualEndDate:"2023-8-24",
          stageCode: "VESSEL_SCHEDULE_6",
          completedPercent: 0,
          scheduleRemark: null,
          fileIds: null,
          businessCode: null,
        },
        {//实际开始  和  计划结束相等   实际结束在计划结束后  l12s
          id: "708689435854425292889488747854",
          nbProjectId: "7086894357860581376",
          projectVesselId: "7086894358300983296",
          vesselNameCn: "凯勇",
          vesselNameEn: "NEW VALOR",
          parentId: "0",
          dispNo: 6,
          scheduleNameCn: "结项2",
          scheduleNameEn: "Delivery",
          scheduleBeginDate: "2023-8-01",
          scheduleEndDate: "2023-8-16",
          actualBeginDate:"2023-8-16",
          actualEndDate:"2023-8-25",
          stageCode: "VESSEL_SCHEDULE_6",
          completedPercent: 0,
          scheduleRemark: null,
          fileIds: null,
          businessCode: null,
        },
      ];
      let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = String(currentDate.getMonth() + 1).padStart(2, "0");
        let day = String(currentDate.getDate()).padStart(2, "0");
  
        let formattedDate = `${year}-${month}-${day}`;
        console.log('formattedDate',formattedDate);
      
      this.initData(arr);
  
      gantt.config.show_progress = false;
      gantt.config.open_tree_initially = true; //默认展开子级
      // 设置左侧树子任务缩进和展开
      gantt.config.indent = 30;
      gantt.config.grid_width = 350;
      
      gantt.config.open_tree_initially = true;
      function percenToString(num) {
        return Math.floor(num * 100) + "%";
      }
  
      // 设置每一部分的颜色
      function renderLabel(progress, type, state, px, block, leftpx,falge) {
        var relWidth = progress * 100;
        var cssClass = "custom_progress ";
        if (type === 1) {
          cssClass += "nearly_done";
        } else if (type === 2) {
          if (state) {
            cssClass += "in_progress";
          } else {
            cssClass += "in_progress_w";
          }
        } else if (type === 3) {
          cssClass += "tshu";
        } else {
          cssClass += "idle";
        }
        return (
          "<div class='" +
          cssClass +
          "' style='width:" +
          relWidth +
          `%;height:25%;display:${
            block ? "block" : "inline-block"
          };margin-top:${px}px;margin-left:${leftpx * 100}%;display:${falge}'>` +
          "</div>"
        );
      }
   // 根据定义类型判断颜色顺序
   gantt.templates.task_text = function (start, end, task) {
        let colorType = task.colorType;
        if (colorType === "j12" || colorType === "one") {
          return (
            renderLabel(task.progress1 + task.progress2,1,task.state,0,true,0) +
            renderLabel(task.progress2,3,task.state,-8,true,task.progress2) +
            renderLabel(task.progress3 + task.progress2,2,task.state,10,false,task.progress1));
        } else if (colorType === "j21") {
          return (
            renderLabel(task.progress1 + task.progress2,3,task.state,0,true,0) +
            renderLabel(task.progress2+task.progress1, 2, task.state, 15, true, 0,) +
            renderLabel(task.progress3 + task.progress2,1,task.state,-30,false,task.progress1)
          );
        }else if (colorType === "b121") {
          return (
            renderLabel(task.progress1 + task.progress2,1,task.state,0,true,0,'block') +
            renderLabel(task.progress2, 2, task.state, 15, true, task.progress1,'none') +
            renderLabel(task.progress3 + task.progress2,1,task.state,-38,false,task.progress2,'none'));
        }
        else if (colorType === "b121s") {
          return (
            renderLabel(task.progress1 + task.progress2,1,task.state,0,true,0,'block') +
            renderLabel(task.progress2, 2, task.state, 15, true, task.progress1,'none') +
            renderLabel(task.progress3 + task.progress2,1,task.state,-38,false,task.progress2,'none'));
        }
         else if (colorType === "b12") {
          if(task.actualStart == null){
            return (
            renderLabel(task.progress3 + task.progress2+task.progress1,1,task.state,0,true,0,'block') +
            renderLabel(task.progress2, 2, task.state, 15, true, task.progress1,'none') +
            renderLabel(task.progress1 + task.progress2,1,task.state,-38,false,task.progress2,'block'));
          }else{
            return (
            renderLabel(task.progress3 + task.progress2+task.progress1,1,task.state,0,true,0,'block') +
            renderLabel(task.progress2, 2, task.state, 15, true, task.progress1,'block') +
            renderLabel(task.progress1 + task.progress2,1,task.state,-38,false,task.progress2,'block'));
          }
         
        } else if (colorType === "b21") {
          return (
            renderLabel(task.progress2, 1, task.state, 0, true,task.progress1) +
            renderLabel(1 - task.progress2,3,task.state,-8,true,task.progress2,'block')+
            renderLabel(task.progress2+task.progress3,2,task.state,10,false,0)
            );
        } else if (colorType === "l12") {
          return (
            renderLabel(task.progress1,1,task.state,0,true,0) +
            renderLabel(task.progress3, 2, task.state, 15, true, task.progress2+task.progress1) +
            renderLabel(1,3,task.state,-30,false,task.progress1));
        } else if (colorType === "l21") {
          return (
            renderLabel(task.progress3, 1, task.state, 0, true,task.progress1+task.progress2) +
            renderLabel(task.progress1, 2, task.state, 15, true, 0) +
            renderLabel(task.progress2+task.progress1,3,task.state,-30,true,0));
        }else if(colorType === "l12s"){
          return (
            renderLabel(task.progress3, 1, task.state, 0, true,task.progress1-task.progress2) +
            renderLabel(task.progress1, 2, task.state, 15, true, 0) +
            renderLabel(task.progress1-task.progress2,3,task.state,-30,true,0)+
            renderLabel(task.progress1-task.progress3,3,task.state,-8,true,(task.progress1-task.progress2)+(task.progress3))
            );
        }
         else if (colorType === "ts12") {
          return (
            // renderLabel(task.progress1, 1, task.state) +
            // renderLabel(task.progress2, 2, task.state) +
            renderLabel(task.progress1 + task.progress2,1,task.state,0,false,0));
        } else if (colorType == "ts13") {
          return (
            renderLabel(task.progress2, 1, task.state, 0, true,0) +
            renderLabel(task.progress1, 2, task.state, 15, true, task.progress3) +
            renderLabel(task.progress3,3,task.state,-30,true,task.progress2)
          )
          
        }else if(colorType == "ts14"){
          return (
            renderLabel(task.progress1, 1, task.state, 0, true,0)
            // renderLabel(task.progress1, 2, task.state, 15, true, task.progress3) +
            // renderLabel(task.progress3,3,task.state,-30,true,task.progress2)
          )
        }
         else {
          return (
            renderLabel(task.progress1 + task.progress2,1,task.state,0, true,0) +
            renderLabel(task.progress2, 2, task.state, 15, true, task.progress2) +
            renderLabel(task.progress3 + task.progress2,3,task.state,-38,false,task.progress2));
        }
      };
      gantt.plugins({ marker: true, tooltip: true }); // 开启marker插件
      var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
      var today = new Date();
      // 添加固定时间线
      gantt.addMarker({
        start_date: today,
        css: "today",
        text: "今日:" + moment(new Date()).format("YYYY-MM-DD"),
        title: "Today: " + dateToStr(today),
      });
      // 提示框内容
      gantt.templates.tooltip_text = function (start, end, task) {
        return (
          "<b>任务内容:</b>" +
          task.text +
          "<br/><b>计划开始:</b> " +
          task.planStart +
          "<br/><b>计划结束:</b> " +
          task.planEnd +
          "<br/><b>实际开始:</b> " +
          task.actualStart +
          "<br/><b>实际结束:</b> " +
          task.actualEnd
        );
      };
  
      gantt.config.scale_unit = "year";
      gantt.config.step = 1;
      gantt.config.date_scale = "%Y";
      //当右侧不止显示年份时，可以添加展示月日，添加一个就加一行
      gantt.config.subscales = [{ unit: "month", step: 1, date: "%m" }];
      //甘特图右侧表头的高度
      gantt.config.scale_height = 80;
      //使用中文
      gantt.i18n.setLocale("cn");
      //自适应甘特图的尺寸大小, 使得在不出现滚动条的情况下, 显示全部任务
      gantt.config.autosize = true;
      //只读模式
      gantt.config.readonly = true;
      //是否显示左侧树表格
      gantt.config.show_grid = true;
      //表格列设置
      gantt.config.columns = [
        {
          name: "text",
          label: "任务内容",
          width: "120",
          align: "center",
          tree: true,
        },
        { name: "planStart", label: "计划开始", width: "100", align: "center" },
        { name: "planEnd", label: "计划结束", width: "100", align: "center" },
        { name: "actualStart", label: "实际开始", width: "100", align: "center" },
        { name: "actualEnd", label: "实际结束", width: "100", align: "center" },
      ];
      //任务条上的文字大小 以及取消border自带样式
      gantt.templates.task_class = function () {
        return "firstLevelTask";
      };
        
      // 初始化
      gantt.init(this.$refs.gantt);
      // 数据解析
      console.log("mounted", this.tasks);
      gantt.parse(this.tasks);
      let ziji = document.querySelectorAll(".gantt_cell");
      console.log("ziji", ziji);
    },
    methods: {
      undapta() {},
   initData(data) {
        // 处理数据
        let sucdate = data;
        sucdate.map((item, index) => {
          item.task = item.scheduleNameCn;
          item.taskEn = item.scheduleNameEn;
          item.planStart = item.scheduleBeginDate;
          item.planEnd = item.scheduleEndDate;
          item.actualStart = item.actualBeginDate;
          item.actualEnd = item.actualEndDate;
          item.parent = item.parentId;
        });
        let arr = sucdate;
        let newArr = [];
        arr.forEach((item, index) => {
          let obj = this.getDate(
            item.planStart,
            item.planEnd,
            item.actualStart,
            item.actualEnd
          );
          newArr.push({
            id: item.id,
            text: item.task,
            textEn: item.taskEn,
            start_date: new Date(moment(obj.minTime).format("YYYY-MM-DD")),
            end_date: new Date(moment(obj.maxTime).format("YYYY-MM-DD")),
            progress1: Math.abs(obj.progress1),
            progress2: Math.abs(obj.progress2),
            progress3: Math.abs(obj.progress3),
            duration: obj.duration,
  
            planStart: item.planStart,
            planEnd: item.planEnd,
            actualStart: item.actualStart,
            actualEnd: item.actualEnd,
            state: obj.state,
            colorType: obj.colorType,
            parent: item.parent,
          });
        });
        gantt.clearAll();
        this.tasks.data = newArr;
        console.log("newarrrrrr", newArr);
        // 初始化
        gantt.init(this.$refs.gantt);
        // 数据解析
        gantt.parse(this.tasks);
      },
      expandAllTasks() {
        gantt.eachTask((task) => {
          gantt.open(task.id);
        });
      },
      getDate(Atime, Btime, Ctime, Dtime) {
        let obj = {};
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = String(currentDate.getMonth() + 1).padStart(2, "0");
        let day = String(currentDate.getDate()).padStart(2, "0");
  
        let formattedDate = `${year}-${month}-${day}`;
  
        let arr = [
          Atime == null ? (Atime = formattedDate) : Atime,
          Btime == null ? (Btime = formattedDate) : Btime,
          Ctime == null ? ((Ctime = Atime), (Dtime = Btime)) : Ctime,
          Dtime == null ? (Dtime = Btime) : Dtime,
        ];
        let timeArr = [];
        arr.forEach((item) => {
          timeArr.push(new Date(item));
        });
        let minTime = moment(Math.min(...timeArr)).format("MM-DD-YYYY");
        let maxTime = moment(Math.max(...timeArr)).format("YYYY-MM-DD");
        let duration = this.difference(minTime, maxTime);
  
        let progress1 = 0;
        let progress2 = 0;
        let progress3 = 0;
        let state = true;
        let colorType = true;
  
        if (Atime < Ctime && Ctime < Btime && Btime < Dtime) {
          // console.log('12相交', index)
          colorType = "j12";
          progress2 = this.difference(Ctime, Btime) / duration;
          progress1 = this.difference(Atime, Ctime) / duration;
          progress3 = this.difference(Btime, Dtime) / duration;
        }else if (
          Ctime>Atime&&Btime == Dtime ) {
          // console.log('1包含2', index)
          colorType = "b121";
          state = true;
          progress2 = this.difference(Ctime, Dtime) / duration;
          progress1 = this.difference(Atime, Ctime) / duration;
          progress3 = this.difference(Dtime, Btime) / duration;
        }else if( Atime > Ctime && Dtime == Btime ){
            colorType = "b121s";
          state = true;
          progress2 = this.difference(Atime, Btime) / duration;
          progress1 = this.difference(Ctime, Atime) / duration;
          progress3 = this.difference(Btime, Dtime) / duration;
        }
        else if (
          Btime > Ctime &&
          Btime >= Dtime &&
          Ctime >= Atime &&
          Dtime > Atime
        ) {
          // console.log('1包含2', index)
          colorType = "b12";
          state = true;
          progress2 = this.difference(Ctime, Dtime) / duration;
          progress1 = this.difference(Atime, Ctime) / duration;
          progress3 = this.difference(Dtime, Btime) / duration;
        } else if (
          Dtime >= Btime &&
          Dtime > Atime &&
          Atime == Ctime &&
          Btime > Ctime
        ) {
          // console.log('2包含1', index)
          colorType = "b21";
          state = true;
          progress2 = this.difference(Atime, Btime) / duration;
          progress1 = this.difference(Ctime, Atime) / duration;
          progress3 = this.difference(Btime, Dtime) / duration;
        }
        
        else if (Btime > Dtime && Dtime > Atime && Atime > Ctime) {
          // console.log('21相交', index)
          colorType = "j21";
          state = true;
          progress2 = this.difference(Atime, Dtime) / duration;
          progress1 = this.difference(Ctime, Atime) / duration;
          progress3 = this.difference(Dtime, Btime) / duration;
        } else if (Btime < Ctime) {
          // console.log('12相离')
          colorType = "l12";
          state = true;
          progress2 = this.difference(Btime, Ctime) / duration;
          progress1 = this.difference(Atime, Btime) / duration;
          progress3 = this.difference(Ctime, Dtime) / duration;
        }else if(Dtime > Btime && Atime > Ctime){
          colorType = "l12s";
          state = true;
          progress2 = this.difference(Dtime, Atime) / duration;
          progress3 = this.difference(Atime, Btime) / duration;
          progress1 = this.difference(Ctime, Dtime) / duration;
        }
         else if (Dtime < Atime) {
          // console.log('21相离')
          colorType = "l21";
          state = true;
          progress2 = this.difference(Dtime, Atime) / duration;
          progress3 = this.difference(Atime, Btime) / duration;
          progress1 = this.difference(Ctime, Dtime) / duration;
        } else if (Dtime == Btime && Ctime == Atime) {
          colorType = "ts12";
          // colorType = "l21";
          state = false;
          progress2 = this.difference(Btime, Atime) / duration;
          progress3 = this.difference(Atime, Btime) / duration;
          progress1 = this.difference(Btime, Atime) / duration;
        } else if (Dtime > Btime && Ctime == Btime) {
          colorType = "ts13";
          // colorType = "l21";
          state = true;
          progress2 = this.difference(Atime, Btime) / duration;
          progress1 = this.difference(Ctime, Atime) / duration;
          progress3 = this.difference(Btime, Dtime) / duration;
        }
         else {
          colorType = "one";
          console.log("状态错误");
        }
        obj = {
          state: state,
          minTime: minTime,
          maxTime: maxTime,
          duration: duration * 1,
          progress1: progress1 * 1,
          progress2: progress2 * 1,
          progress3: progress3 * 1,
          colorType: colorType,
        };
        return obj;
      },
      difference(beginTime, Dtime) {
        var dateBegin = new Date(beginTime);
        var dateEnd = new Date(Dtime);
        var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
        return dayDiff;
      },
    },
  };
  </script>
  <style lang="scss">
  html,
  body {
    height: 100%;
    padding: 0px;
    margin: 0px;
    overflow: hidden;
  }
  
  .legend {
    padding: 10px;
    display: flex;
  
    .legendBox {
      display: flex;
      align-items: center;
      margin-right: 20px;
  
      .legendSml {
        width: 30px;
        height: 16px;
        border-radius: 5px;
        margin-right: 4px;
      }
  
      .legendColor1 {
        background: #01aff4;
      }
      .legendColor2 {
        background: #0169bd;
      }
      .legendColor3 {
        background:#adb837;
      }
    }
  }
  .tab_attachments {
    width: 100%;
  }
   .gantt_task_content {
    position: relative;
    // display: flex;
    background-color: white;
  }
  
   .gantt_task_line {
    background: #0169bd;
  }
  
   .custom_progress {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    height: 100%;
  }
  .nearly_done {
    background-color: #01aff4 !important;
  }
  
  .in_progress {
    //相交时间
    background-color: #0169bd !important;
  }
  
  .in_progress_w {
    background-color: #01aff4 !important;
  }
   .tshu {
    background-color: #adb837 !important;
  }
  .idle {
    background: #01aff4 !important;
  }
  .firstLevelTask {
    border: none;
  }
  
  .secondLevelTask {
    border: none;
  }
  
  .left-container {
    height: 600px;
  }
  .form_box {
    height: 100%;
    background-color: #fff;
  }
  ::v-deep.gantt_tooltip {
    padding: 10px;
    position: absolute;
    z-index: 10000;
    white-space: nowrap;
  }
  ::v-deep .gantt_tooltip {
    z-index: 19999; /* 设置一个较高的z-index值 */
  }
  </style>
  
  
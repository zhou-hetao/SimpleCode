<template>
   <div class="echarts_box" id="main"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/src/chart/pie";
export default {
  data() {
    return {
      echartsInit:[
        {
          id:1,
          value:100,
          name:"总数据"
        },
        {
          id:12,
          value:15,
          name:"计划数据"
        },
        {
          id:15,
          value:25,
          name:"实际数据"
        }
      ],
    };
  },
    mounted(){
        this.exachrsRender()
    },
   methods:{
    exachrsRender() {
      let chartDom = document.getElementById("main");
      let myChart = echarts.init(chartDom);
      let option;

      console.log("echartsInit", this.echartsInit);
      const colors = ["#4472c4", "#ed7d31", "#a5a5a5", "#ffc000", "#5b9bd5"];
      option = {
        color: colors,
        title: {
          text: "项目检验状态总览",
          subtext: "Overview of project inspection status",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["合格", "带滞留接收", "不合格", "拒收", "取消"],
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: this.echartsInit,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
   }
}
</script>

<style lang="scss" scoped>
.echarts_box{
    width: 500px;
    height: 500px;
}

</style>
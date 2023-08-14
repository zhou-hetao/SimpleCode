<template>
  <div>
    <div class="echarts_box" id="mainTwo"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/src/chart/pie";
import "echarts-gl";
export default {
    data() {
        return {
            optionData: [
        {
          name: "通过",
          value: 50,
          itemStyle: {
            opacity: 1,
            color: "#4d7dd2",
          },
        },
        {
          name: "不通过",
          value: 25,
          itemStyle: {
            opacity: 1,
            color: "#fd8839",
          },
        },
        {
          name: "取消/延迟",
          value: 25,
          itemStyle: {
            opacity: 1,
            color: "#b2b2b2",
          },
        },
      ],
        };
    },
    mounted(){
        this.echartsPie()
    },
   methods:{
    echartsPie() {
      let hoveredIndex = "";
      // let chartDom = this.$refs["basicDataPie"];
      let myChart = echarts.init(document.getElementById("mainTwo"));
      const getPie3D = (pieData, internalDiameterRatio) => {
        //internalDiameterRatio:透明的空心占比
        let series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        let k = 1;
        pieData.sort((a, b) => {
          return b.value - a.value;
        });
        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i++) {
          sumValue += pieData[i].value;
          let seriesItem = {
            name:
              typeof pieData[i].name === "undefined"
                ? `series${i}`
                : pieData[i].name,
            type: "surface",
            parametric: true,
            wireframe: {
              show: false,
            },
            pieData: pieData[i],
            pieStatus: {
              selected: false,
              hovered: false,
              k: k,
            },
            radius: "50%",
            center: ["10%", "10%"],
          };

          if (typeof pieData[i].itemStyle != "undefined") {
            let itemStyle = {};
            typeof pieData[i].itemStyle.color != "undefined"
              ? (itemStyle.color = pieData[i].itemStyle.color)
              : null;
            typeof pieData[i].itemStyle.opacity != "undefined"
              ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
              : null;
            seriesItem.itemStyle = itemStyle;
          }
          series.push(seriesItem);
        }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
          endValue = startValue + series[i].pieData.value;
          series[i].pieData.startRatio = startValue / sumValue;
          series[i].pieData.endRatio = endValue / sumValue;
          series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            series[i].pieData.value
          );
          startValue = endValue;
        }
        let boxHeight = getHeight3D(series, 10); //通过传参设定3d饼/环的高度，26代表26px
        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        let option = {
          backgroundColor: "#fff",
          tooltip: {
            backgroundColor: "black",
            formatter: (params) => {
              if (
                params.seriesName !== "mouseoutSeries" &&
                params.seriesName !== "pie3d"
              ) {
                let bfb = (
                  (option.series[params.seriesIndex].pieData.endRatio -
                    option.series[params.seriesIndex].pieData.startRatio) *
                  100
                ).toFixed(2);
                return (
                  `${params.seriesName}<br/>` +
                  `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
                  `${bfb}%`
                );
              }
            },
          },
          legend: {
            bottom: "3%",
            itemGap: 20,
            icon: "path://M0,12L12,12C12,5.37258,6.62742,0,0,0L0,12Z",
          },
          title: {
            text: "项目检验进展情况",
            left: "center",
            top: "2%",
            textStyle: {
              fontWeight: 500,
              fontSize: 16,
              color: "#3D3D3D",
            },
          },
          xAxis3D: {
            min: -1,
            max: 1,
          },
          yAxis3D: {
            min: -1,
            max: 1,
          },
          zAxis3D: {
            min: -1,
            max: 1,
          },
          grid3D: {
            show: false,
            boxHeight: boxHeight,
            top: "-30",
            left: "10",
            bottom: "60%",
            environment: "auto",
            viewControl: {
              distance: 300, //远近
              alpha: 25, //饼图X轴旋转
              beta: -70, //饼图Y轴旋转
              autoRotate: false, //自动旋转
            },
          },
          series: series,
        };
        return option;
      };

      //获取3d丙图的最高扇区的高度
      const getHeight3D = (series, height) => {
        series.sort((a, b) => {
          return b.pieData.value - a.pieData.value;
        });
        return (height * 15) / series[0].pieData.value;
      };

      // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
      const getParametricEquation = (
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        h
      ) => {
        // 计算
        let midRatio = (startRatio + endRatio) / 2;
        let startRadian = startRatio * Math.PI * 2;
        let endRadian = endRatio * Math.PI * 2;
        let midRadian = midRatio * Math.PI * 2;
        // 如果只有一个扇形，则不实现选中效果。
        if (startRatio === 0 && endRatio === 1) {
          isSelected = false;
        }
        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== "undefined" ? k : 1 / 3;
        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
        let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        let hoverRate = isHovered ? 1.05 : 1;
        // 返回曲面参数方程
        return {
          u: {
            min: -Math.PI,
            max: Math.PI * 2,
            step: Math.PI / 32,
          },
          v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 80,
          },
          x: function (u, v) {
            if (u < startRadian) {
              return (
                offsetX +
                Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            if (u > endRadian) {
              return (
                offsetX +
                Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
          },
          y: function (u, v) {
            if (u < startRadian) {
              return (
                offsetY +
                Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            if (u > endRadian) {
              return (
                offsetY +
                Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
          },
          z: function (u, v) {
            if (u < -Math.PI * 0.5) {
              return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
              return Math.sin(u) * h * 0.1;
            }
            return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
          },
        };
      };

      let option = getPie3D(this.optionData, 0.8);
      //是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      option.series.push({
        // name: "pie3d",
        type: "pie",
        label: {
          color: "black",
          fontSize: 16,
          //  position: 'inner',
          // formatter: "{b}\n\n",
          // padding: [0, -40],
          formatter: (item) => {
            //  console.log(item)
            return item.data.name + ":" + item.data.value + "";
          },
        },
        labelLine: {
          showAbove: false,
          length: 20, // 视觉引导线第一段的长度
          length2: 40, // 视觉引导项第二段的长度
          lineStyle: {
            color: "#686868", // 改变标示线的颜色
            width: 1,
            type: "solid", // 线的类型
          },
        },
        data: this.optionData,
        // startAngle: -25, //起始角度，支持范围[0, 360]。
        clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ["65%", "65%"],
        center: ["55%", "48%"], //指示线的位置
        itemStyle: {
          opacity: 0,
        },
      });
      option && myChart.setOption(option);

      myChart.on("mouseover", function (params) {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        let i;

        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          return;

          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== "") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected = option.series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            startRatio = option.series[hoveredIndex].pieData.startRatio;
            endRatio = option.series[hoveredIndex].pieData.endRatio;
            k = option.series[hoveredIndex].pieStatus.k;
            i =
              option.series[hoveredIndex].pieData.value ===
              option.series[0].pieData.value
                ? 35
                : 10;
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            option.series[hoveredIndex].parametricEquation =
              getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                i
              );
            option.series[hoveredIndex].pieStatus.hovered = isHovered;

            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = "";
          }

          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (
            params.seriesName !== "mouseoutSeries" &&
            option.series[params.seriesIndex].pieStatus
          ) {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected = option.series[params.seriesIndex].pieStatus.selected;
            isHovered = true;
            startRatio = option.series[params.seriesIndex].pieData.startRatio;
            endRatio = option.series[params.seriesIndex].pieData.endRatio;
            k = option.series[params.seriesIndex].pieStatus.k;

            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            option.series[params.seriesIndex].parametricEquation =
              getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                option.series[params.seriesIndex].pieData.value + 5
              );
            option.series[params.seriesIndex].pieStatus.hovered = isHovered;

            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex;
          }

          // 使用更新后的 option，渲染图表
          myChart.setOption(option);
        }
      });
    },
   },

}
</script>

<style lang="scss" scoped>
.echarts_box{
    width:100vw;
    height: 500px;
}
</style>
<template>
  <div>
    <top title1="数据统计" title2="数据列表"></top>
    <div class="bottom">
      <div id="main" class="main_container"></div>
    </div>
  </div>
</template>

<script>
import top from "./content_top.vue"
import http from '../http'
export default {
  props: {},
  data() {
    return {};
  },
  // 折线图
  mounted() {
        http({
          url:'reports/type/1'
        }).then((res)=>{
            console.log(res)
        });
    var chartDom = document.getElementById("main");
    var myChart = this.$echarts.init(chartDom);
    var option;
    option = {
      title: {
        text: "用户来源",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["华东", "Union Ads", "Video Ads", "Direct", "Search Engine"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };

    option && myChart.setOption(option);
  },
  methods: {},
  components: {
    top,
  },
};
</script>

<style scoped lang="scss">
.bottom{
    width: 1800px;
    height: 1000px;
    border-radius: 10px;
    padding: 25px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    #main{
        width: 80%;
        height: 80%;
    }
}
</style>

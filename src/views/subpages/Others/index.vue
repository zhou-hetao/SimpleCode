<template>
  <div>
    <!-- 数据统计页面（——后开发）
    <div class="some-panel">
      <div v-drag drag-min-top="80" :style="{'height':'20px','background-color':'pink'}">拖动我</div>
    </div>

    <div v-resize="true" style="width: 100px;height: 100px;border: 1px solid red;">可以拖动并调整大小</div>



    <div v-draggable class="draggable-element" style="width: 100px;height: 100px;border: 1px solid red;">拖动我！</div> -->
    <!-- <div class="container">
    <div class="box" v-dragWidth ></div> -->
    <!-- </div> -->
    <div style="height: 80vh">
      <!-- 船舶含油类交付月度统计表 -->
      <vxe-grid
        class="multi-header"
        ref="cargoGrid3"
        :merge-cells="mergeCells"
        v-bind="gridOptionsCargo2"
        :data="tableData2"
        :footer="footerData"
      >
        <template #operate="{ row }">
          <el-button class="btnOp-blue" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button class="btnOp-red" @click="handleDel(row)">删除</el-button>
        </template>
      </vxe-grid>
      <!-- 船舶含油类交付月度统计表弹窗 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="100%">
        <!-- 表单 -->
        <el-form
          ref="bilgeWater"
          class="form-bottom"
          :model="formData"
          :rules="rules"
        >
          <table class="mailTable" style="width: 100%">
            <colgroup>
              <col width="10%" />
              <col width="15%" />
              <col width="10%" />
              <col width="15%" />
              <col width="10%" />
              <col width="15%" />
              <col width="10%" />
              <col width="15%" />
            </colgroup>
            <tr>
              <td class="column is-required">船舶</td>
              <td>
                <el-form-item prop="field101">
                  <el-select
                    v-model="formData.field101"
                    placeholder="请选择船舶"
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in field101Options"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td class="column is-required">管船单位</td>
              <td>
                <el-form-item prop="field102">
                  <el-input
                    v-model="formData.field102"
                    placeholder="请输入管船单位"
                    clearable
                  >
                  </el-input>
                </el-form-item>
              </td>
              <td class="column is-required">残油交付总量</td>
              <td>
                <el-form-item prop="field103">
                  <el-input
                    v-model="formData.field103"
                    placeholder="请输入残油交付总量"
                    clearable
                  >
                  </el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="column is-required">含油污水交付量</td>
              <td>
                <el-form-item prop="field104">
                  <el-input
                    v-model="formData.field104"
                    placeholder="请输入含油污水交付量"
                    clearable
                  >
                  </el-input>
                </el-form-item>
              </td>
              <td class="column is-required">总费用</td>
              <td>
                <el-form-item prop="field105">
                  <el-input
                    v-model="formData.field105"
                    placeholder="请输入总费用"
                    clearable
                    :style="{ width: '100%' }"
                  >
                  </el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
      </el-dialog>
      <!-- 船舶新水统计表 -->
      <vxe-grid
        class="multi-header"
        ref="cargoGrid"
        v-bind="gridOptionsCargo3"
        :data="tableData3"
        :footer="footerData3"
      >
        <template #operate="{ row }">
          <el-button class="btnOp-blue" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button class="btnOp-red" @click="handleDel(row)">删除</el-button>
        </template>
      </vxe-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      gridOptionsCargo2: {
        border: true,
        stripe: true,
        resizable: true,
        // height: 430,
        showFooter: true,
        footerMethod: this.footerMethod,
        height: "auto",
        showHeaderOverflow: true,
        showOverflow: true,
        align: "center",
        columns: [
        ,
          {
            type: "seq",
            title: "序号",
            fixed: "left",
            width: 60,
            dataIndex: "seq",
            footerspan: 2,
          },
          {
            field: "veessid",
            title: "船舶",
            width: 140,
            dataIndex: "veessid",
            footerspan: 1,
          },
          { field: "dw", title: "管船单位", minWidth: 140 },
          {
            title: "残油",
            children: [{ field: "delivery", title: "交付总量m³" }],
          },
          {
            title: "含油污水",
            children: [{ field: "sewage", title: "交付量m³" }],
          },
          { field: "price", title: "总费用(元)", width: 140 },
          {
            title: "操作",
            fixed: "right",
            minWidth: 260,
            slots: { default: "operate" },
          },
          // {
          //   type: "seq",
          //   title: "序号",
          //   fixed: "left",
          //   width: 60,
          //   dataIndex: "seq",
          //   footerspan: 2,
          // },
          // {
          //   field: "veessid",
          //   title: "船舶",
          //   width: 140,
          //   dataIndex: "veessid",
          //   footerspan: 1,
          // },
          // { field: "dw", title: "管船单位", minWidth: 140 },
          // {field: "delivery", title: "港口",},
          // {field: "data",title: "日期",},
          // { field: "price", title: "期初加水总量(吨)", width: 140 },
          // { field: "price", title: "加水数量(吨)", width: 140 },
          // { field: "price", title: "期末加水总量(吨)", width: 140 },
          // { field: "price", title: "单价(元)", width: 140 },

          // { field: "price", title: "服务费(元)", width: 140 },
          // { field: "price", title: "费用(元)", width: 140 },

          // { field: "price", title: "期初加水总费用费用(元)", width: 140 },
          // { field: "price", title: "期末加水总费用费用(元)", width: 140 },


          // {
          //   title: "操作",
          //   fixed: "right",
          //   minWidth: 260,
          //   slots: { default: "operate" },
          // },
        ],
        data: [],
      },
      tableData2: [
        {
          id: 1,
          veessid: "1号",
          dw: "ccse",
          delivery: "15",
          sewage: "22",
          price: "15000",
        },
        {
          id: 2,
          veessid: "1号",
          dw: "ccse",
          delivery: "15",
          sewage: "22",
          price: "15000",
        },
      ],
      mergeCells: [],
      footerData: [],
      formData: {
        field101: undefined,
        field102: undefined,
        field103: undefined,
        field104: undefined,
        field105: undefined,
      },
      rules: {
        field101: [
          {
            required: true,
            message: "请选择船舶",
            trigger: "change",
          },
        ],
        field102: [
          {
            required: true,
            message: "请输入管船单位",
            trigger: "blur",
          },
        ],
        field103: [
          {
            required: true,
            message: "请输入残油交付总量",
            trigger: "blur",
          },
        ],
        field104: [
          {
            required: true,
            message: "请输入含油污水交付量",
            trigger: "blur",
          },
        ],
        field105: [
          {
            required: true,
            message: "请输入总费用",
            trigger: "blur",
          },
        ],
      },
      field101Options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      gridOptionsCargo3: {
        border: true,
        stripe: true,
        resizable: true,
        // height: 430,
        showFooter: true,
        footerMethod: this.footerMethod3,
        height: "auto",
        showHeaderOverflow: true,
        showOverflow: true,
        align: "center",
        columns: [
        {
            type: "seq",
            title: "序号",
            fixed: "left",
            width: 60,
            dataIndex: "seq",
            footerspan: 2,
          },
          {
            field: "veessid",
            title: "船舶",
            width: 140,
            dataIndex: "veessid",
            footerspan: 1,
          },
          { field: "dw", title: "管船单位", minWidth: 140 },
          { field: "delivery", title: "港口", minWidth: 140},
          { field: "data",title: "日期", minWidth: 140},
          { field: "period", title: "期初加水总量(吨)", width: 140 },
          { field: "snum", title: "加水数量(吨)", width: 140 },
          { field: "periodend", title: "期末加水总量(吨)", width: 140 },
          { field: "price", title: "单价(元)", width: 140 },

          { field: "charge", title: "服务费(元)", width: 140 },
          { field: "expense", title: "费用(元)", width: 140 },

          { field: "periodexpense", title: "期初加水总费用费用(元)", width: 180 },
          { field: "periodendexpense", title: "期末加水总费用费用(元)", width: 180 },


          {
            title: "操作",
            fixed: "right",
            minWidth: 260,
            slots: { default: "operate" },
          }
        ],
        data: [],
      },
      tableData3:[
        {veessid:"2号船",dw:"一",delivery:"天津港",data:"2022-5-30",period:"20",snum:"15",periodend:"15",price:"152",charge:"10",expense:"15",periodexpense:"150",periodendexpense:"5488"},
        {veessid:"3号船",dw:"二",delivery:"宁波港",data:"2022-5-30",period:"20",snum:"15",periodend:"15",price:"152",charge:"10",expense:"45",periodexpense:"150",periodendexpense:"5488"},
      
      ],
    footerData3:[]

    };
  },
  methods: {
    handleEdit(row) {
      this.dialogVisible = true;
    },
    handleDel(row) {},
    footerMethod() {
      let price = 0;
      let veessidNum = "";
      let dw = "";
      let delivery = 0;
      let sewage = 0;
      this.tableData2.forEach((item, index) => {
        price += Number(item.price);
        delivery += Number(item.delivery);
        sewage += Number(item.sewage);
      });
      this.footerData = [["合计", "", "", delivery, sewage, price]];
      return this.footerData;
    },
    footerMethod3() {
     let period = 0
     let snum = 0
     let periodend = 0
     let price = 0
     let charge = 0
     let expense = 0
     let periodexpense = 0
     let periodendexpense = 0
      this.tableData3.forEach((item, index) => {
        period += Number(item.period);
        snum += Number(item.snum);
        periodend += Number(item.periodend);
        price+=Number(item.price)
        charge+=Number(item.charge)
        expense+=Number(item.expense)
        periodexpense+=Number(item.periodexpense)
        periodendexpense += Number(item.periodendexpense)
      });
      this.footerData3 = [["合计","", "", "","", period, snum, periodend,price,charge,expense,periodexpense,periodendexpense]];
      return this.footerData3;
    },
  },
};
</script>

<style lang="scss" scoped>
.some-panel {
  width: 200px;
  height: 140px;
  position: absolute;
  border: 1px solid red;
}
.some-panel[dragged] {
  height: 200px;
}
.container {
  position: relative;
  width: 400px;
  height: 300px;
  border: 1px solid #ccc;
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background-color: #ff0000;
  border: 2px solid #000;
}
</style>
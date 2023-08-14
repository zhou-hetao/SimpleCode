<template>
  <div class="home">
    <el-container>
      <el-aside width="210px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
            >
              <el-menu-item index="/Worktable">
                <i class="el-icon-menu"></i>
                <span slot="title">工作台</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-orange"></i>
                  <span>图表渲染</span>
                </template>
                <!-- <el-menu-item-group>
          <template slot="title">甘特图</template>
          <el-menu-item index="/Worktable/gantt">多种横道图</el-menu-item>
          <template slot="title">echarts</template>
          <el-menu-item >饼图</el-menu-item>
          <el-menu-item >3D饼图</el-menu-item>
        </el-menu-item-group> -->
                <el-menu-item-group>
                  <template slot="title">甘特图</template>
                  <el-menu-item>基础图表</el-menu-item>
                  <el-menu-item index="/Worktable/gantt"
                    >多种横道图</el-menu-item
                  >
                </el-menu-item-group>
                <el-menu-item-group>
                  <template slot="title">echarts</template>
                  <el-menu-item index="/Worktable/echarts">饼图</el-menu-item>
                  <el-menu-item index="echarts3d">3D饼图</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-view"></i>
                  <span>标准规范</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item>代码规范</el-menu-item>
                  <el-menu-item>业务字典</el-menu-item>
                  <el-menu-item>数据字典</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <div class="hearder_box">
            <p>欢迎{{ username }}登录</p>
            <el-radio-group @change="handleChange" v-model="lang" style="float: right"> 
        <el-radio label="zh">{{$t('message.zh')}}</el-radio>
        <el-radio label="en">{{$t('message.en')}}</el-radio>
      </el-radio-group>
            <!-- <el-button size="mini" type="primary" @click="Download">
           
          </el-button> -->
            <!-- <a :href="downloadUrl" download>下载文件</a>
            <el-upload
              action="http://127.0.0.1:7001/api/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload> -->
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { fileVue } from "@/api/file/index";
import {getWindowInit} from "@/api/window/index"
import { getLanguage } from '@/lang';
export default {
  components: {},
  data() {
    return {
      username: "游客",
      lang:"zh",
      downloadUrl: `${process.env.VUE_APP_BASE_URL}/api/download`, // 模板下载文件地址
      dialogImageUrl: '',
        dialogVisible: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    Download() {
      fileVue().then((res) => {
        console.log(res);
      });
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(this.dialogImageUrl);
      },
      handleChange(){
        localStorage.setItem('language',this.lang)
        this.$i18n.locale = getLanguage()
        // location.reload()
      }
  },
  mounted() {
    this.lang = localStorage.getItem('language')
    // this.username = this.$store.state.user;
    // getWindowInit().then((res)=>{
    //   console.log('电脑信息',res);
    // })
    // console.log(this.$store.state);
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.home {
  width: 100%;
  height: 100vh;
  background-color: #e6e6e6;
  .hearder_box {
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    box-sizing: border-box;
    padding: 0 20px;
    font-size: 20px;
  }
}
.el-container {
  display: flex;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  height: 100%;
}
.el-row {
  box-sizing: border-box;
  height: 100%;
}
.el-col-12 {
  width: 100%;
  height: 100%;
}
.el-menu {
  border-right: solid 1px #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #fff;
  height: 100%;
}
</style>
<template>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="app" name="second">
        <div style="padding-top: 15%;padding-left:35%;">
          <div style="width: 300px;height: 400px;background: #86DB48">
            <div style="font-size: 20px;padding-top: 30px;padding-left: 105px;color: white">APP下载</div>
            <!-- <vue-qr  :logoSrc="config.logo" :text="config.value" :size="200" :margin="0"></vue-qr> -->
            <vue-qr style="padding-left: 50px;padding-top: 30px" :text="config.propertyUrl" :size="200" :margin="0"></vue-qr>
            <div style="font-size: 20px;padding-left: 60px;padding-top: 20px;color: white">扫一扫下载最新版本</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
</template>

<script>
  import VueQr from 'vue-qr'
  import {MultipartAPI} from "../../api/api";

  export default {
    name: "qrPage",
    components: {VueQr},
    data : function () {
      return {
        activeName: 'second',
        config: {
          securityUrl: MultipartAPI+'/appVersionManager/urlLatest?appType=1&clientType=2#mp.weixin.qq.com',//显示的值、跳转的地址
          securityImagePath: require('../../assets/logo.png'),//中间logo的地址
          propertyUrl: MultipartAPI+'/appVersionManager/urlLatest?appType=1&clientType=3#mp.weixin.qq.com',//显示的值、跳转的地址
          propertyImagePath: require('../../assets/logo.png'),//中间logo的地址
          logisticsUrl: MultipartAPI+'/appVersionManager/urlLatest?appType=1&clientType=1#mp.weixin.qq.com',//显示的值、跳转的地址
          logisticsImagePath: require('../../assets/logo.png'),//中间logo的地址
        },
      }
    },
    mounted() {
    },
    methods: {
    },
  }
</script>

<style scoped>

</style>

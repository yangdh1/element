<template>

    <div class="about-container">
       <div class="about-page-bg" :style="aboutPageStyle"></div>
        <div class="about-left">
          <img src="static/imgs/about-phone.png" width="500" alt="" style="margin-top: 10px;">
        </div>
        <div class="about-right">
          <h2 class="title">综合办公管理系统</h2>
          <h2 class="sub-title">- 机关服务局</h2>
          <div>
            <img class="qrcode-img" src="static/imgs/android-qrcode.png" width="240" alt="" style="margin-right: 50px">
            <img class="qrcode-img" src="static/imgs/ios-qrcode.png" width="240" alt="">
          </div>

          <p class="desc">随时随地，设备控制  &emsp; 掌上浏览，设备状态</p>
          <p class="desc">告警信息，随时接收  &emsp; 因为专注，所以专业</p>
        </div>
    </div>

</template>

<script>
export default {
  name: 'about',

  data() {
    return{
      aboutPageStyle:{
        background:'url(' + require('../../../static/imgs/about-bg.png') + ')'
      }
    }
  },
  mounted(){
      //console.log(this.$store.state);
  },
  methods: {

  },
  created() {
        // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">


  .about-page-bg{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-size: 100% 100%!important;
  }
  .about-container{
    width: 1200px;
    margin: 0 auto;
    padding:40px 0 20px 0;
  }
  .desc{
    margin: 20px 0;
    font-size: 14px;
    letter-spacing: 10px;
    color: #fff;
    opacity: 0.9;
  }
  .qrcode-img{
    display: inline-block;
    border-radius: 20px;
  }
  .title{
    font-size: 48px;
    letter-spacing: 5px;
    color: #fff;
    font-weight: 700;
  }
  .sub-title{
    font-size: 18px;
    color: #fff;
    margin-bottom: 25px;
    font-style: italic;
  }
  .about-left{
    float: left;
  }
  .about-right{
    margin-left: 620px;
    margin-top: 50px;
  }
</style>

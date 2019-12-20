<template>
  <!--<div>-->
    <!--<mt-button @click.native="openPicker('picker')" size="large">点击弹出 DateTime Picker</mt-button>-->
    <!--<mt-datetime-picker-->
      <!--ref="picker"-->
      <!--type="time"-->
      <!--v-model="pickerValue">-->
    <!--</mt-datetime-picker>-->
  <!--</div>-->
</template>

<script>

  import API from '../../api'
  import moment from 'moment';
  import Vue from 'vue';
  import 'mint-ui/lib/style.css'
  import { DatetimePicker,Button } from 'mint-ui';
  Vue.component(DatetimePicker.name, DatetimePicker);
  Vue.component(Button.name, Button);
  export default {
    components: {
    },
    name: 'app',
    data: function() {
      return {
        pickerValue: ''
      }
    },
    mounted(){

    },
    methods: {
      openPicker() {
        this.$refs.picker.open();
      }
    }
  }

</script>
<style  scoped lang="scss" rel="stylesheet/scss">

  .el-carousel__item {
    color: #475669;
    font-size: 14px;
    margin: 0;
    text-align: center;
    img{
      height: 100%;
    }
  }
  .index-menu-block{
    margin: 20px;
  }
  .index-menu-item{
    display: block;

    background: -moz-linear-gradient(45deg, #444D58 0%, #62a1ff 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#444D58), color-stop(100%,#62a1ff));
    background: -webkit-linear-gradient(45deg, #444D58 0%,#62a1ff 100%);
    background: -o-linear-gradient(45deg, #444D58 0%,#62a1ff 100%);
    background: -ms-linear-gradient(45deg, #444D58 0%,#62a1ff 100%);
    background: linear-gradient(45deg, #444D58 0%,#62a1ff 100%);
    height: 85px;
    border-radius: 4px;
    text-align: center;
    color: #fff;
    position: relative;
    transition: all 0.3s;
    top:0;
    &:hover{
      top:-1px;
      box-shadow: 0 10px 10px rgba(0,0,0,0.2);
    }

    i,p{
      color: inherit;
      text-shadow: rgba(0,0,0,0.3);
    }
    i{
      font-size: 46px;
      padding-top: 5px;
      display: block;
      height: 50px;
      width: 70px;
      margin: 0 auto;
    }
    p{
      font-weight: 700;
      margin-top: 5px;
    }
  }
  .index-panel{
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 20px;
    .index-panel-title{
      border-radius: 4px 4px 0 0 ;
      height: 32px;
      line-height: 32px;
      padding-left: 15px;
      border-bottom: 1px solid #ddd;
      background: #f1f1f1;
      position: relative;
    }
    .index-panel-box{
      padding:10px 15px;
      position: relative;
    }
  }
  .index-things-list{
    padding: 0;
    margin: 0;
    li{

      >a{
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 32px;
        line-height: 32px;
      }

    }
  }
  .index-things-more{
    position: absolute;
    top:0px;
    right:10px;
    font-size: 12px;
  }
</style>

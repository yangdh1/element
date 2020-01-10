<template>
  <div class="navbar">
    <!--<a href="#/index" class="navbar-logo">
      <img src="static/imgs/logo.png" alt="">
    </a>-->
    <a href="#/index" class="navbarUrl">
      微沙管理平台
    </a>
    <div class="user-info">
      <span class="name">{{name}}</span>
      <span class="navbar-split-line">|</span>

      <a href="javascript:void(0)" @click="diaVisible = true">修改密码</a>
      <span class="navbar-split-line">|</span>
      <a href="javascript:void(0)" @click="logout">安全退出</a>
    </div>

    <change-pwd :isShow.sync="diaVisible"></change-pwd>
    <msg-box :isShow.sync="msgVisible"></msg-box>

  </div>
</template>

<script>
  import { ChangePwd,MsgBox } from '../dialog'
export default {
  components: {
    ChangePwd,
    MsgBox
  },
  data: function() {
    return {
      diaVisible: false,
      msgVisible: false,
    }
  },
  mounted(){
    console.log(this.$store.getters.userInfo)
  },
  computed:{
    name:  function () {
      return this.$store.getters.userInfo.name
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push({ path: '/login' });
        location.reload()
      },()=>{
        //this.loading = false;
      });
    },
    about(){
      this.$router.push({ path: '/about' });
    }
  }


}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/sass/_variables.scss";
  .io-dot{
    position: absolute;
    right: -5px;
    top:-3px;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: red;;
    background-color: #f56c6c;
    color: #fff;
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #fff;
  }
  .navbar{
    height: 40px;
    background: $maincolor;
    padding:0 15px;
    position: relative;
    .navbar-logo{
      float: left;
      height: 40px;
      img{
        height: 33px;
        margin-top: 2px;
      }
    }
    .navbarUrl{
      float: left;
      line-height: 40px;
      color: #ffffff;
      font-size: 20px;
    }
    .user-info{
      float: right;
      height: 40px;
      line-height: 40px;
      color: #fff;
      vertical-align: middle;
      a{
        color: inherit;
        &:hover{
          text-decoration: underline;
        }
      }
      .name{
        img{
          display: block;
          height: 30px;
          margin-top: 4px;
          float: left;
          margin-right: 5px;
        }
      }
      .navbar-split-line{
        opacity: 0.6;
        margin: 0 6px;
      }
    }
  }
</style>

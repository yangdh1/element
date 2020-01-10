<template>
  <div class="login-container" :style="loginContainerStyle">

    <div class="login-box">
     <!-- <div class="login-right">
        <img class="login-right-img" src="static/imgs/login-r-img.jpg" alt="">
      </div>-->
      <div class="login-left">
        <br>
        <div class="login-type-box">
          <a href="javascript:void(0)" :class="{ active: loginType==1 }" @click="loginType=1">微沙后台管理</a>
          <!--<a href="javascript:void(0)" :class="{ active: loginType==2 }" @click="loginType=2">手机登录</a>-->
        </div>

        <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules"
                 ref="loginForm" label-position="left">

          <el-form-item prop="mobile" label="账号">
            <el-input name="userName" type="text" v-model="loginForm.mobile" autoComplete="on" placeholder="请输入账号" />
          </el-form-item>

          <el-form-item prop="password" label="密码">
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                      placeholder="请输入密码" />
            <span class='show-pwd' @click='showPwd'><i class="el-icon-view"></i></span>
          </el-form-item>

          <br>
          <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>

        </el-form>
        <div class="left-copy">
          <p>@版权所有：微沙</p>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
export default {
  name: 'login',

  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    };
    return {
      loginType: 1,
      loginContainerStyle:{
        background: '#444D58'
      },
      loginTitleStyle:{
      },
      loginForm: {
        mobile:'',
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur', message: '账号不能为空'}],
        mobile: [{ required: true, trigger: 'blur', message: '账号不能为空'}],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      pwdType: 'password',
      loading: false,
      showDialog: false
    }
  },
  mounted(){
      //console.log(this.$store.state);
  },
  methods: {

    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
//          this.$router.push({ path: '/' })
            this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
              this.loading = false;
              this.$router.push({ path: '/index' });
                  // this.showDialog = true
            },()=>{
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false
        }
      })
    },
    afterQRScan() {

    }
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
  $bg:#2d3a4b;
  $dark_gray:#889aa4;

  .login-title{
    width: 280px;
    margin: 0 auto;
    display: block;
    margin-bottom: 25px;
  }
  .login-box{
    width: 1080px;
    position: absolute;
    left: 50%;
    margin-left: -540px;
    top:12%;
    background: #fff;
    height: 480px;
    border-radius: 12px;
    box-shadow: 0px 0px 18px rgba(0,0,0,0.3);

    .login-left{
      position: absolute;
      right: 25px;
      width: 280px;
      height: 330px;
      border-radius: 12px;
      padding:20px;
      .login-type-box{
        display: flex;
        margin-bottom: 22px;
        a{
          flex: 1;
          display: block;
          width: 50%;
          padding:8px 0;
          text-align: center;
          color: #666;
          border-bottom: 2px solid #666;
          &.active{
            color:darken(#444D58,10);
            border-bottom-color: darken(#444D58,10);
          }
        }
      }
    }
    .login-right{
      position: absolute;
      left: 0;
      .login-right-img{
        height: 480px;
        width: 750px;
        border-radius:  0 12px 12px 0 ;
      }
    }
  }
  .left-desc{
    font-size: 26px;
    color: #53aad7;
    margin-bottom: 30px;
    border-bottom: 1px solid #ddd;
    text-indent: 15px;
  }
  .left-copy{
    color: #999;
    margin-top: 20px;
    text-align: center;
    font-size: 12px;
  }
  .login-container {
//    @include relative;
    height: 100vh;
    background-color: #f5fcf2;
    /*background-size: cover!important;*/
    background-repeat: repeat;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: #f5fcf2;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #333;
    }
    .el-input {
      display: inline-block;
      width: 80%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 14px;
      }
    }
    .title {
      font-size: 26px;
      color: #444D58;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .el-form-item  input{
      border: 1px solid #ddd;
      background: #f5fcf2;
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 15px;
      top: 0px;
      font-size: 14px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>

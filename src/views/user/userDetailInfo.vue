<template>
  <div class="page-content">
    <div class="bs-header">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="返回" name="-1"></el-tab-pane>
        <el-tab-pane label="用户详情" name="0">
          <el-row>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>基本信息:</span>
                    </div>
                    <div class="item text">
                      <el-row>
                        <el-col :span="5">头像:</el-col>
                        <el-col :span="16">
                          <div class="block">
                            <el-image :src="userAccountInfo.imageUrls">
                              <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                              </div>
                            </el-image>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="5">昵称:</el-col>
                        <el-col :span="16">{{userAccountInfo.nickName==null?"---":userAccountInfo.nickName}}</el-col>
                      </el-row>
                      <el-row>
                           <el-col :span="5">账号:</el-col>
                           <el-col :span="16">{{userAccountInfo.mobile}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="5">性别:</el-col>
                        <el-col :span="16"><div>{{userAccountInfo.sex==1?"男":"女"}}</div></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="5">地址:</el-col>
                        <el-col :span="16">{{userAccountInfo.address}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="5">注册时间:</el-col>
                        <el-col :span="16">
                          <div>{{userAccountInfo.createTimeDate}}</div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>账户信息:</span>
                    </div>
                    <div  class="text item">
                        <el-row>
                          <el-col :span="5">账户余额:</el-col>
                          <el-col :span="16"><div>{{userAccountInfo.moneyBalance==null?"---":userAccountInfo.moneyBalance}}</div></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="5">心币余额:</el-col>
                          <el-col :span="16"><div>{{userAccountInfo.coinBalance==null?"---":userAccountInfo.coinBalance}}</div></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="5">359共享基金:</el-col>
                          <el-col :span="16"><div>{{userAccountInfo.ordinaryBalance}}</div></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="5">股票共享基金:</el-col>
                          <el-col :span="16"><div>{{userAccountInfo.stockBalance}}</div></el-col>
                        </el-row>
                    </div>
                  </el-card>
                </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="认证信息"
                     name="1"
                     v-loading.body="isLoading"
                     :disabled="userAccountInfo.whetherAutonym==1">
          <el-row>
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>实名认证:</span>
                </div>
                <div class="item text">
                  <el-row>
                    <el-col :span="5">真实姓名:</el-col>
                    <el-col :span="16">{{userAccountInfo.name}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">身份证:</el-col>
                    <el-col :span="16">{{userAccountInfo.idCard}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">所在地址:</el-col>
                    <el-col :span="16"><div>{{userAccountInfo.address}}</div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">身份证正面</el-col>
                    <el-col :span="16">
                      <div class="block">
                        <el-image :src="userAuthValidateInfo.idCardFrontImageSrc">
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">身份证反面</el-col>
                    <el-col :span="16">
                      <div class="block">
                        <el-image :src="userAuthValidateInfo.idCardBackImageSrc">
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>企业认证:</span>
                </div>
                <div  class="text item">
                  <el-row>
                    <el-col :span="5">企业全称:</el-col>
                    <el-col :span="16">
                      <div>{{userAuthValidateInfo.companyName==null?"---":userAuthValidateInfo.companyName}}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">企业信用代码:</el-col>
                    <el-col :span="16">
                      <div>{{userAuthValidateInfo.companyCode==null?"---":userAuthValidateInfo.companyCode}}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">营业执照副本</el-col>
                    <el-col :span="16">
                      <div class="block">
                        <el-image :src="userAuthValidateInfo.companyLicenseImage">
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import API from '../../api'
  import ElOption from "../../../node_modules/element-ui/packages/select/src/option.vue";
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  import {MultipartAPI} from "../../api/api";
  import {base64_encode} from "../../utils/base64Encode";
  export default {
    components: {
      ElRow,
      ElCol,
      ElOption
    },
    data() {
      return {
        activeName: '0',
        primaryKey:'',
        isLoading:false,
        //用户基本信息
        userAccountInfo:{
          photoUrl:'',
          nickName:'',
          mobile:'',
          sex:1,
          addressName:'',
          address:'',
          createTimeDate:'',
          imageUrls:'',
          whetherAutonym:''
        },
        //用户认证信息
        userAuthValidateInfo:{
          userId:'',
          roleType:'',  // 1为普通用户 2 为律师 3为企业4.web用户
          idCard:'',
          photo:'',
          whetherAutonym:'',    // 1 未实名认证 2 已实名认证
          idCardFrontImageSrc:'',
          idCardBackImageSrc:'',
          companyName:'',
          companyCode:'',
          companyLicenseImage:'',
          validateType:''   //认证类型
        }
      };
    },
    mounted(){
       this.primaryKey=this.$route.params.id;
       if (this.primaryKey!=null){
          this.loadUserDetailInfo(this.primaryKey);
       }else{
           this.$message({
               showClose: true,
               message: '[ID丢失] 查看详情失败! ',
               type: 'error',
               onclose:function () {
                 this.$router.push({path: '/userManage/userList'});
               }
           });
       }
    },
    methods: {
      loadUserDetailInfo(primaryKey){
        console.log("--------加载用户详情信息,ID["+primaryKey+"]");
        let that=this;
        let key="userAccount_"+primaryKey;
        let userAccountInfoJsonStr= localStorage.getItem(key);
        if (userAccountInfoJsonStr==null){
          that.$notify.error({
            message: '用户信息获取失败!'
          });
          setTimeout(function () {
            that.reverting();
          },2000);
        }else{
          that.userAccountInfo= JSON.parse(userAccountInfoJsonStr);
          console.log("--------用户账户本1111111111111111111地缓存信息------",this.userAccountInfo);
          if ( that.userAccountInfo.photo !== null) {
            console.log("--------用户账户本1111111111111111111地缓存信息------",this.userAccountInfo.photoUrl);
            this.convertUrls1(that.userAccountInfo.photo);
          }

        }
      },

      //加载用户认证信息
      loadUserAuthValidateDetail(primaryKey){
        let that=this;
        that.isLoading=true;
        API.user.userValidateInfo({id:primaryKey}).then(res => {
          if (res!=null){
            let companyLicenseImage= res.companyLicenseImage;
            if (companyLicenseImage!=null&&companyLicenseImage.length>0){
                res.companyLicenseImage=this.convertUrls(companyLicenseImage);
            }
            let idCardBackImageSrc=res.idCardBackImageSrc;
            if (idCardBackImageSrc!=null&&idCardBackImageSrc.length>0){
              res.idCardBackImageSrc=this.convertUrls(idCardBackImageSrc);
            }
            let idCardFrontImageSrc=res.idCardFrontImageSrc;
            if (idCardFrontImageSrc!=null&&idCardFrontImageSrc.length>0){
              res.idCardFrontImageSrc=this.convertUrls(idCardFrontImageSrc);
            }
            let photo=res.photo;
            if (photo!=null&&photo.length>0){
              res.photo=this.convertUrls(photo);
            }
            that.userAuthValidateInfo=res;
            that.isLoading=false;
          }
          else{
            this.$message.warning("用户认证信息加载失败,稍后重试!");
            that.isLoading=false;
          }
          console.log("---ID["+primaryKey+"]------加载用户认证信息,响应结果------",that.userAuthValidateInfo);
          return;
        });
        setTimeout(function () {
          if (that.isLoading==true){
            that.isLoading=false;
            that.$message({
              message: '加载用户认证信息失败!,请稍后重试~',
              type: 'warning'
            });
          }
          },5000)
        },
      //返回列表
      reverting(){
        this.$router.push({path: '/userManage/userList'});
      },
      //拼接路径
      convertUrls1(imagePaths) {
        if (imagePaths !== null && imagePaths !== '') {
          console.log("--------用户账户本地缓存信息------",       imagePaths);
          let    url = MultipartAPI+'/getFileFromEncodeParam?encodePath='+base64_encode(imagePaths);
          this.userAccountInfo.imageUrls=url;
          console.log("--------用----------------222222222222222222222222222------",        this.userAccountInfo.imageUrls);
        }
      },
      convertUrls(prefixUrl){
        let    url ="";
        if (prefixUrl!=null&&prefixUrl!=undefined&&prefixUrl.length>0){
          url = MultipartAPI+'/getFileFromEncodeParam?encodePath='+base64_encode(prefixUrl);
        }
        return url;
      },

      //切换
      handleClick(tab) {
        //返回按钮
        if (tab.name=="-1"){
          this.$router.push({path: '/userManage/userList'});
        }
        if (tab.name=="1"){
          this.loadUserAuthValidateDetail(this.primaryKey);
        }
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .dev-add-avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .dev-add-avatar-uploader .el-upload:hover {
    border-color: #999;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .img_style {
    width: 200px;
    height: 200px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    margin-left: 30px;
  }

  .box-card {
    width: 90%;
    height: 800px;
  }
</style>

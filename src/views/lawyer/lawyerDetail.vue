<template>
  <div class="page-content">
    <div class="bs-header">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="返回" name="-1"></el-tab-pane>
        <el-tab-pane label="律师详情" name="0">
          <el-row>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>基本信息</span>
                    </div>
                    <div class="item text">
                      <el-row>
                           <el-col :span="2">账户:</el-col>
                           <el-col :span="6">18174403058</el-col>
                      </el-row>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>账户信息</span>
                    </div>
                    <div  class="text item">

                    </div>
                  </el-card>
                </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="认证信息" name="1">
          <div>
            <el-form   size="medium" style="width: 80%" label-position="left">
              <!--基本信息-->
              <el-row>
                <div><strong>实名认证信息</strong></div>
                <el-row :gutter="20">
                  <el-col :span="8">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </el-col>
                </el-row>
                <el-row :gutter="10" style="left: 70px">
                  <el-col :span="7">
                    真实姓名：{{lawyerAuthValidateInfo.name}}
                  </el-col>
                  <el-col :span="7">
                    身份证号：{{lawyerAuthValidateInfo.idCard}}
                  </el-col>
                  <el-col :span="7">
                    所在地区：{{lawyerAuthValidateInfo.addressName}}
                  </el-col>
                </el-row>
                <el-row :gutter="10"style="left: 140px;width: 900px">
                  <el-col :span="7">
                    <el-form-item label="身份证正面: ">
                      <div>
                        <img class="img_style" :src="lawyerAuthValidateInfo.idCardFrontImageSrc" alt="身份证正面">
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="身份证反面: ">
                      <div >
                        <img class="img_style" :src="lawyerAuthValidateInfo.idCardBackImageSrc" alt="身份证反面">
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div><strong>律师认证信息</strong></div>
                <el-row :gutter="20">
                  <el-col :span="8">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </el-col>
                </el-row>
                <el-row :gutter="20" style="left: 70px">
                  <el-col :span="7" >
                    单位/律所：{{lawyerAuthValidateInfo.company}}
                  </el-col>
                  <el-col :span="7">
                    学校/专业： {{lawyerAuthValidateInfo.schoolName}}
                  </el-col>
                </el-row>
                <el-row :gutter="10"style="left: 140px">
                  <el-col :span="7">
                    <el-form-item label="学位证书副本: ">
                      <div >
                        <img class="img_style" :src="lawyerAuthValidateInfo.certificatePathUrls" alt="">
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10"style="left: 140px">
                  业务专长：{{lawyerAuthValidateInfo.userCaseName}}
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </el-col>
                </el-row>
                <el-row :gutter="10"style="left: 140px;width: 600px">
                  简&nbsp;介：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{lawyerAuthValidateInfo.introduction}}
                </el-row>
                <el-row :gutter="10"style="left: 140px">
                  <el-col :span="7">
                    <el-form-item label="执业证明: ">
                      <div >
                        <img class="img_style" :src="lawyerAuthValidateInfo.onePractisingCertificatePathUrsl" alt="执业证明">
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="法律执业资格证书: ">
                      <div>
                        <img class="img_style" :src="lawyerAuthValidateInfo.twoPractisingCertificatePathUrls" alt="法律执业资格证书">
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" style="left: 170px">
                  <el-col :span="7" >
                    执业时间： {{lawyerAuthValidateInfo.OnePracticeTime}}
                  </el-col>
                  <el-col :span="7">
                    执业时间： {{lawyerAuthValidateInfo.TwoPracticeTime}}
                  </el-col>
                </el-row>
                <el-row :gutter="20" style="left: 170px">
                  <el-col :span="7" >
                    执业证号：{{lawyerAuthValidateInfo.certificateNumber}}
                  </el-col>
                  <el-col :span="7">
                    执业证号： {{lawyerAuthValidateInfo.TwocertificateNumber}}
                  </el-col>
                </el-row>
              </el-row>
            </el-form>
          </div>
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
        loading  : false,
        //账户信息
        lawyerAccountInfo:{},
        //认证信息
        lawyerAuthValidateInfo: {
          name:'',
          justCard:'',
          addressName:'',
          userCaseName:'',
          introduction:'',
          idCard:'',
          schoolName:'',
          OnePracticeTime:'',
          TwoPracticeTime:'',
          certificateNumber:'',
          TwocertificateNumber:'',
          company:'',
          idCardFrontImageSrc:'',
          idCardBackImageSrc:'',
        },
      };
    },
    mounted(){
       this.primaryKey=this.$route.params.id;
       console.log("-------律师详情查询主键ID--------",this.primaryKey);
       if (this.primaryKey!=null){
          this.loadLawyerAndAccountInfo(this.primaryKey);
       }else{
           this.$message({
               showClose: true,
               message: '[ID丢失] 查看详情失败! ',
               type: 'error',
               onlose:function () {
                 this.$router.push({path: '/userManage/lawyerList'});
               }
           });
       }
    },
    methods: {
      //从本地缓存中取出律师信息,存入是在列表跳转详情的时候记录的
      loadLawyerAndAccountInfo(primaryKey){
            let that=this;
            let key="lawyerAccount_"+primaryKey;
            let lawyerAccountInfoJsonStr= localStorage.getItem(key);
            if (lawyerAccountInfoJsonStr==null){
                  that.$notify.error({
                    message: '律师信息获取失败!'
                  });
                  setTimeout(function () {
                     that.reverting();
                  },2000);
            }else{
              that.lawyerAccountInfo= JSON.parse(lawyerAccountInfoJsonStr);
              console.log("--------律师账户本地缓存信息------",this.lawyerAccountInfo);
            }
           //加载认证信息
            this.loadLawyerAuthValidateDetail(this.primaryKey);
      },
      //认证信息
      loadLawyerAuthValidateDetail(primaryKey){
        this.loading=true;
        API.lawyer.detail({id:primaryKey}).then(res=>{
          console.log("-------获取律师详情-----",res);
          if (res !== null) {
            this.lawyerAuthValidateInfo.idCardFrontImageSrc=this.convertUrls(res.justCard);
            this.lawyerAuthValidateInfo.idCardBackImageSrc=this.convertUrls(res.againstCard);
            this.lawyerAuthValidateInfo.twoPractisingCertificatePathUrls=this.convertUrls(res.twoPractisingCertificatePath);
            this.lawyerAuthValidateInfo.onePractisingCertificatePathUrsl=this.convertUrls(res.onePractisingCertificatePath);
            this.lawyerAuthValidateInfo.name =res.name;
            this.lawyerAuthValidateInfo.idCard =res.idCard;
            this.lawyerAuthValidateInfo.introduction =res.introduction;
            this.lawyerAuthValidateInfo.addressName =res.addressName;
            this.lawyerAuthValidateInfo.userCaseName =res.userCaseName;
            this.lawyerAuthValidateInfo.company =res.company;
            this.lawyerAuthValidateInfo.schoolName =res.schoolName;
            this.lawyerAuthValidateInfo.OnePracticeTime =res.OnePracticeTime;
            this.lawyerAuthValidateInfo.TwoPracticeTime =res.TwoPracticeTime;
            this.lawyerAuthValidateInfo.certificateNumber =res.certificateNumber;
            this.lawyerAuthValidateInfo.TwocertificateNumber =res.TwocertificateNumber;
          }
          this.loading=false;
        });
      },
      //拼接路径
      convertUrls(prefixUrl){
        let    url ="";
        if (prefixUrl!=null&&prefixUrl!=undefined&&prefixUrl.length>0){
          url = MultipartAPI+'/getFileFromEncodeParam?encodePath='+base64_encode(prefixUrl);
        }
        return url;
      },
      //切换
      handleClick(tab) {
        if (tab.name=="-1"){
          this.$router.push({path: '/userManage/lawyerList'});
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
    width: 90%
  }
</style>

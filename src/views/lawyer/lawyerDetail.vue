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
                      <span>基本信息:</span>
                    </div>
                    <div class="item text">
                      <el-row>
                        <el-col :span="5">头像:</el-col>
                        <el-col :span="16">
                          <div class="block">
                            <div >
                              <img class="img_style" :src="imageUrls" alt="">
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="5">真实姓名:</el-col>
                        <el-col :span="16">{{lawyerAccountInfo.realName==null?"---":lawyerAccountInfo.realName}}</el-col>
                      </el-row>
                      <el-row>
                           <el-col :span="5">电话:</el-col>
                           <el-col :span="16">{{lawyerAccountInfo.mobile}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="5">性别:</el-col>
                        <el-col :span="16"><div>{{lawyerAccountInfo.sex==1?"男":"女"}}</div></el-col>
                      </el-row>

                <!--      <el-row>
                        <el-col :span="5">执业年数:</el-col>
                        <el-col :span="16">{{lawyerAccountInfo.practiceNumber==null?"-&#45;&#45;":lawyerAccountInfo.practiceNumber+"年"}}</el-col>
                      </el-row>-->
          <!--            <el-row>
                        <el-col :span="5">自我简介:</el-col>
                        <el-col :span="16">
                          <textarea>{{lawyerAccountInfo.introduction}}</textarea>
                        </el-col>
                      </el-row>-->
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
                          <el-col :span="5">关注人数:</el-col>
                          <el-col :span="16"><div>{{lawyerAccountInfo.followNum==null?"---":lawyerAccountInfo.followNum}}</div></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="5">服务次数:</el-col>
                          <el-col :span="16"><div>{{lawyerAccountInfo.serviceNum==null?"---":lawyerAccountInfo.serviceNum}}</div></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="5">账户余额:</el-col>
                          <el-col :span="16"><div>{{lawyerAccountInfo.lawyerEarningsBalance==null?"---":lawyerAccountInfo.lawyerEarningsBalance}}</div></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="5">心币余额:</el-col>
                          <el-col :span="16"><div>{{lawyerAccountInfo.coinBalance==null?"---":lawyerAccountInfo.coinBalance}}</div></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="5">累计收益:</el-col>
                          <el-col :span="16"><div>{{lawyerAccountInfo.lawyerEarningsBalance+lawyerAccountInfo.lawyerSumWithdraw}}</div></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="5">累计提现:</el-col>
                          <el-col :span="16"><div>{{lawyerAccountInfo.lawyerSumWithdraw==null?"---":lawyerAccountInfo.lawyerSumWithdraw}}</div></el-col>
                        </el-row>
                    </div>
                  </el-card>
                </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="认证信息" name="1">
          <el-row>
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>实名认证:</span>
                </div>
                <div class="item text">
                  <el-row>
                    <el-col :span="5">真实姓名:</el-col>
                    <el-col :span="16">{{lawyerAccountInfo.realName}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">身份证:</el-col>
                    <el-col :span="16">{{lawyerAccountInfo.idCard}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">所在地址:</el-col>
                    <el-col :span="16"><div>{{lawyerAccountInfo.address}}</div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">身份证正面</el-col>
                    <el-col :span="16">
                      <div class="block">
                        <div >
                          <img class="img_style1" :src="lawyerAuthValidateInfo.idCardFrontImageSrc" alt="">
                        </div>
                  <!--      <el-image :src="lawyerAuthValidateInfo.idCardFrontImageSrc">
                          <div slot="error" class="img_style">
                            <i class="el-icon-picture-outline"></i>
                          </div>

                        </el-image>-->
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">身份证反面</el-col>
                    <el-col :span="16">
                      <div class="block">
                        <div >
                          <img class="img_style1" :src="lawyerAuthValidateInfo.idCardBackImageSrc" alt="">
                        </div>
                     <!--   <el-image :src="lawyerAuthValidateInfo.idCardBackImageSrc">
                          <div slot="error" class="img_style">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>-->
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>律师认证</span>
                </div>
                <div  class="text item">
                  <el-row>
                    <el-col :span="5">单位/律所:</el-col>
                    <el-col :span="16">
                      <div v-if="lawyerAccountInfo.enterpriseType==1">{{lawyerAccountInfo.company==null?"---":lawyerAccountInfo.company}}</div>
                      <div v-if="lawyerAccountInfo.enterpriseType==2">{{lawyerAccountInfo.enterpriseName==null?"---":lawyerAccountInfo.enterpriseName}}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">学校/专业:</el-col>
                    <el-col :span="16">
                      <div>{{lawyerAuthValidateInfo.schoolName==null?"---":lawyerAuthValidateInfo.schoolName}}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">学位证书:</el-col>
                    <el-col :span="16">
                      <div class="block">
                        <div >
                          <img class="img_style2" :src="lawyerAuthValidateInfo.certificatePathUrls" alt="">
                        </div>
              <!--          <el-image :src="lawyerAuthValidateInfo.certificatePathUrls">
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>-->
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">业务专长:</el-col>
                    <el-col :span="16"><div>{{lawyerAuthValidateInfo.userCaseName}}</div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">简介:</el-col>
                    <el-col :span="16">
                      <div>{{lawyerAuthValidateInfo.introduction}}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">执业证明:</el-col>
                    <el-col :span="16">
                      <div class="block">
                        <div >
                          <img class="img_style2" :src="lawyerAuthValidateInfo.onePractisingCertificatePathUrsl" alt="">
                        </div>
                    <!--    <el-image :src="lawyerAuthValidateInfo.onePractisingCertificatePathUrsl">
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>-->
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                  <el-col :span="5">执业时间:</el-col>
                  <el-col :span="16">
                    <div>{{lawyerAuthValidateInfo.OnePracticeTime}}</div>
                  </el-col>
                </el-row>
                  <el-row>
                    <el-col :span="5">执业证号:</el-col>
                    <el-col :span="16">
                      <div>{{lawyerAuthValidateInfo.certificateNumber}}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">法律执业资格证书:</el-col>
                    <el-col :span="16">
                      <div class="block">
                        <div >
                          <img class="img_style2" :src="lawyerAuthValidateInfo.twoPractisingCertificatePathUrls" alt="">
                        </div>
                   <!--     <el-image :src="lawyerAuthValidateInfo.twoPractisingCertificatePathUrls">
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>-->
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">执业时间:</el-col>
                    <el-col :span="16">
                      <div>{{lawyerAuthValidateInfo.TwoPracticeTime}}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">执业证号:</el-col>
                    <el-col :span="16">
                      <div>{{lawyerAuthValidateInfo.TwocertificateNumber}}</div>
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
        imageUrls:'',
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
          certificatePathUrls:'',
          onePractisingCertificatePathUrsl:'',
          imageUrls:'',
          twoPractisingCertificatePathUrls:''

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
              if ( that.lawyerAccountInfo.photo !== null) {
                console.log("--------用户账户本1111111111111111111地缓存信息------",this.lawyerAccountInfo.photo);
                this.convertUrls1(that.lawyerAccountInfo.photo);
              }
              console.log("--------211212121211------",this.lawyerAccountInfo);
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
            this.lawyerAuthValidateInfo.certificatePathUrls=this.convertUrls(res.certificatePath);
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
      convertUrls1(imagePaths) {
        if (imagePaths !== null && imagePaths !== '') {
          console.log("--------用户账户本地缓存信息------",       imagePaths);
          let    url = MultipartAPI+'/getFileFromEncodeParam?encodePath='+base64_encode(imagePaths);
          this.imageUrls = url;
          console.log("--------用----------------222222222222222222222222222------",        this.imageUrls);
        }
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
    width: 130px;
    height: 130px;
  }
  .img_style1 {
    width: 250px;
    height: 250px;
  }
  .img_style2 {
    width: 100px;
    height: 100px;
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

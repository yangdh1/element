<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">
        <span>认证管理>认证审核</span>
      </div>
      <div  style="float: right;margin-right: 10px">
        <i class="el-icon-d-arrow-right"></i>
        <el-button size="small"  type="primary"  @click="revertingg">返回</el-button>
      </div>
    </div>
    <!--订单基本信息-->
    <div>
      <el-form ref="ruleForm"
               size="medium" style="width: 80%" label-position="left"
               v-loading.body="loading">
        <!--基本信息-->
        <el-row>
          <div><strong>实名认证信息</strong></div>
          <el-row :gutter="20">
            <el-col :span="8">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </el-col>
          </el-row>
          <el-row :gutter="10" style="left: 70px">
            <!--支付费用-->
            <el-col :span="7">
                真实姓名：{{form.name}}
            </el-col>
            <el-col :span="7">
              身份证号：{{form.idCard}}
            </el-col>
            <el-col :span="7">
              所在地区：{{form.addressName}}
            </el-col>
          </el-row>
          <el-row :gutter="10"style="left: 140px;width: 900px">
            <el-col :span="7">
              <el-form-item label="身份证正面: ">
                <div>
                  <img class="img_style" :src="imageUrls" alt="">
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="身份证反面: ">
                <div >
                  <img class="img_style" :src="againstCardurl" alt="">
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
              单位/律所：{{form.company}}
            </el-col>
            <el-col :span="7">
              学校/专业： {{form.schoolName}}
            </el-col>
          </el-row>
          <el-row :gutter="10"style="left: 140px">
            <el-col :span="7">
              <el-form-item label="学位证书副本: ">
                <div >
                  <img class="img_style" :src="certificatePathUrls" alt="">
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10"style="left: 140px">
            业务专长：{{form.userCaseName}}
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </el-col>
          </el-row>
          <el-row :gutter="10"style="left: 140px;width: 600px">
              简&nbsp;介：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{form.introduction}}
          </el-row>
          <el-row :gutter="10"style="left: 140px">
            <el-col :span="7">
              <el-form-item label="执业证明: ">
                <div >
                  <img class="img_style" :src="onePractisingCertificatePathUrsl" alt="">
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="法律执业资格证书: ">
                <div>
                  <img class="img_style" :src="twoPractisingCertificatePathUrls" alt="">
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="left: 170px">


            <el-col :span="7" >
              执业时间： {{form.OnePracticeTime}}
            </el-col>
            <el-col :span="7">
              执业时间： {{form.TwoPracticeTime}}
            </el-col>
          </el-row>
          <el-row :gutter="20" style="left: 170px">

            <el-col :span="7" >
              执业证号：{{form.certificateNumber}}
            </el-col>
            <el-col :span="7">
              执业证号： {{form.TwocertificateNumber}}
            </el-col>
          </el-row>

          <div><strong>审核结果</strong></div>

          <el-row :gutter="20">
            <el-col :span="8">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </el-col>
          </el-row>
          <el-row :gutter="10" style="left: 170px">
            <!--支付费用-->
            <el-radio v-model="status" label="2">通过</el-radio>
            <el-radio v-model="status" label="3">拒绝</el-radio>
          </el-row>
          <el-row :gutter="10" style="left: 170px">
            <el-col :span="10" v-if="this.status ==='3'">
                <el-input  type="textarea" :rows="5" style="width: 500px" v-model="reason" class="input_style" size="small"/>
            </el-col>
          </el-row>
        </el-row>
        <el-row :gutter="20" style="left: 170px">
          <el-row :gutter="20">
            <el-col :span="8">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </el-col>
          </el-row>  <el-row :gutter="20">
          <el-col :span="8">
            &nbsp;&nbsp;&nbsp;&nbsp;
          </el-col>
        </el-row>

          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="handleAudit('ruleForm')">保存
            </el-button>
            <el-button
              size="small"
              type="info"
              @click="revertingg">返回
            </el-button>
          </el-form-item>
        </el-row>

      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import API from '../../api'
  import ElOption from "../../../node_modules/element-ui/packages/select/src/option.vue";
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  import {MultipartAPI} from "../../api/api";
  import {base64_encode} from "../../utils/base64Encode";
  // import { Navbar, Sidebar, AppMain } from 'views/layout'
  export default {
    components: {
      ElRow,
      ElCol,
      ElOption
    },
    data: function () {
      return {
        status:'2',
        loading  : true,
        imageUrls:'',
        againstCardurl:'',
        reason:'',
        form: {
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

        },
      }

    },
    mounted() {
      API.lawyer.detail({id:this.$route.params.id}).then(res=>{
        console.log("==============================================")
        console.log(res)
        if (res !== null) {
          this.convertUrls(res.justCard);
        }
        if (res !== null) {
          this.twoPractisingCertificatePathUrls(res.twoPractisingCertificatePath);
        }
        if (res !== null) {
          this.onePractisingCertificatePathUrsl(res.onePractisingCertificatePath);
        }
        if (res !== null) {
          this.certificatePathUrls(res.certificatePath);
        }
        if (res !== null) {
          this.againstCardUrls(res.againstCard);
        }
        this.form.name =res.name;
        this.form.idCard =res.idCard;
        this.form.introduction =res.introduction;
        this.form.addressName =res.addressName;
        this.form.userCaseName =res.userCaseName;
        this.form.company =res.company;
        this.form.schoolName =res.schoolName;
        this.form.OnePracticeTime =res.OnePracticeTime;
        this.form.TwoPracticeTime =res.TwoPracticeTime;
        this.form.certificateNumber =res.certificateNumber;
        this.form.TwocertificateNumber =res.TwocertificateNumber;
        this.loading=false;
      });
    },
    methods: {

      convertUrls(imagePaths) {
        if (imagePaths !== null && imagePaths !== '') {
          let    url = MultipartAPI+'/getFileFromEncodeParam?encodePath='+base64_encode(imagePaths);
          this.imageUrls=url;
        }
      },
      twoPractisingCertificatePathUrls(imagePaths) {
        if (imagePaths !== null && imagePaths !== '') {
          let    url = MultipartAPI+'/getFileFromEncodeParam?encodePath='+base64_encode(imagePaths);
          this.twoPractisingCertificatePathUrls=url;
        }
      },
      onePractisingCertificatePathUrsl(imagePaths) {
        if (imagePaths !== null && imagePaths !== '') {
          let    url = MultipartAPI+'/getFileFromEncodeParam?encodePath='+base64_encode(imagePaths);
          this.onePractisingCertificatePathUrsl=url;
        }
      },
      certificatePathUrls(imagePaths) {
        if (imagePaths !== null && imagePaths !== '') {
          let    url = MultipartAPI+'/getFileFromEncodeParam?encodePath='+base64_encode(imagePaths);
          this.certificatePathUrls=url;
        }
      },
      againstCardUrls(imagePaths) {
        if (imagePaths !== null && imagePaths !== '') {
          let    url = MultipartAPI+'/getFileFromEncodeParam?encodePath='+base64_encode(imagePaths);
          this.againstCardurl=url;
        }
      },
      revertingg(){
        this.$router.push({path: '/authValidateManage/authValidateList'});
      },
      handleAudit(status) {
        let obj = {
          id: this.$route.params.id,
          status:this.status,
          reason: this.reason
        };
        console.log("1111111111111111111111111111111111111111111");

        console.log(obj);
          if (obj) {
            API.lawyer.updateLawyerStatus(obj).then(res => {
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.revertingg();
            })
          } else {
            console.log('error submit!!');
            return false;
          }




      },
    },

  }

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
</style>

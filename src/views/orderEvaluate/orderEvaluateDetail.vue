<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">订单详情</div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="form"
               size="small"
               label-width="110px">
        <el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="订单号" prop="orderCode" >
                <el-input v-model="form.orderCode" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="订单类型" prop="serviceType" >
                <el-input v-model="form.serviceType" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="撰写人" prop="createName" >
                <el-input v-model="form.createName" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="被评价人" prop="toName" >
                <el-input v-model="form.toName" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="综合评分" prop="avgGrade" >
                <el-input v-model="form.avgGrade" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="态度评分" prop="attitudeGrade" >
                <el-input v-model="form.attitudeGrade" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="专业评分" prop="professionalGrade" >
                <el-input v-model="form.professionalGrade" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="效率评分" prop="efficiencyGrade" >
                <el-input v-model="form.efficiencyGrade" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="创建时间" prop="createTime" >
                <el-input v-model="form.createTimeStr" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态" prop="evaluateStatus" >
                <el-input v-model="form.evaluateStatus" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="评价内容" prop="evaluateContent" >
                <el-input v-model="form.evaluateContent" type="textarea"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button
                size="small"
                type="info"
                @click="revertingg">返回</el-button>
            </el-form-item>

          </el-col>
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
  // import { Navbar, Sidebar, AppMain } from 'views/layout'
  export default {
    components: {
      ElRow,
      ElCol,
      ElOption
    },
    data: function () {
      return {
        form: {
          createId: '',
          lawyerId: '',
          orderCode: '',
          businessTypeCode: '',
          evaluateStatus: '',
          evaluateContent: '',
          evaluateAttachment: '',
          attitudeGrade: '',
          professionalGrade: '',
          efficiencyGrade: '',
          createTime: '',
          createName: '',
          createTimeStr: '',
          toName: '',
          serviceType: '',
          avgGrade: ''
        },
      }
    },
    mounted() {
      this.form.id = this.$route.params.id;

      //加载编辑信息
      this.loadEditData();

    },
    methods: {
      revertingg(){
        this.$router.push({path: '/system/orderEvaluate/orderEvaluate'});
      },
      loadEditData() {
        let obj = {id: this.form.id};
        API.orderEvaluate.detail(obj).then(res => {
          this.form = res;
          console.log("=============================");
          console.log(res);
        });
      },


      // submitUpload() {
      //   this.$refs.upload.submit();
      // }

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
</style>

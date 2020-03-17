<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">新增业务类型</div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="form"
               size="small"
               label-width="110px">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="业务类型名称" prop="skillName" :rules="commonRule">
              <el-input v-model="form.skillName" style="width: 217px"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" size="small" @click="onSubmit('ruleForm')">保存</el-button>
                <el-button type="info" size="small" @click="recurrence">返回</el-button>
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
  // import { Navbar, Sidebar, AppMain } from 'views/layout'
  export default {
    components: {ElOption},
    data: function () {
      return {
        BuildingArr:[],
        compoundArr:[],
        skillTypeArr: [],
        realNameArr: [],
        bureauList: [],
        departmentList: [],
        floorArr:[],
        form: {
          // serviceTypeName: '',
          // servicePriceUnit: ''
        },
        commonRule: [
          {required: true, message: '该项不能为空'}
        ],
      }
    },
    mounted() {
      // API.serviceType.list().then(res => {
      //   this.serviceTypeArr = res
      // });
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.form);
          if (valid) {
            if(this.form.internalFlag===false){
              this.form.personnelId='';
              /*     this.form.compoundId = res.compoundId;
                   this.form.buildingId = res.buildingId;
                   this.form.floorId = res.floorId;*/
              console.log( this.form.floorId );
              console.log("=================================");
            }
            API.skillType.add(this.form).then(res => {
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.$router.push({path: 'lawyerList.vue'});
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      recurrence() {
        this.$router.push({path: '/skillType/list'});

      },
      submitUpload() {
        this.$refs.upload.submit();
      }
      ,

      handleMobileNumberChang() {


    }
  }
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

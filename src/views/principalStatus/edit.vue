<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">编辑当事人诉讼类型</div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="form"
               :rules="rules"
               size="small"
               label-width="150px">
        <el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="当事人诉讼类型名称" prop="name" :rules="commonRule">
                <el-input v-model="form.name" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="描述" prop="description">
                <el-input v-model="form.description" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" size="small" @click="onSubmit('ruleForm')">保存</el-button>
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
        skillTypeArr: [],
        form: {
          adminFlag:false,
          status:'1'
        },
        commonRule: [
          {required: true, message: '该项不能为空'}
        ],
        rules: {

        }
      }
    },
    mounted() {
      //获取页面缓存
      this.form.id = this.$route.params.id;
      //加载编辑信息
      this.loadEditData();
    },
    methods: {
      revertingg(){
        this.$router.push({path: '/type/principalStatus/list'});
      },
      loadEditData() {
        let obj = {id: this.form.id};
        API.principalStatus.details(obj).then(res => {
          this.form = res;
          console.log(res)
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.principalStatus.update(this.form).then(res => {
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.$router.push({path: '/type/principalStatus/list'});
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      submitUpload() {
        this.$refs.upload.submit();
      }

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

<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">详细信息</div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="form"
               size="small"
               label-width="110px">
        <el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="业务类型名称" prop="skillName" >
                <el-input v-model="form.skillName" size="small" style="width: 250px"></el-input>
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
        skillTypeArr: [],
        form: {
          adminFlag:false,
          status:'1'
        },
      }
    },
    mounted() {
      this.form.id = this.$route.params.id;
      console.log(this.form.id);
      //加载编辑信息
      this.loadEditData();
    },
    methods: {
      revertingg(){
        this.$router.push({path: '/skillType/list'});
      },
      loadEditData() {
        let obj = {id: this.form.id};
        API.skillType.details(obj).then(res => {
          this.form = res;
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

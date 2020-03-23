<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">编辑角色</div>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form ref="ruleForm" :model="form" label-width="90px">
            <el-form-item label="角色名称" prop="name" :rules="commonRule">
              <el-input v-model="form.name" style="width: 500px" size="small"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" style="width: 500px" v-model="form.description" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="onSubmit('ruleForm')">保存</el-button>
              <el-button size="small" type="info" @click="recurrenc">返回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import API from '../../api'
  export default {
    data   : function() {
      return {
        form: {

        },
        commonRule: [
          {required: true, message: '该项不能为空'}
        ],
        rules: {
        }
      }
    },
    mounted(){
      API.role.detail({id:this.$route.params.id}).then(res=>{
        this.form = res;
      });
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.role.edit(this.form).then(res=>{
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.$router.push({path: '/sysAuthManage/role/list'});
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      recurrenc(){
          this.$router.push({path: '/sysAuthManage/role/list'});

      }
    }
  }
</script>

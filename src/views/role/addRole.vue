<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">新增角色</div>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form ref="ruleForm" :model="form" label-width="90px">
            <el-form-item label="角色名称" prop="name" :rules="commonRule">
              <el-input v-model="form.name" style="width: 500px" size="small"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" size="small" style="width: 500px" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                @click="onSubmit('ruleForm')">保存</el-button>
              <el-button
                          size="small"
                          type="info"
                          @click="recurrenc">返回</el-button>
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
          name  : '',
          description   : ''
        },
        commonRule: [
          {required: true, message: '该项不能为空'}
        ],
        rules: {
        }
      }
    },
    mounted(){
    },

    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.role.add(this.form).then(res => {
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.recurrenc();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      recurrenc(){
        this.$router.push({path: '/system/role/list'});
      },
    }
  }
</script>

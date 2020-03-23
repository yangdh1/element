<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">编辑管理员</div>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form ref="ruleForm" :model="form" label-width="110px">
            <el-form-item label="管理员账号" prop="name" :rules="commonRule">
              <el-input v-model="form.mobile" style="width: 300px" size="small"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name" :rules="commonRule">
              <el-input v-model="form.name" style="width: 300px" size="small"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mailbox">
              <el-input v-model="form.mailbox" style="width: 300px" size="small"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roleId" >
              <el-select v-model="form.roleId"
                         placeholder="请选择角色" style="width: 300px">
                <el-option v-for="item in roleArr"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="roleId" >
              <el-select v-model="form.deleteFlag"
                         placeholder="请选择角色" style="width: 300px">
                <el-option v-for="item in deleteFlagAll"
                           :key="item.deleteFlag"
                           :label="item.name"
                           :value="item.deleteFlag">
                </el-option>
              </el-select>
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
        roleArr:[],
        deleteFlagAll: [{deleteFlag:false ,name:"禁用"},{deleteFlag:true ,name:"启动"}],
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
      API.role.listAll().then(res => {
        this.roleArr = res
      });
      API.user.userdetail({id:this.$route.params.id}).then(res=>{
        this.form = res;
        console.log('error submit!!');
        console.log(res);
      });
    },

    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.user.updateupdate(this.form).then(res => {
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
        this.$router.push({path: '/sysAuthManage/administratorList'});
      },
    }
  }
</script>

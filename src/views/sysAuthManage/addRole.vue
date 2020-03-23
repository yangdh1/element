<template>
    <div class="page-content">
       <div class="bs-header bs-title" >
         <el-page-header @back="goBack" content="新增角色"></el-page-header>
       </div>
      <!--查询搜索条件-->
       <div  style="margin: 20px;width: 50%">
        <el-form size="small"
                 :label-position="labelPosition"
                 :rules="rules"
                  ref="newRoleForm"
                  label-width="80px"
                 :model="newRoleForm">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="newRoleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="roleDesc">
            <el-input v-model="newRoleForm.roleDesc" type="textarea"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('newRoleForm')">立即创建</el-button>
            <el-button @click="resetForm('newRoleForm')">重置</el-button>
          </el-form-item>
        </el-form>
       </div>
    </div>
</template>

<script>
    export default {
      name: "addRole",
      data(){
        return {
          labelPosition: 'right',
          newRoleForm: {
            roleName: '',
            roleDesc: '',
          },
          rules:{
            roleName:[
              { required: true, message: '请输入角色名称', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ]
          }
        }
      },
      methods:{
        //返回列表
        goBack(){
          this.$router.push({path: '/sysAuthManage/roleList'});
        },
        //表单提交
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('校验通过,提交数据到后台 submit!');
            } else {
              alert('校验失败,error');
              return false;
            }
          });
        },
        //表单重置
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>

</style>

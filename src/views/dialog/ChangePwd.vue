<template>
    <el-dialog
            title=""
            :visible.sync="isShow"
            :before-close="handleClose"
            width="30%">
        <el-form :model="form" ref="form" :rules="rules" size="small">
            <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPwd">
                <el-input type="password" v-model="form.oldPwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPwd">
                <el-input type="password" v-model="form.newPwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" prop="newPwdSecond">
                <el-input type="password" v-model="form.newPwdSecond" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose" size="small">取 消</el-button>
            <el-button type="primary" size="small" @click="changePwd('form')" >确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import API from '../../api'
    export default {
        props  : ['isShow'],
        data   : function() {
            return {
                form          : {
                    oldPwd    : '',
                    newPwd  : '',
                    newPwdSecond   : ''
                },
                rules: {
                    oldPwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
                    ],
                    newPwd: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
                    ],
                    newPwdSecond: [
                        { required: true, message: '请输入确认密码', trigger: 'blur' },
                        { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
                    ]
                },
                formLabelWidth: '90px'
            }
        },
        methods: {
          //修改密码
          changePwd(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                const loading = this.$loading({
                  lock: true,
                  text: '正在操作',
                  spinner: 'el-icon-loading'
                });
                let obj = {"password":this.form.oldPwd,"newPassword":this.form.newPwd,"confirmPassword":this.form.newPwdSecond};
                API.user.changePwd(obj).then(res => {
                  console.log(res)
                  this.$message.success('恭喜你，修改成功');
                  loading.close();
                  this.handleClose();
                });
              } else {
                console.log('error submit!!');
                return false;
              }
            });

          },
          handleClose(done) {
            this.$refs['form'].resetFields();
            this.$emit('update:isShow', false)
          }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">编辑分辨率</div>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form ref="ruleForm" :model="form" label-width="110px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="分辨率编码" prop="code" :rules="commonRule">
                  <el-input v-model="form.code" style="width: 500px" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="分辨率名称" prop="name" :rules="commonRule">
                  <el-input v-model="form.name" style="width: 500px" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="宽度" prop="width" :rules="commonRule">
                  <el-input v-model="form.width" style="width: 500px" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="长度" prop="length" :rules="commonRule">
                  <el-input v-model="form.length" style="width: 500px" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-form-item label="描述">
              <el-input type="textarea" size="small" style="width: 500px" v-model="form.description"></el-input>
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
      API.dpi.details({id:this.$route.params.id}).then(res=>{
        this.form = res;
      });
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.dpi.update(this.form).then(res=>{
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.$router.push({path: '/device/dpi/list'});
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      recurrenc(){
          this.$router.push({path: '/device/dpi/list'});

      }
    }
  }
</script>

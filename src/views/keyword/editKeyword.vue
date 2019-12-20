<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">修改关键字</div>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="16">
            <el-form ref="ruleForm" :model="form" label-width="90px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="编码" prop="code" :rules="commonRule">
                    <el-input v-model="form.code" style="width: 500px" size="small"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
            <el-form-item label="关键字" prop="name" :rules="commonRule">
              <el-input v-model="form.name" style="width: 500px" size="small"></el-input>
            </el-form-item>
              </el-col>
            </el-row>
              <el-row :gutter="20">
                <el-col :span="7">
                  <el-form-item label="数据类型" prop="valueType" :rules="commonRule">
                    <el-select v-model="form.valueType" placeholder="请选择" size="small" style="width: 500px">
                      <el-option v-for="item in valueTypeAll"
                                 :key="item.valueType"
                                 :label="item.valueTypename"
                                 :value="item.valueType">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="所属公司" prop="companyId" :rules="commonRule">
                  <el-select v-model="form.companyId"
                             style="width: 500px"
                             placeholder="请选择所属公司">
                    <el-option v-for="item in companyAll"
                               :key="item.id"
                               :label="item.name"
                               :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="默认值" prop="defaultValue" >
                    <el-input v-model="form.defaultValue" style="width: 500px" size="small"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            <el-form-item label="产品描述">
              <el-input type="textarea" v-model="form.description" size="small" style="width: 500px" ></el-input>
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
        companyAll:[],

        valueTypeAll:[
          {
            valueType:"int",
            valueTypename:"int"
          },
          {
            valueType:"Double",
            valueTypename:"Double"
          },
          {
            valueType:"String",
            valueTypename:"String"
          },
          {
            valueType:"Boolean",
            valueTypename:"Boolean"
          },

        ],
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
      API.keyword.details({id:this.$route.params.id}).then(res=>{
        this.form = res;
      });
      let obj = {id:0};
      API.company.companyAll(obj).then(res=>{
        this.companyAll = res
      });

    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.keyword.update(this.form).then(res=>{
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.$router.push({path: '/product/keyword/list'});
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      recurrenc(){
        this.$router.push({path: '/product/keyword/list'});

      }
    }
  }
</script>

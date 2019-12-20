<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">新增产品按键</div>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form ref="ruleForm" :model="form" label-width="110px">

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="所属产品" prop="productId" :rules="commonRule">
                  <el-select v-model="form.productId"
                             style="width: 500px"
                             placeholder="请选择产品名称">
                    <el-option v-for="item in productAll"
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
                <el-form-item label="应用名称" prop="name" :rules="commonRule">
                  <el-input v-model="form.name" style="width: 500px" size="small"></el-input>
                </el-form-item>

              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="版本号" prop="version" :rules="commonRule">
                  <el-input v-model="form.version" style="width: 500px" size="small"></el-input>
                </el-form-item>

              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="包名" prop="packageName" :rules="commonRule">
                  <el-input v-model="form.packageName" style="width: 500px" size="small"></el-input>
                </el-form-item>

              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="启动包类名" prop="activity" :rules="commonRule">
                  <el-input v-model="form.activity" style="width: 500px" size="small"></el-input>
                </el-form-item>

              </el-col>
            </el-row>
            <el-form-item label="上传资源">
              <el-upload
                class="upload-demo"
                drag
                name="fileName"
                :action="uploadObj.action"
                :headers="uploadObj.headers"
                :on-success="handleAvatarSuccess"
                :on-error = "handleBasisError"
                :on-remove="handleRemove"
                :file-list="fileList"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip"></div>
              </el-upload>
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
  import {BaseAPI, MultipartAPI} from "../../api/api";
  export default {
    data   : function() {
      return {
        productAll:[],
        fileList:[],
        type:'1',
        form: {
          name  : '',
          companyId:'',
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

      let obj = {id:0};
      API.product.productAll(obj).then(res=>{
        this.productAll = res
      });

    },
    computed: {
      uploadObj: function () {
        return {
          action: BaseAPI + '/upload/app',
          headers: {
            'token': this.$store.getters.token
          }
        }
      }
    },

    methods: {
      handleRemove(file, fileList) {
        this.fileList=fileList;
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
      },
      handleAvatarSuccess(res, file,fileList) {
        this.fileList=fileList;
        this.$message({
          message: '上传成功！',

          type: 'success'
        });
        console.log("================");
        console.log( fileList );
        console.log("================");
      },
      handleBasisError(err, file, fileList){
        //上传失败的情况
        this.$message.error('文件超过100M,上传失败');
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            let fileListArr=[];
            for (let i = 0; i < this.fileList.length; i++) {
              let f = this.fileList[i];
              let fileJson;
              if (null != f.response && typeof (f.response) != undefined && null != f.response.data && typeof (f.response.data) != undefined) {
                fileJson = {name: f.name, url: f.response.data};
              } else {
                fileJson = {name: f.name, url: f.url};
              }
              fileListArr.push(fileJson);
              this.form.path = JSON.stringify(fileListArr);
            }
            API.app.add(this.form).then(res=>{
              this.$message({
                message: '创建成功！',
                type: 'success'
              });
              this.$router.push({path: '/product/app/list'});
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      recurrenc(){
        this.$router.push({path: '/product/app/list'});
      },
    }
  }
</script>

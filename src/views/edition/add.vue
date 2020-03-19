<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">新增版本类型</div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="form"  @submit.native.prevent
               :rules="rules"
               label-width="130px">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" size="small" style="width: 220px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="应用类型" prop="appType">
              <el-select v-model="form.appType" placeholder="请选择应用类型" size="small" style="width: 240px">
                <el-option v-for="item in appCategoryList"
                           :key="item.type"
                           :label="item.name"
                           :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="版本" prop="version">
              <el-input v-model="form.version" size="small"  style="width: 220px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="是否强制更新" style="width: 220px" prop="forceUpdateFlag" :rules="commonRule">
              <el-switch v-model="form.forceUpdateFlag" ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="上传附件" :rules="commonRule">
                  <el-upload
                    class="upload-demo"
                    drag
                    name="fileName"
                    :action="uploadObj.action"
                    :headers="uploadObj.headers"
                    :on-success="handleBasisSuccess"
                    :on-error="handleBasisError"
                    :on-remove = "handleRemove"
                    :file-list="appfileList"
                    :on-preview="handleShow"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
        <el-row :gutter="18">
          <el-col :span="16">
            <el-form-item label="更新内容">
              <el-input type="textarea" v-model="form.updateNote" style="width: 563px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item>
              <el-button size="small" type="success" @click="onSubmit('ruleForm')">保存</el-button>
              <el-button size="small" type="info" @click="revertingg">返回</el-button>
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
  import {MultipartAPI} from "../../api/api";
  export default {
    components: {ElOption},
    data   : function() {

      return {

        appfileList:[],
        appCategoryList:[],
        clientList:[],
        form: {
          name:'',
          updateNote  : '',
          appType  : '',
          clientType  : '',
          url:'',
          forceUpdateFlag:false
        },
        commonRule: [
          {required: true, message: '该项不能为空'}
        ],
        rules: {
          name:[
            { required: true, message: '请输入名称'},
          ],
          version:[
            { required: true, message: '请输入版本号'},
          ],
          appType:[
            { required: true, message: '请选择应用版本类型' },
          ],
          clientType:[
            { required: true, message: '请选择客户端类型 '},
          ],
        }
      }
    },
    mounted(){
      API.appVersionManager.allappType().then(res=>{
        this.appCategoryList = res;

        API.appVersionManager.allClientTypeEnum().then(res=>{
          this.clientList = res;
        });
      });
    },

    computed: {
      uploadObj: function () {
        console.log("MultipartAPI:",MultipartAPI);
        return {
          action: MultipartAPI+'/upload/appVersion',
          headers: {
            'token': this.$store.getters.token
          }
        }
      }
    },

    methods: {
      handleBasisSuccess(res, file,fileList) {
        this.appfileList = fileList;
        this.$message({
          message: '上传成功！',
          type: 'success'
        });
      },
      handleRemove(file, fileList){
        this.appfileList = fileList;
      },
      handleBasisError(err, file, fileList) {
        console.log("err",err);
        this.appfileList = fileList;
        //上传失败的情况
        this.$message.error('上传失败');
      },
      handleShow(file){
        console.log("handleShow",file);
        let url;
        if(null!=file.response && typeof (file.response)!=undefined && null!=file.response.data && typeof (file.response.data)!=undefined){
          url=file.response.data;
        }else{
          url=file.url;
        }
        url = MultipartAPI+"/getFileFromEncodeParam?encodePath="+base64_encode(url);
        let link = document.createElement('a');
        link.style.display = 'none';
        link.target="_blank";
        link.href = url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
      },
      revertingg(){
        this.$router.push({path: '/system/edition/list'});
      },
      onSubmit(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("==========================");
            console.log(this.appfileList.length);
            if(this.appfileList.length === 0) {
              this.$alert('请上传附件', {
                confirmButtonText: '确定',
              });
            }else {
            if (null != this.appfileList && this.appfileList.length > 0) {
              let fileListArr = [];
              for (let i = 0; i < this.appfileList.length; i++) {
                let f = this.appfileList[i];
                let fileJson;
                if (null != f.response && typeof (f.response) != undefined && null != f.response.data && typeof (f.response.data) != undefined) {
                  fileJson = {name: f.name, url: f.response.data};
                } else {
                  fileJson = {name: f.name, url: f.url};
                }
                fileListArr.push(fileJson);
                this.form.url = JSON.stringify(fileListArr);
              }

              API.appVersionManager.add(this.form).then(res => {
                this.$message({
                  message: '创建成功！',
                  type: 'success'
                });

                this.$router.push({path: '/system/edition/list'});
              })
            }
              }
            } else {
              console.log('error submit!!');
              return false;
            }

          });
        }
    }




  }
  function base64_encode(str){
    var c1, c2, c3;
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var i = 0,
      len = str.length,
      string = '';

    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i == len) {
        string += base64EncodeChars.charAt(c1 >> 2);
        string += base64EncodeChars.charAt((c1 & 0x3) << 4);
        string += "==";
        break;
      }
      c2 = str.charCodeAt(i++);
      if (i == len) {
        string += base64EncodeChars.charAt(c1 >> 2);
        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        string += base64EncodeChars.charAt((c2 & 0xF) << 2);
        string += "=";
        break;
      }
      c3 = str.charCodeAt(i++);
      string += base64EncodeChars.charAt(c1 >> 2);
      string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
      string += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return string
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

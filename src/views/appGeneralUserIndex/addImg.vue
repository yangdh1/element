<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title" style="text-align: left">新建普通用户轮播图</div>
    </div>
    <div id="docDetailShow">
      <el-form  :rules="rules"  ref="ruleForm"  label-width="90px" :model="formData"  @submit.native.prevent>
            <el-form-item label="标题" prop="title" :rules="commonRule">
              <el-input v-model="formData.title" style="width: 400px" size="small"></el-input>
            </el-form-item>
        <el-form-item label="上传图片" prop="imagePath" :rules="commonRule">
          <el-upload
            class="upload-demo"
            name="fileName"
            list-type="picture-card"
            :action="uploadObj.action"
            :headers="uploadObj.headers"
            :limit="1"
            :on-success="handleAvatarSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
            <el-form-item label="信息内容" prop="content">
              <editor id='tinyMce' v-model='formData.content' :init='init'></editor>
            </el-form-item>
        <el-form-item label="排序" prop="seq">
          <el-input-number v-model="formData.seq" controls-position="right" :min="1" :max="100" size="small"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="onSubmit('ruleForm')">保存
          </el-button>
          <el-button
            size="small"
            type="info"
            @click="cancelInformation">返回
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import 'tinymce/tinymce'
  import "tinymce-imageupload"
  import 'tinymce/themes/modern/theme'
  import Editor from '@tinymce/tinymce-vue'
  import "tinymce/plugins/image"
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'
  import API, {MultipartAPI} from "../../api/api";
  import PageCache from "../../utils/pageCache";
  export default {
    components: {Editor},
    name: 'tinyMce',
    data: function() {
      return{
        imageUrl:'',
        // mce配置
        init: {
          upload_image_url: '/upload/cloud', //配置的上传图片的路由
          language_url: 'static/tinyMce/zh_CN.js',
          language: 'zh_CN',
          skin_url: 'static/tinyMce/skins/lightgray',
          height: 300,
          width:700,
          plugins: ['link lists image code table colorpicker textcolor wordcount contextmenu'],
          toolbar: 'bold italic underline strikethrough  | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
          branding: false
        },
        rules:{
        },
        commonRule: [
          {required: true, message: '该项不能为空'}
        ],
        // types:DocumentTypes ,
        // checkAll: false,
        // isIndeterminate:true,
        formData:{
          title:'',
          seq:'',
          content:'',
          imagePath:'',

        },
      }
    },
    computed: {
      uploadObj: function () {
        return {
          action: MultipartAPI+'/upload/AppIndex',
          headers: {
            'token': this.$store.getters.token
          }
        }
      }
    },
    mounted(){
    },

    methods: {
      handleAvatarSuccess(res, file) {
        this.formData.imagePath = res.data;
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      images_upload_handler:(blobInfo, success, failure)=>{
        this.handleImgUpload()
      },

      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.carouselFigureManager.addAppGeneralUser(this.formData).then(res=>{
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.$router.push({path: '/system/appLawyerIndex/list'});
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //新增
      createInformation (formData){
        API.infoRelease.create(this.formData).then(res=>{
        })
      },
      cancelInformation(){
        this.$router.push({path: '/system/appLawyerIndex/list'});
      },
    },
  }
</script>

<style scoped>
  #input{
    width: 130px;
  }
</style>

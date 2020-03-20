<template>
  <div class="page-content">
    <div id="docDetailShow">
      <el-row>
        <el-col :span="24">
          {{formData.title}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div v-html="formData.content">
            {{formData.content}}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <img :src="imageUrl" style="max-width: 960px;max-height: 216px">
        </el-col>
      </el-row>
      <el-button
        class="bs-back-btn"
        size="small"
        type="info"
        @click="cancelInformation">返回
      </el-button>
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
    data: function () {
      return {
        imageUrl: '',
        // mce配置
        init: {
          upload_image_url: '/upload/cloud', //配置的上传图片的路由
          language_url: 'static/tinyMce/zh_CN.js',
          language: 'zh_CN',
          skin_url: 'static/tinyMce/skins/lightgray',
          height: 200,
          width: 800,
          plugins: ['link lists image code table colorpicker textcolor wordcount contextmenu'],
          // toolbar:
          //   'bold italic underline strikethrough  | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
          branding: false
        },
        rules: {},
        // types:DocumentTypes ,
        // checkAll: false,
        // isIndeterminate:true,
        formData: {
          title: '',
          seq: '',
          content: '',
          imagePath: '',

        },
      }
    },
    computed: {
      uploadObj: function () {
        return {
          action: MultipartAPI + '/upload/OAIndex',
          headers: {
            'token': this.$store.getters.token
          }
        }
      }
    },
    mounted() {
      this.formData.id = this.$route.params.id;
      this.loadEditData();
    },

    methods: {
      loadEditData() {
        let obj = {id: this.formData.id};
        API.carouselFigureManager.detail(obj).then(res => {
          this.formData = res;
          this.imageUrl = res.url;
        });
      },
      cancelInformation(){
        this.$router.push({path: '/config/appLawyerIndex/userlist'});
        this.$message("已返回")
      },
    },
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
</style>

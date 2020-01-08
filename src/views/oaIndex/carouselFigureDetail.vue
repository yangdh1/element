<template>
  <div class="page-content" style="text-align:center">
    <div>
      <el-row>
        <el-col :span="24" style="text-align:center;font-weight: bold;font-size:24px;padding-bottom: 15px">
          {{formData.title}}
        </el-col>
      </el-row>
    <el-row>
      <p></p>
    </el-row>
      <el-row>
        <el-col :span="24">
          <img :src="imageUrl" style="max-width: 960px;max-height: 216px">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align:left">
          <div v-html="formData.content">
            {{formData.content}}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button
            class="bs-back-btn"
            style="float: right"
            size="small"
            type="info"
            @click="goBack">返回
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import API from "../../api/api";

  export default {
    components: {},
    data: function () {
      return {
        imageUrl: '',
        formData: {
          title: '',
          seq: '',
          content: '',
          imagePath: '',

        },
      }
    },
    computed: {
    },
    mounted() {
      this.formData.id = this.$route.params.id;
      this.loadEditData();
    },

    methods: {
      loadEditData() {
        let obj = {id: this.formData.id};
        API.carouselFigureManager.detail(obj).then(res => {
          console.log(res)
          this.formData = res;
          this.imageUrl = res.url;
          this.formData.imagePath = res.imagePath;
        });
      },
      goBack(){
        this.$router.go(-1);
      },
    },
  }
</script>

<style scoped>
</style>

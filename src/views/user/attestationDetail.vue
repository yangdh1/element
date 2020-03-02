<template>
    <div class="page-content">
      <div class="bs-header">
        <el-row>
          <el-col :span="3">
            <el-button type="text"  @click="$router.push({path:  '/system/user/detail/' + form.id})"><span
              style="color: black">用户信息</span></el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="text" disabled @click="$router.push({path: 'attestationDetail/' + form.id})"><span  style="font-weight:bold;color:blue">认证信息</span>
            </el-button>
          </el-col>
        </el-row>
      </div>
      <el-form ref="ruleForm" :model="form"
               size="small"
               label-width="110px">
        <el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="真实姓名" prop="name" >
                <el-input v-model="form.name" size="small" style="width: 250px" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证" prop="idCard" >
                <el-input v-model="form.idCard" size="small" style="width: 250px" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="地址" prop="address" >
                <el-input v-model="form.address" size="small" style="width: 250px" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="身份证正面" prop="url" >
                <img :src="form.justCard" style="width:75px;height:100px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证反面" prop="url" >
                <img :src="form.againstCard" style="width:75px;height:100px" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button
                size="small"
                type="info"
                @click="revertingg">返回</el-button>
            </el-form-item>

          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
    </div>
</template>

<script>
  import API from '../../api'
  import ElOption from "../../../node_modules/element-ui/packages/select/src/option.vue";
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  // import { Navbar, Sidebar, AppMain } from 'views/layout'
  export default {
    components: {
      ElRow,
      ElCol,
      ElOption
    },
    data: function () {
      return {
        form: {
          adminFlag:false,
          status:'1',
          id: ''
        },
      }
    },
    mounted() {
      this.form.id = this.$route.params.id;

      //加载编辑信息
      this.loadEditData();

    },
    methods: {
      revertingg(){
        this.$router.push({path: '/system/user/list'});
      },
      loadEditData() {
        let obj = {id: this.form.id};
        API.user.detail(obj).then(res => {
          this.form = res;
          console.log("=============================");
          console.log(res);

        });
      },
    },

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

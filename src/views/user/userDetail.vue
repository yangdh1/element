<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">用户详情</div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="form"
               size="small"
               label-width="110px">
        <el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="真实姓名" prop="name" >
                <el-input v-model="form.name" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="昵称" prop="nickName" >
                <el-input v-model="form.nickName" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="年龄" prop="age" >
                <el-input v-model="form.age" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别" prop="gender" >
                <el-input v-model="form.gender" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="生日" prop="birthDayDate" >
                <el-input v-model="form.birthDayDate" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证" prop="idCard" >
                <el-input v-model="form.idCard" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="创建时间" prop="createTimeDate" >
                <el-input v-model="form.createTimeDate" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址" prop="address" >
                <el-input v-model="form.address" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="省份" prop="provinceName" >
                <el-input v-model="form.provinceName" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城市" prop="cityName" >
                <el-input v-model="form.cityName" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="区" prop="districtName" >
                <el-input v-model="form.districtName" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号" prop="mobile" >
                <el-input v-model="form.mobile" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="角色" prop="roleName" >
                <el-input v-model="form.roleName" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="管理员">
                <el-switch
                  v-model="form.adminFlag"
                  disabled>
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="头像" prop="url" >
                <img :src="form.url" style="width:75px;height:100px"/>
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
</template>
<script type="text/ecmascript-6">
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


      // submitUpload() {
      //   this.$refs.upload.submit();
      // }

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

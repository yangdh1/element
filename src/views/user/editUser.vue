<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">编辑用户</div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="form"
               :rules="rules"
               size="small"
               label-width="110px">
        <el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="昵称" prop="nickName" :rules="commonRule">
                <el-input v-model="form.nickName" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="真实姓名" prop="name" :rules="commonRule">
                <el-input v-model="form.name" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="年龄" prop="age" :rules="commonRule">
                  <el-input v-model="form.age" size="small" style="width: 250px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别" prop="sex" >
                  <template>
                    <el-radio v-model="form.sex" label="1">男</el-radio>
                    <el-radio v-model="form.sex" label="2">女</el-radio>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>

          <el-row :gutter="20">

            <el-col :span="8">
              <el-form-item label="身份证" prop="idCard" >
              <el-input v-model="form.idCard" size="small" style="width:250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="form.mobile" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="用户分组" prop="roleId" :rules="commonRule">
                <el-select v-model="form.roleId"
                           placeholder="请选择用户分组"
                           size="small" style="width: 250px">
                  <el-option v-for="item in roleArr"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="省份" prop="provinceCode" :rules="commonRule">
                <el-select v-model="form.provinceCode"
                           placeholder="请选择省份"
                           size="small" style="width: 250px"  @change="loadProvince">
                  <el-option v-for="item in provincrAll"
                             :key="item.id"
                             :label="item.name"
                             :value="item.provinceCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="城市" prop="cityCode" :rules="commonRule">
                <el-select v-model="form.cityCode"
                           placeholder="请选择城市"   @change="loadDistrict"
                           size="small" style="width: 250px" >
                  <el-option v-for="item in cityAll"
                             :key="item.cityCode"
                             :label="item.name"
                             :value="item.cityCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区" prop="districtCode" :rules="commonRule">
                <el-select v-model="form.districtCode"
                           placeholder="请选择区"
                           size="small" style="width: 250px" >
                  <el-option v-for="item in districtAll"
                             :key="item.districtCode"
                             :label="item.name"
                             :value="item.districtCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">-->
            <el-col :span="8">

              <el-form-item label="是否管理员" prop="address">
                <el-switch v-model="form.adminFlag" style="width: 217px"></el-switch>
              </el-form-item>

            </el-col>
            <el-col :span="8">

              <el-form-item label="有效性" prop="status">
                <template>
                  <el-radio v-model="form.status" label="1">有效</el-radio>
                  <el-radio v-model="form.status" label="0">无效</el-radio>
                </template>
              </el-form-item>
            </el-col>
         </el-row>
          <el-col :span="24">

            <el-form-item>
              <el-button type="primary" size="small" @click="onSubmit('ruleForm')">保存</el-button>
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
        roleArr: [],
        bureauList: [],
        cityAll: [],
        provincrAll: [],
        districtAll:[],
        companyAll: [],
        form: {
          adminFlag:false,
          status:'1',
        },
        commonRule: [
          {required: true, message: '该项不能为空'}
        ],
        rules: {

        }
      }
    },
    mounted() {
      this.form.id = this.$route.params.id;
      API.role.listAll().then(res => {
        this.roleArr = res
      });


      // API.company.companyAll().then(res => {
      //   this.companyAll = res
      // });
      //加载编辑信息
      this.loadEditData();

      this.loadProvinc();
    },
    methods: {
      loadProvinc() {
        API.province.provinceList().then(res => {
          this.provincrAll = res
        });
      },
      loadDistrict(){
        let obj = {cityCode: this.form.cityCode};
        API.district.getDistrictAll(obj).then(res => {
          this.districtAll = res;
        });
      },
      revertingg(){
        this.$router.push({path: '/system/user/list'});
      },
      loadProvince() {
        let obj = {provinceCode: this.form.provinceCode};
        API.city.getCityAll(obj).then(res => {
          this.cityAll = res
        });
      },
      loadEditData() {
        let obj = {id: this.form.id};
        API.user.detail(obj).then(res => {
          this.form = res;
          console.log(res);
          this.form.sex=res.sex.toString();
          this.form.provinceCode = res.provinceCode;
          this.loadProvince();
          this.form.cityCode = res.cityCode;
          this.form.districtCode=res.districtCode;
          this.loadDistrict();
          if (res.status == null) {
            this.form.status = res.status;
          } else {
            this.form.status = res.status.toString();
          }
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.user.update(this.form).then(res => {
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.$router.push({path: '/system/user/list'});
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      submitUpload() {
        this.$refs.upload.submit();
      }

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

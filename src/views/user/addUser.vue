<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">新增用户</div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="form"
               :rules="rules"
               size="small"
               label-width="140px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="昵称" prop="nickName" >
              <el-input v-model="form.nickName" size="small" style="width: 250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名" prop="name" >
              <el-input v-model="form.name" size="small" style="width: 250px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="密码" prop="password" >
              <el-input v-model="form.password" size="small" style="width: 250px"></el-input>
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
            <el-form-item label="手机号" prop="mobile" >
              <el-input v-model="form.mobile" size="small" style="width: 250px"></el-input>
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
            <el-form-item label="年龄" prop="age" >
              <el-input v-model="form.age" size="small" style="width: 250px"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="8">
              <el-form-item label="用户角色" prop="roleId" :rules="commonRule">
                <el-select v-model="form.roleId"
                           placeholder="请选择用户角色"
                           size="small" style="width: 250px">
                  <el-option v-for="item in roleArr"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="省份" prop="provinceCode" :rules="commonRule">
              <el-select v-model="form.provinceCode"
                         placeholder="请选择省份"
                         @change="cityList"
                         size="small" style="width: 250px">
                <el-option v-for="item in provinceArr"
                           :key="item.id"
                           :label="item.name"
                           :value="item.provinceCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市" prop="cityCode" :rules="commonRule">
              <el-select v-model="form.cityCode"
                         placeholder="请选择城市"
                         @change="districtList"
                         size="small" style="width: 250px">
                <el-option v-for="item in cityArr"
                           :key="item.id"
                           :label="item.name"
                           :value="item.cityCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="区" prop="districtCode" :rules="commonRule">
              <el-select v-model="form.districtCode"
                         placeholder="请选择区"
                         size="small" style="width: 250px">
                <el-option v-for="item in districtArr"
                           :key="item.id"
                           :label="item.name"
                           :value="item.districtCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地址" prop="address">
              <el-input v-model="form.address" size="small" style="width: 250px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="生日" prop="birtDay">
              <template>
                  <div class="block">
                    <el-date-picker
                      v-model="form.birthDay"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <div >
              <el-form-item label="上传图片:" prop="photo" >
                <el-upload
                  class="avatar-uploader"
                  name="fileName"
                  :action="uploadObj.action"
                  :headers="uploadObj.headers"
                  :on-success="handleAvatarSuccess"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  multiple>
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button size="small" type="success" @click="onSubmit('ruleForm')">保存</el-button>
          <el-button
            size="small"
            type="info"
            @click="revertingg">返回</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {MultipartAPI} from "../../api/api";
  import API from '../../api'
  import ElOption from "../../../node_modules/element-ui/packages/select/src/option.vue";
  // import { Navbar, Sidebar, AppMain } from 'views/layout'
  export default {
    components: {ElOption},
    data: function () {
      return {
        photo:'',
        roleArr: [],
        bureauList: [],
        cityArr: [],
        provinceArr: [],
        districtArr:[],
        companyAll: [],
        imageUrl: '',
        form: {
          sex:'1',
          adminFlag:false,
          status:'1'
        },
        commonRule: [
          {required: true, message: '该项不能为空'}
        ],
        rules: {
          mobile: [
            {required: true, message: '手机号码', trigger: 'blur'},
            { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请填写正确格式',trigger:'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            { pattern: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/, message: '请填写正确的格式(字母开头5-20位)',trigger:'blur'}
          ],
          idCard: [
            {required: true, message: '请填写身份证', trigger: 'blur'},
            { pattern: /^(^\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/, message: '请输入正确的身份证号码',trigger:'blur'}
          ]
        }
      }
    },
    computed: {
      uploadObj: function () {
        return {
          action: MultipartAPI+'/upload/head',
          headers: {
            'token': this.$store.getters.token
          }
        }
      }
    },
    mounted() {
      API.role.listAll().then(res => {
        this.roleArr = res;
      });
       API.province.provinceList().then(res => {
         this.provinceArr = res
       });
      //
      // API.company.companyAll().then(res => {
      //   this.companyAll = res
      // });
    },
    methods: {
      cityList(){
        API.city.getCityAll({provinceCode:this.form.provinceCode}).then(res => {
          this.cityArr = res
        });
      },
      districtList(){
        API.district.getDistrictAll({cityCode:this.form.cityCode}).then(res => {
          this.districtArr = res
        });
      },
      revertingg(){
        this.$router.push({path: '/system/user/list'});
      },
      handleAvatarSuccess(res, file) {
        this.form.photo = res.data;
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        console.log(file);
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // loadProvince() {
      //   let obj = {provinceCode: this.form.provinceCode};
      //   API.city.getCityAll(obj).then(res => {
      //     this.cityAll = res
      //   });
      // },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // if (this.form.password !== this.form.confirmPassword) {
            //   this.$alert('密码不一致，请重新输入', {
            //     confirmButtonText: '确定',
            //   });
            // } else {
              API.user.add(this.form).then(res => {
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                });
                this.$router.push({path: '/system/user/list'});
              });

          }
        });
        }
      },

      submitUpload() {
        this.$refs.upload.submit();
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .dev-add-avatar-uploader .el-upload:hover {
    border-color: #999;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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

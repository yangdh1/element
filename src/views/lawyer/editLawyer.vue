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
              <el-form-item label="省份" prop="upOneName" :rules="commonRule">
                <el-select v-model="form.upOneName"
                           placeholder="请选择省份"
                           size="small" style="width: 250px"  @change="loadProvince">
                  <el-option v-for="item in provinceArr"
                             :key="item.id"
                             :label="item.upOneName"
                             :value="item.upOneName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="城市" prop="addressCode" :rules="commonRule">
                <el-select v-model="form.addressCode"
                           placeholder="请选择城市"
                           size="small" style="width: 250px" >
                  <el-option v-for="item in cityAll"
                             :key="item.id"
                             :label="item.name"
                             :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
<!--            <el-col :span="8">-->
<!--              <el-form-item label="区" prop="districtCode" :rules="commonRule">-->
<!--                <el-select v-model="form.districtCode"-->
<!--                           placeholder="请选择区"-->
<!--                           size="small" style="width: 250px" >-->
<!--                  <el-option v-for="item in districtAll"-->
<!--                             :key="item.districtCode"-->
<!--                             :label="item.name"-->
<!--                             :value="item.districtCode">-->
<!--                  </el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->
<!--            </el-col>-->

          </el-row>
<!--          <el-row :gutter="20">-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="地址" prop="address">-->
<!--                <el-input v-model="form.address" size="small" style="width: 250px"></el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->

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
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="账户余额" prop="moneyBalance" >
                <el-input v-model="form.moneyBalance" size="small" disabled style="width: 250px" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="359共享基金" prop="ordinaryBalance" >
                <el-input v-model="form.ordinaryBalance" size="small" disabled style="width: 250px" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="股票共享基金" prop="stockBalance" >
                <el-input v-model="form.stockBalance" size="small" disabled style="width: 250px" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="心币" prop="coinBalance" >
                <el-input v-model="form.coinBalance" size="small"  disabled style="width: 250px" ></el-input>
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
        city:{},
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
    },
    methods: {
      revertingg(){
        this.$router.push({path: '/system/user/list'});
      },
      loadProvince() {
        API.province.provinceList({}).then(res => {
          this.provinceArr = res;
          console.log("000000000000000000000000000000000===="+JSON.stringify(this.provinceArr))
        });
      },
      loadCity() {
        let obj = {upOneName: this.form.upOneName};
        API.province.provinceList(obj).then(res => {
          this.cityAll = res;
          console.log("111111111111111111111111111111="+JSON.stringify(this.cityArr))
        });
      },
      loadCityByCode() {
        this.loadProvince();
        let obj = {code: this.form.addressCode};
        API.province.getCityByCode(obj).then(res => {
          this.city = res;
          if(this.city != null){
            this.form.upOneName = this.city.upOneName;
            this.loadCity();
          }else{
            this.form.upOneName = this.provinceArr[0].upOneName;
            this.loadCity();
          }
        });
      },
      loadEditData() {
        let obj = {id: this.form.id};
        API.user.detail(obj).then(res => {
          this.form = res;
          console.log(res);
          this.form.sex=res.sex.toString();
          this.form.addressCode=res.addressCode;
          this.loadCityByCode();
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

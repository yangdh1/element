<template>
  <div class="page-content" >
    <div class="bs-header">
        <el-row>
          <el-col :span="1">
            <div class="bs-title">
              <el-button type="text"
                         disabled
                         @click="$router.push({path: '/userManage/userDetail/' + form.id})">
              <span  style="font-weight:bold;color:blue" >用户信息</span>
              </el-button>
            </div>
          </el-col>
          <el-col :span="1">
            <el-button type="text"
                       @click="$router.push({path: '/userManage/userAuthValidateInfo/' + form.id})">
              <span  style="color: black">认证信息</span>
            </el-button>
          </el-col>
          <el-col :span="22" style="text-align: right">
            <el-button  size="medium" type="primary"  @click="revertingg">返回</el-button>
          </el-col>
        </el-row>
    </div>
    <div style="text-align: center">
        <el-form ref="ruleForm" :model="form" size="small"   label-width="110px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="真实姓名" prop="name" >
                  <el-input v-model="form.name" size="small"  readonly="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="昵称" prop="nickName" >
                  <el-input v-model="form.nickName" size="small"  readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="年龄" prop="age" >
                  <el-input v-model="form.age" size="small"  readonly="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别" prop="gender" >
                  <el-input v-model="form.gender" size="small"  readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="生日" prop="birthDayDate" >
                  <el-input v-model="form.birthDayDate" size="small" readonly="true" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证" prop="idCard" >
                  <el-input v-model="form.idCard" size="small" readonly="true" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建时间" prop="createTimeDate" >
                  <el-input v-model="form.createTimeDate" size="small" readonly="true" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="地址" prop="address" >
                  <el-input v-model="form.address" size="small" readonly="true" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="省份" prop="provinceName" >
                  <el-input v-model="form.provinceName" size="small"  readonly="true" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="城市" prop="cityName" >
                  <el-input v-model="form.cityName" size="small" readonly="true" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
  <!--            <el-col :span="8">-->
  <!--              <el-form-item label="区" prop="districtName" >-->
  <!--                <el-input v-model="form.districtName" size="small" readonly="true" ></el-input>-->
  <!--              </el-form-item>-->
  <!--            </el-col>-->
              <el-col :span="8">
                <el-form-item label="手机号" prop="mobile" >
                  <el-input v-model="form.mobile" size="small" readonly="true" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="角色" prop="roleName" >
                  <el-input v-model="form.roleName" size="small" readonly="true" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="2">
                <el-form-item label="管理员">
                  <el-switch   v-model="form.adminFlag"  disabled="true"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label=""></el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="头像" prop="url" >
                  <img :src="form.url" style="width:75px;height:100px" readonly="true"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="账户余额" prop="moneyBalance" >
                  <el-input v-model="form.moneyBalance" size="small"  readonly="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="359共享基金" prop="ordinaryBalance" >
                  <el-input v-model="form.ordinaryBalance" size="small"  readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="股票共享基金" prop="stockBalance" >
                  <el-input v-model="form.stockBalance" size="small"  readonly="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="心币" prop="coinBalance" >
                  <el-input v-model="form.coinBalance" size="small"  readonly="true"></el-input>
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
          this.$router.push({path: '/userManage/userList'});
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

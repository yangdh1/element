<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">新增服务类型</div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="form"
               size="small"
               label-width="110px">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="服务类型名称" prop="oneServiceTypeName" :rules="commonRule">
              <el-input v-model="form.oneServiceTypeName" style="width: 217px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="服务计价单位" prop="servicePriceUnit" :rules="commonRule">
              <el-input v-model="form.servicePriceUnit" style="width: 217px"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" size="small" @click="onSubmit('ruleForm')">保存</el-button>
                <el-button type="info" size="small" @click="recurrence">返回</el-button>
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
  // import { Navbar, Sidebar, AppMain } from 'views/layout'
  export default {
    components: {ElOption},
    data: function () {
      return {
        BuildingArr:[],
        compoundArr:[],
        serviceTypeArr: [],
        realNameArr: [],
        bureauList: [],
        departmentList: [],
        floorArr:[],
        form: {
          oneServiceTypeName: '',
          servicePriceUnit: ''
        },
        commonRule: [
          {required: true, message: '该项不能为空'},
        ],
      }
    },
    mounted() {
      // API.serviceType.list().then(res => {
      //   this.serviceTypeArr = res
      // });
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (Number.isNaN(this.form.servicePriceUnit)) {
                this.$message({
                    type: 'warning',
                    message: '请填写数字',
                })
            }
            // if(this.form.internalFlag===false){
            //   this.form.personnelId='';
            //   /*     this.form.compoundId = res.compoundId;
            //        this.form.buildingId = res.buildingId;
            //        this.form.floorId = res.floorId;*/
            //   console.log( this.form.floorId );
            //   console.log("=================================");
            // }
            API.serviceType.add(this.form).then(res => {
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.$router.push({path: 'lawyerList.vue'});
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      recurrence() {
        this.$router.push({path: '/serviceType/list'});

      },
      submitUpload() {
        this.$refs.upload.submit();
      }
      ,
      // loadCompound(){
      //   API.compound.list().then(res => {
      //     this.compoundArr = res
      //   });
      // },
      // changeBuildingId(){
      //   let objjj = {compoundId: this.form.compoundId,
      //     buildingId: this.form.buildingId};
      //   API.floor.list(objjj).then(res => {
      //     this.floorArr = res
      //   });
      // },
      // changeBureau() {
      //   this.form.realName='';
      //   this.form.departmentId = '';
      //   this.form.mobile = '';
      //   this.form.telephone = '';
      //   this.form.address='';
      //   let obj = {bureauId: this.form.bureauId};
      //   API.department.listByBureauId(obj).then(res => {
      //     this.departmentList = res
      //   });
      // },
      handleMobileNumberChang() {
      //   if (null != this.form.mobile && typeof (this.form.mobile) != undefined && "" != this.form.mobile) {
      //     let obj = {mobile: this.form.mobile};
      //     API.user.handleMobileNumberChang(obj).then(res => {
      //       if(res.code===1){
      //         this.mobileExsits = false;
      //       }
      //       this.form.mobileNumber=res;
      //
      //       console.log("=======================");
      //       console.log(res);
      //       console.log("=======================");
      //
      //     })
      //   }
      // },
      // changeRealName() {
      //   //let obj1 = {departmentId: this.form.departmentId,};
      //   if (this.form.internalFlag == true) {
      //     this.form.realName='';
      //     this.form.mobile = '';
      //     let obj = {bureauId: this.form.bureauId, departmentId: this.form.departmentId};
      //     API.personnel.listByBureauIdAndDepartmentId(obj).then(res => {
      //       console.log(res)
      //       this.realNameArr = res
      //     });
      //   }
      // },
      // changeMobileAndTelephone() {
      //   let obj={name:this.form.realName};
      //   API.personnel.listByName(obj).then(res => {
      //     console.log(res)
      //     console.log("======================================cac====")
      //     console.log(res)
      //     this.form.mobile = res.mobileNumber;
      //     this.form.telephone = res.officeNumber;
      //     this.form.address = res.homeAddress;
      //     this.form.room = res.room;
      //     this.form.personnelId=res.id;
      //     this.form.compoundId = res.compoundId;
      //     if (res.compoundId != null) {
      //       this.changeCompound();
      //     }
      //     this.form.buildingId = res.buildingId;
      //     if (res.buildingId != null) {
      //       this.changeBuildingId();
      //     }
      //     this.form.floorId = res.floorId;
      //   });
      // },
      // clear(){
      //   this.form.bureauId='';
      //   this.form.departmentId = '';
      //   this.form.mobile = '';
      //   this.form.telephone = '';
      //   this.form.address='';
      //   this.form.realName='';
      //   this.departmentList=[];
      //   this.realNameArr=[];
      // },

    }
  }
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

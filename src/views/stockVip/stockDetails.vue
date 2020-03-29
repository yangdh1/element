<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">详细信息</div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="form"
               size="small"
               label-width="110px">
        <el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="真实姓名" prop="name">
                <el-input v-model="form.name" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="昵称" prop="nickName">
                  <el-input v-model="form.nickName" size="small" style="width: 250px"></el-input>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="生日" prop="birthDay">
                <el-input type="datetime" v-model="form.birthDay" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="加入时间" prop="stockVipJoinTime">
                <el-input type="datetime" v-model="form.stockVipJoinTime" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="form.mobile" size="small" style="width: 250px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-col :span="24">
            <el-form-item>
              <el-button
                size="small"
                type="info"
                @click="revertingg">返回
              </el-button>
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
                    name: '',
                    nickName: '',
                    age: '',
                    sex: '',
                    birthDay: '',
                    idCard: '',
                    stockVipJoinTime: '',
                    address: '',
                    mobile:'',
                },
            }
        },
        mounted() {
            this.form.id = this.$route.params.userId;
            console.log(this.form.id);
            //加载编辑信息
            this.loadEditData();
        },
        methods: {
            revertingg() {
                this.$router.push({path: '/vipMember/stockVipList'});
            },
            loadEditData() {

                API.stockVip.details({id:this.$route.params.id}).then(res => {
                    this.convertData(res);
                    console.log(res);
                });
            },
            convertData(data) {
                if (data != null) {
                    data.stockVipJoinTime = new Date(data.stockVipJoinTime).Format('yyyy-MM-dd HH:mm:ss');
                    data.birthDay = new Date(data.birthDay).Format('yyyy-MM-dd HH:mm:ss');
                    this.form = data;
                }
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

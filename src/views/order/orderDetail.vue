<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">
        <span>订单详情</span>
      </div>
      <div  style="float: right;margin-right: 10px">
        <i class="el-icon-d-arrow-right"></i>
        <el-button size="small"  type="primary"  @click="revertingg">返回</el-button>
      </div>
    </div>
    <!--订单基本信息-->
    <div>
      <el-form ref="ruleForm" :model="orderInfo"
               size="medium" style="" label-position="left"
               label-width="200px" >
        <el-row>
          <el-row :gutter="20">
            <!--单号-->
            <el-col :span="8">
              <el-form-item label="订单号" prop="orderCode" >
                <el-input v-model="orderInfo.orderCode" size="medium" style="width: 350px"></el-input>
              </el-form-item>
            </el-col>
            <!--订单类型-->
            <el-col :span="8">
              <el-form-item label="订单类型" prop="serviceType" >
                <el-input v-model="orderInfo.businessTypeName" size="medium" style="width: 350px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
         <!--支付费用-->
            <el-col :span="8">
              <el-form-item label="订单金额(余额/三方)" prop="totalFee" >
                <el-input v-model="orderInfo.totalFee" size="medium" style="width: 350px"></el-input>
              </el-form-item>
            </el-col>
           <!--心币费用-->
            <el-col :span="8">
              <el-form-item label="心币金额" prop="coinFee" >
                <el-input v-model="orderInfo.coinFee" size="medium" style="width: 350px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <!--支付方式-->
            <el-col :span="8">
              <el-form-item label="支付方式" prop="paymentWay" >
                <el-input v-model="orderInfo.paymentWay" size="medium" style="width: 350px"></el-input>
              </el-form-item>
            </el-col>
            <!--订单状态-->
            <el-col :span="8">
              <el-form-item label="订单状态" prop="payStatusStr" >
                <el-input v-model="orderInfo.payStatusStr" size="medium" style="width: 350px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <!--下单人-->
            <el-col :span="8">
              <el-form-item label="下单人" prop="userName" >
                <el-input v-model="orderInfo.userName" size="medium" style="width: 350px"></el-input>
              </el-form-item>
            </el-col>
            <!--下单人手机-->
            <el-col :span="8">
              <el-form-item label="下单人手机" prop="userMobile" >
                <el-input v-model="orderInfo.userMobile" size="medium" style="width: 350px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <!--创建时间-->
            <el-col :span="8">
              <el-form-item label="创建时间" prop="createTimeStr" >
                <el-input v-model="orderInfo.createTimeStr" size="medium" style="width: 350px"></el-input>
              </el-form-item>
            </el-col>
            <!--创建终端IP-->
            <el-col :span="8">
              <el-form-item label="下单终端IP" prop="evaluateStatus" >
                <el-input v-model="orderInfo.clientIP" size="medium" style="width: 350px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="三方交易流水号" prop="outTradeNo" >
                <el-input v-model="orderInfo.outTradeNo" size="medium" style="width: 350px"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="三方交易描述" prop="orderDesc" >
                <el-input v-model="orderInfo.orderDesc" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
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
         orderInfo:{}
      }
    },
    mounted() {
      this.orderInfo = this.$route.params.orderInfo;
      console.log("orderInfo",this.orderInfo);
      //加载编辑信息
     // this.loadEditData();
    },
    methods: {
      revertingg(){
        this.$router.push({path: '/order/orderList'});
      },
      loadEditData() {
        let obj = {id: this.form.id};
        API.orderEvaluate.detail(obj).then(res => {
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

<template>
  <div class="page-content">
    <div class="bs-header">
      <el-link type="primary" @click="reverting">订单列表</el-link>
      <div class="bs-title">
        <p>> <span>订单详情</span></p>
      </div>
    </div>
    <!--订单基本信息-->
    <div>
      <el-form ref="ruleForm" :model="orderInfo"
               size="medium" label-position="left"
               label-width="140px" v-loading.body="loading">
      <!--基本信息-->
        <el-row>
          <el-row>
            <!--单号-->
            <el-col :span="8">
              <el-form-item label="订单号" prop="orderCode">
                <el-input :readonly="isReadOnly" v-model="orderInfo.orderCode" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">&nbsp;</el-col>
            <!--订单类型-->
            <el-col :span="8">
              <el-form-item label="订单类型" prop="serviceType" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.businessTypeName" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
         <!--支付费用-->
            <el-col :span="8">
              <el-form-item label="订单金额(余额/三方)" prop="totalFee" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.totalFee" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">&nbsp;</el-col>
           <!--心币费用-->
            <el-col :span="8">
              <el-form-item label="心币金额" prop="coinFee" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.coinFee" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!--支付方式-->
            <el-col :span="8">
              <el-form-item label="支付方式" prop="paymentWay" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.paymentWay" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">&nbsp;</el-col>
            <!--订单状态-->
            <el-col :span="8">
              <el-form-item label="订单状态" prop="payStatusStr" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.payStatusStr" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <!--下单人-->
            <el-col :span="8">
              <el-form-item label="下单人" prop="userName" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.userName" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">&nbsp;</el-col>
            <!--下单人手机-->
            <el-col :span="8">
              <el-form-item label="下单人手机" prop="userMobile" >
                <el-input :readonly="isReadOnly"  v-model="orderInfo.userMobile" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <!--接单人-->
            <el-col :span="8">
              <el-form-item label="接单人" prop="lawyerName" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.lawyerName" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">&nbsp;</el-col>
            <!--接单人手机-->
            <el-col :span="8">
              <el-form-item label="下单人手机" prop="lawyerTel" >
                <el-input :readonly="isReadOnly"  v-model="orderInfo.lawyerTel" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <!--创建时间-->
            <el-col :span="8">
              <el-form-item label="创建时间" prop="createTimeStr" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.createTimeStr" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">&nbsp;</el-col>
            <!--创建终端IP-->
            <el-col :span="8">
              <el-form-item label="下单终端IP" prop="evaluateStatus" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.clientIP" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="8">
              <el-form-item label="三方交易流水号" prop="outTradeNo" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.outTradeNo" size="medium" style="width: 300px"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">&nbsp;</el-col>
            <el-col :span="8">
              <el-form-item :readonly="isReadOnly" label="三方交易描述" prop="orderDesc" >
                <el-input v-model="orderInfo.orderDesc" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <div class="bs-header bs-title">
          <span>{{orderInfo.businessTypeName}}服务详情:</span>
        </div>
      <!--业务信息-->
        <el-row>
          <el-row >
            <!--案件类型-->
            <el-col :span="8">
              <el-form-item label="案件类型" prop="caseTypeName_business" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.caseTypeName_business==null?'---':orderInfo.caseTypeName_business" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
            <!--业务状态-->
            <el-col :span="5">&nbsp;</el-col>
            <el-col :span="8">
              <el-form-item label="业务状态" prop="statusDesc_business" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.statusDesc_business==null?'---':orderInfo.statusDesc_business" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <!--业务有效期-->
            <el-col :span="8">
              <el-form-item label="有效期(天)" prop="validityLimit_business" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.validityLimit_business==null?'---':orderInfo.validityLimit_business+'天'" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
            <!--服务时长-->
            <el-col :span="5">&nbsp;</el-col>
            <el-col :span="8">
              <el-form-item label="完成/过期时间" prop="overTime_business" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.overTime_business==null?'---':orderInfo.overTime_business" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <!--业务单价-->
            <el-col :span="8">
              <el-form-item label="单价(每分钟/每次)" prop="price_business" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.price_business==null?'---':'¥'+orderInfo.price_business" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
            <!--服务时长-->
            <el-col :span="5">&nbsp;</el-col>
            <el-col :span="8">
              <el-form-item label="服务时长" prop="durationTime_business" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.durationTime_business==null?'---':orderInfo.durationTime_business" size="medium" style="width: 300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--业务请求期望-->
          <el-row >
            <el-col :span="16">
              <el-form-item label="请求与期望" prop="expect_business" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.expect_business==null?'---':orderInfo.expect_business" size="medium" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--事实描述-->
          <el-row >
            <el-col :span="16">
              <el-form-item label="事实描述" prop="factDesc_business" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.factDesc_business==null?'---':orderInfo.factDesc_business" size="medium" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--业务描述-->
          <el-row >
            <el-col :span="16">
              <el-form-item label="业务描述" prop="description_business" >
                <el-input :readonly="isReadOnly" v-model="orderInfo.description_business==null?'---':orderInfo.description_business" size="medium" type="textarea"></el-input>
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
         loading  : true,
         orderInfo:{},
         isReadOnly:true
      }
    },
    mounted() {
      this.orderInfo.orderId = this.$route.params.orderId;
      console.log("orderId",this.orderInfo.orderId);
      //加载编辑信息
      this.loadEditData();
    },
    methods: {
      revertingg(){
        this.$router.push({path: '/order/orderList'});
      },
      loadEditData() {
        this.loading=true;
        let obj = {orderId: this.orderInfo.orderId};
        API.orderManage.detail(obj).then(res => {
          if (res!=null){
            this.orderInfo = res.orderInfo;
            console.log("===========this.orderInfo==================",this.orderInfo);
          }else{
             console.log("--------------加载订单详情信息失败---------------");
          }
          this.loading=false;
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

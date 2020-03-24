<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">系统数据管理</div>
    </div>
    <div>
      <div>
        <el-row :gutter="20" type="flex" justify="space-around" >
          <el-col :span="6" class="title"><label>电话咨询设置</label></el-col>
          <el-col :span="6" class="title"><label>359°共享法律服务设置</label></el-col>
          <el-col :span="6" class="title"><label>股票共享法律服务设置</label></el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="space-around" >
          <el-col :span="6" class="formBorder"><br>
            <el-form ref="refTeleConsultForm" :model="teleConsultForm" label-width="120px" size="mini">
              <el-form-item label="section:" prop="section" v-show="isShow">
                <el-input v-model="teleConsultForm.section" style="width: 80px" size="small"></el-input>
              </el-form-item>
              <el-form-item label="通信费用:" prop="chargePerMinute" >
                <el-input v-model="teleConsultForm.chargePerMinute" style="width: 80px" size="small"></el-input>
                <label class="dist">元/分钟</label>
              </el-form-item>
              <el-form-item label="呼叫最高时长:" prop="directCall" >
                <el-input v-model="teleConsultForm.directCall" style="width: 80px" size="small"></el-input>
                <label class="dist">分钟</label>
              </el-form-item>
              <el-form-item label="直接拨出时长:" prop="maxDuration" >
                <el-input v-model="teleConsultForm.maxDuration" style="width: 80px" size="small"></el-input>
                <label class="dist">分钟</label>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6" class="formBorder"><br>
            <el-form ref="redShare359Form" :model="share359Form" label-width="150px" size="mini">
              <el-form-item label="section:" prop="section" v-show="isShow">
                <el-input v-model="share359Form.section" style="width: 80px" size="small"></el-input>
              </el-form-item>
              <el-form-item label="最低数额:" prop="minAmount">
                <el-input v-model="share359Form.minAmount" style="width: 80px" size="small"></el-input>
                <label class="dist">元</label>
              </el-form-item>
              <el-form-item label="普通诉讼等待时间:" prop="ordinaryWaitingTime">
                <el-input v-model="share359Form.ordinaryWaitingTime" style="width: 80px" size="small"></el-input>
                <label class="dist">天</label>
              </el-form-item>
              <el-form-item label="共同诉讼等待时间:" prop="commonWaitingTime">
                <el-input v-model="share359Form.commonWaitingTime" style="width: 80px" size="small"></el-input>
                <label class="dist">天</label>
              </el-form-item>
<!--              <el-form-item>-->
<!--                <el-button size="mini" type="primary" >保存</el-button>-->
<!--                <el-button size="mini" type="info" >返回</el-button>-->
<!--              </el-form-item>-->
            </el-form>
          </el-col>
          <el-col :span="6" class="formBorder"><br>
            <el-form ref="refShareStockForm" :model="shareStockForm" label-width="150px" size="mini">
              <el-form-item label="section:" prop="section" v-show="isShow">
                <el-input v-model="shareStockForm.section" style="width: 80px" size="small"></el-input>
              </el-form-item>
              <el-form-item label="最低数额:" >
                <el-input v-model="shareStockForm.minAmount" style="width: 80px" size="small"></el-input>
                <label class="dist">元</label>
              </el-form-item>
              <el-form-item label="普通诉讼等待时间:" >
                <el-input v-model="shareStockForm.ordinaryWaitingTime" style="width: 80px" size="small"></el-input>
                <label class="dist">天</label>
              </el-form-item>
              <el-form-item label="共同诉讼等待时间:" >
                <el-input v-model="shareStockForm.commonWaitingTime" style="width: 80px" size="small"></el-input>
                <label class="dist">天</label>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="space-around" >
          <el-col :span="6" class="button">
            <el-button size="mini" type="primary" @click="onSubmit('refTeleConsultForm')">保存</el-button>
            <el-button size="mini" @click="recurrenc('refTeleConsultForm')">取消</el-button>
          </el-col>
          <el-col :span="6" class="button">
            <el-button size="mini" type="primary" @click="onSubmit('redShare359Form')">保存</el-button>
            <el-button size="mini" @click="recurrenc">取消</el-button>
          </el-col>
          <el-col :span="6" class="button">
            <el-button size="mini" type="primary" @click="onSubmit('refShareStockForm')">保存</el-button>
            <el-button size="mini" @click="recurrenc">取消</el-button>
          </el-col>
        </el-row>
        <br><br>
        <el-row :gutter="20" type="flex" justify="space-around" >
          <el-col :span="6" class="title"><label>平台收费比例设置</label></el-col>
          <el-col :span="6" class="title"><label>允许使用的心币比例</label></el-col>
          <el-col :span="6" class="title"><label>股票共享法律服务设置</label></el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="space-around">
          <el-col :span="6" class="formBorder"><br>
            <el-form ref="refPlatformForm" :model="platformForm" label-width="130px" size="mini">
              <el-form-item label="section:" prop="section" v-show="isShow">
                <el-input v-model="platformForm.section" style="width: 80px" size="small"></el-input>
              </el-form-item>
              <el-form-item label="电话咨询:" prop="telephoneConsultation">
                <el-input v-model="platformForm.telephoneConsultation" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
              <el-form-item label="图文咨询:" prop="pictureAndTextConsultation">
                <el-input v-model="platformForm.pictureAndTextConsultation" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
    <!--          <el-form-item label="代写文书:" prop="writtenInstruments">
                <el-input v-model="platformForm.writtenInstruments" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
              <el-form-item label="审核文书:" prop="auditDocument">
                <el-input v-model="platformForm.auditDocument" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
              <el-form-item label="律师函:" prop="lawyersLetter">
                <el-input v-model="platformForm.lawyersLetter" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>-->
              <el-form-item label="预约面谈:" prop="appointmentInterview">
                <el-input v-model="platformForm.appointmentInterview" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
              <el-form-item label="诉讼代理:" prop="litigationAgency">
                <el-input v-model="platformForm.litigationAgency" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
              <el-form-item label="其他委托:" prop="counselAssistance">
                <el-input v-model="platformForm.counselAssistance" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6" class="formBorder"><br>
            <el-form ref="refHeartCoinForm" :model="heartCoinForm" label-width="130px" size="mini">
              <el-form-item label="section:" prop="section" v-show="isShow">
                <el-input v-model="heartCoinForm.section" style="width: 80px" size="small"></el-input>
              </el-form-item>
              <el-form-item label="电话咨询:" prop="telephoneConsultation">
                <el-input v-model="heartCoinForm.telephoneConsultation" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
              <el-form-item label="图文咨询:" prop="pictureAndTextConsultation">
                <el-input v-model="heartCoinForm.pictureAndTextConsultation" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
<!--              <el-form-item label="代写文书:" prop="writtenInstruments">
                <el-input v-model="heartCoinForm.writtenInstruments" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
              <el-form-item label="审核文书:" prop="auditDocument">
                <el-input v-model="heartCoinForm.auditDocument" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
              <el-form-item label="律师函:" prop="lawyersLetter">
                <el-input v-model="heartCoinForm.lawyersLetter" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>-->
              <el-form-item label="预约面谈:" prop="appointmentInterview">
                <el-input v-model="heartCoinForm.appointmentInterview" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
              <el-form-item label="诉讼代理:" prop="litigationAgency">
                <el-input v-model="heartCoinForm.litigationAgency" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
              <el-form-item label="其他委托:" prop="counselAssistance">
                <el-input v-model="heartCoinForm.counselAssistance" style="width: 80px" size="small"></el-input>
                <label class="dist">%</label>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6" class="formBorder" style="padding: 0 0">
            <div style="height: 280px;">
              <el-scrollbar style="height: 100%;"><br>
                <el-form ref="refLawyerForm"  :model="lawyerForm" label-width="130px" size="mini">
                  <el-form-item label="section:" prop="section" v-show="isShow">
                    <el-input v-model="lawyerForm.section" style="width: 80px" size="small"></el-input>
                  </el-form-item>
<!--                  <el-form-item label="电话咨询:" prop="telephoneConsultation">
                    <el-input v-model="lawyerForm.telephoneConsultation" style="width: 80px" size="small"></el-input>
                    <label class="dist">元/分钟</label>
                  </el-form-item>
                  <el-form-item label="图文咨询:" prop="pictureAndTextConsultationByCoin">
                    <el-input v-model="lawyerForm.pictureAndTextConsultationByCoin" style="width: 80px" size="small"></el-input>
                    <label class="dist">元/次</label>
                  </el-form-item>
                  <el-form-item label="或" prop="pictureAndTextConsultationByHeartCoin">
                    <el-input v-model="lawyerForm.pictureAndTextConsultationByHeartCoin" style="width: 80px" size="small"></el-input>
                    <label class="dist">心币/次</label>
                  </el-form-item>
                  <el-form-item label="代写文书:" prop="writtenInstruments">
                    <el-input v-model="lawyerForm.writtenInstruments" style="width: 80px" size="small"></el-input>
                    <label class="dist">元/次</label>
                  </el-form-item>
                  <el-form-item label="审核文书:" prop="auditDocument">
                    <el-input v-model="lawyerForm.auditDocument" style="width: 80px" size="small"></el-input>
                    <label class="dist">元/次</label>
                  </el-form-item>
                  <el-form-item label="律师函:" prop="lawyersLetter">
                    <el-input v-model="lawyerForm.lawyersLetter" style="width: 80px" size="small"></el-input>
                    <label class="dist">元/次</label>
                  </el-form-item>
                  <el-form-item label="预约面谈:" prop="appointmentInterview">
                    <el-input v-model="lawyerForm.appointmentInterview" style="width: 80px" size="small"></el-input>
                    <label class="dist">元/小时</label>
                  </el-form-item>-->
                  <el-form-item label="诉讼代理:" prop="litigationAgency">
                    <el-input v-model="lawyerForm.litigationAgency" style="width: 80px" size="small"></el-input>
                    <label class="dist">元/起</label>
                  </el-form-item>
      <!--            <el-form-item label="律师协助" prop="" style="font-weight: bold">
&lt;!&ndash;                    <el-input v-model="lawyerForm" style="width: 80px" size="small"></el-input>&ndash;&gt;
&lt;!&ndash;                    <label class="dist">元/分钟</label>&ndash;&gt;
                  </el-form-item>
                  <el-form-item label="代为立案:" prop="daiWeiLiAn">
                    <el-input v-model="lawyerForm.daiWeiLiAn" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>
                  <el-form-item label="代为开庭:" prop="daiWeiKaiTing">
                    <el-input v-model="lawyerForm.daiWeiKaiTing" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>
                  <el-form-item label="调查取证:" prop="diaoChaQuZheng">
                    <el-input v-model="lawyerForm.diaoChaQuZheng" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>
                  <el-form-item label="取保候审:" prop="quBaoHouShen">
                    <el-input v-model="lawyerForm.quBaoHouShen" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>
                  <el-form-item label="刑事会见:" prop="xingShiHuiJian">
                    <el-input v-model="lawyerForm.xingShiHuiJian" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>
                  <el-form-item label="代为申诉:" prop="daiWeiShenSu">
                    <el-input v-model="lawyerForm.daiWeiShenSu" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>
                  <el-form-item label="协商谈判:" prop="xieShangTanPan">
                    <el-input v-model="lawyerForm.xieShangTanPan" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>
                  <el-form-item label="死刑复核:" prop="xiXingFuHe">
                    <el-input v-model="lawyerForm.xiXingFuHe" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>
                  <el-form-item label="申请强制执行:" prop="shenQingQiangZhiZhiXing">
                    <el-input v-model="lawyerForm.shenQingQiangZhiZhiXing" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>
                  <el-form-item label="申请执行异议:" prop="shenQingZhiXingYiYi">
                    <el-input v-model="lawyerForm.shenQingZhiXingYiYi" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>
                  <el-form-item label="申请诉讼保全:" prop="shenQingSuSongBaoQuan">
                  <el-input v-model="lawyerForm.shenQingSuSongBaoQuan" style="width: 80px" size="small"></el-input>
                  <label class="dist">元</label>
                </el-form-item>
                  <el-form-item label="申请先予执行:" prop="shenQingXianYuZhiXing">
                    <el-input v-model="lawyerForm.shenQingXianYuZhiXing" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>
                  <el-form-item label="行政赔偿:" prop="xingZhengPeiChang">
                    <el-input v-model="lawyerForm.xingZhengPeiChang" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>
                  <el-form-item label="刑事赔偿:" prop="xingShiPeiChang">
                    <el-input v-model="lawyerForm.xingShiPeiChang" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>
                  <el-form-item label="其他帮助:" prop="qiTaBangZhu">
                    <el-input v-model="lawyerForm.qiTaBangZhu" style="width: 80px" size="small"></el-input>
                    <label class="dist">元</label>
                  </el-form-item>-->
                </el-form>
              </el-scrollbar>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="space-around" >
          <el-col :span="6" class="button">
            <el-button size="mini" type="primary" @click="onSubmit('refPlatformForm')">保存</el-button>
            <el-button size="mini" @click="recurrenc">取消</el-button>
          </el-col>
          <el-col :span="6" class="button">
            <el-button size="mini" type="primary" @click="onSubmit('refHeartCoinForm')">保存</el-button>
            <el-button size="mini" @click="recurrenc">取消</el-button>
          </el-col>
          <el-col :span="6" class="button">
            <el-button size="mini" type="primary" @click="onSubmit('refLawyerForm')">保存</el-button>
            <el-button size="mini" @click="recurrenc('refLawyerForm')">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '../../api'
  export default {
    data: function() {
      return {
        isShow:false,
        teleConsultForm:{
          section:'',
          chargePerMinute:'',
          directCall:'',
          maxDuration:''
        },
        share359Form:{
          section:'',
          minAmount:'',
          ordinaryWaitingTime:'',
          commonWaitingTime:'',
        },
        shareStockForm:{
          section:'',
          minAmount:'',
          ordinaryWaitingTime:'',
          commonWaitingTime:'',
        },
        platformForm:{
          section:'',
          telephoneConsultation:'',
          pictureAndTextConsultation:'',
          writtenInstruments:'',
          auditDocument:'',
          lawyersLetter:'',
          appointmentInterview:'',
          litigationAgency:'',
          counselAssistance:'',
        },
        heartCoinForm:{
          section:'',
          telephoneConsultation:'',
          pictureAndTextConsultation:'',
          writtenInstruments:'',
          auditDocument:'',
          lawyersLetter:'',
          appointmentInterview:'',
          litigationAgency:'',
          counselAssistance:'',
        },
        lawyerForm:{
          section:'',
          telephoneConsultation:'',
          pictureAndTextConsultationByCoin:'',
          pictureAndTextConsultationByHeartCoin:'',
          writtenInstruments:'',
          auditDocument:'',
          lawyersLetter:'',
          appointmentInterview:'',
          litigationAgency:'',
          daiWeiLiAn:'',
          daiWeiKaiTing:'',
          diaoChaQuZheng:'',
          quBaoHouShen:'',
          xingShiHuiJian:'',
          daiWeiShenSu:'',
          xieShangTanPan:'',
          xiXingFuHe:'',
          shenQingQiangZhiZhiXing:'',
          shenQingZhiXingYiYi:'',
          shenQingSuSongBaoQuan:'',
          shenQingXianYuZhiXing:'',
          xingZhengPeiChang:'',
          xingShiPeiChang:'',
          qiTaBangZhu:'',
        },
        commonForm:{
        },
        // commonRule: [
        //   {required: true, message: '该项不能为空'}
        // ],
      }
    },
    mounted(){
      API.config.listAll().then(res=>{
        this.teleConsultForm = res[0];
        this.share359Form = res[1];
        this.shareStockForm = res[2];
        this.platformForm = res[3];
        this.heartCoinForm = res[4];
        this.lawyerForm = res[5];
      });
    },
     methods:{
       onSubmit(formName){
          switch (formName) {
            case 'refTeleConsultForm':this.commonForm = this.teleConsultForm;break;
            case 'redShare359Form':this.commonForm = this.share359Form;break;
            case 'refShareStockForm':this.commonForm = this.shareStockForm;break;
            case 'refPlatformForm':this.commonForm = this.platformForm;break;
            case 'refHeartCoinForm':this.commonForm = this.heartCoinForm;break;
            case 'refLawyerForm':this.commonForm = this.lawyerForm;break;
          };
         this.$refs[formName].validate((valid) => {
           if (valid) {
             API.config.edit(this.commonForm).then(res=>{
               this.$message({
                 message: '保存成功！',
                 type: 'success'
               });
             })
           } else {
             console.log('error submit!!');
             return false;
           }
         });
       },
       recurrenc(){
         API.config.listAll().then(res=>{
           this.teleConsultForm = res[0];
           this.share359Form = res[1];
           this.shareStockForm = res[2];
           this.platformForm = res[3];
           this.heartCoinForm = res[4];
           this.lawyerForm = res[5];
         });
       },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .title{
    background: #e5e9f2;
    border: 1px solid lightgrey;
    text-align: center;
    padding: 5px;
  }
  .button{
    border: 1px solid lightgrey;
    border-top: none;
    text-align: center;
    padding: 5px;
  }
  .formBorder{
    border: 1px solid lightgrey;
    border-top: none
  }
  .dist{
    margin-left: 10px;
  }
  //隐藏横向滚动条
  .el-scrollbar__wrap{
      overflow-x: hidden;
  }
</style>

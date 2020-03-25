<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">订单列表</div>
    </div>
    <div>
<!--      搜索查询参数表单-->
      <el-form :inline="true" :model="pars" label-width="150px" size="medium"  class="demo-form-inline">
        <el-form-item label="服务类型">
          <el-select v-model="pars.businessTypeCode" placeholder="请选择服务类型">
            <el-option
              v-for="item in orderTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="pars.payStatus" placeholder="请选择订单状态">
            <el-option label="未支付" value=0></el-option>
            <el-option label="待支付" value=1></el-option>
            <el-option label="支付成功" value=2></el-option>
            <el-option label="交易进行中" value=3></el-option>
            <el-option label="交易完成,待评价" value=4></el-option>
            <el-option label="已评价" value=5></el-option>
            <el-option label="已取消" value=6></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单起止时间">
          <el-date-picker
            v-model="pars.creatTimeDuring"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="模糊查询">
          <el-input style="width: 300px"  v-model="pars.commonColumn" placeholder="请输入订单号\手机号\用户名模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchOrder" size="small">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" @click="reset" size="small">重置</el-button>
        </el-form-item>
      </el-form>
<!--      搜索列表-->
      <div class="table-wrap" v-loading.body="loading">
<!--        表格-->
        <el-table highlight-current-row :data="tableData" width="100%" border stripe :header-cell-style="headercellSstyle" :key="$root.$children[0].keyRand">
          <el-table-column prop="orderCode"  label="订单号"   align="center"  min-width="22%"/>
          <el-table-column   prop="creator"  label="下单人"  align="center" min-width="15%"/>
          <el-table-column  prop="createTimeStr" label="下单时间" align="center"  min-width="15%"/>
          <el-table-column prop="totalFee" align="center" label="人民币费用" min-width="8%"/>
          <el-table-column prop="coinFee"  align="center"  label="心币费用"  min-width="8%"/>
          <el-table-column prop="amountFee" label="订单总金额"  align="center" min-width="8%"/>
          <el-table-column prop="businessTypeName" align="center" label="服务类型"  min-width="12%"/>
          <el-table-column prop="payStatusStr"  label="订单状态"   align="center"   min-width="15%"/>
         <!-- <el-table-column   prop="orderDesc" label="订单描述" align="center" min-width="20%"/>-->
          <el-table-column
            align="center"
            label="操作" min-width="20%">
            <template slot-scope="scope">
              <el-button   icon="el-icon-view" title="查看详情" size="small" v-power="'ddlb_check'" @click="handleView(scope.$index, scope.row)"></el-button>
              <el-button   icon="el-icon-s-data" title="交易记录" size="small" v-power="'ddjb_update'" @click="handleRecordView(scope.$index, scope.row)"></el-button>
              <el-button icon="el-icon-delete" size="small" title="删除"  type="danger" plain  v-power="'ddjb_delete'" @click="handleDelete(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
<!--  分页-->
        <div class="block pagination">
          <io-pagination :pars="pars" @change="handlePageChange"></io-pagination>
        </div>
      </div>
    </div>

    <!--详情展示弹出层-->
    <el-dialog   :visible.sync="tradeDetailData.isShow" width="85%">
      <div slot="title" style="text-align: center;color: #409EFF;font-size: 22px">{{tradeDetailData.title}}</div>
      <div>
        <el-steps  space="100px" direction="vertical" :active="tradeDetailData.tradeData.length">
          <el-step :title="'交易过程--'+(index+1)"
                   :description="step.tradeDetailDesc"
                   :status="step.id==tradeDetailData.recordId?'success':'finish'"
                   v-for="(step,index) in tradeDetailData.tradeData" :key="index">
          </el-step>
        </el-steps>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import API from '../../api'
  import PageCache from '../../utils/pageCache'
  import ioPagination from '../../components/ioPagination.vue'
  export default {
    components: {
      ioPagination
    },
    data: function() {
      return {
        tableData:[],
        loading  : true,
        orderTypeOptions:this.GLOBAL.BUSINESS_TYPE.ORDER_BUSINESS_TYPE,
        pars: {
          pageSize    : this.GLOBAL.PAGE_COG.PAGESIZE,
          pageNum     : this.GLOBAL.PAGE_COG.PAGENUM,
          total       : this.GLOBAL.PAGE_COG.TOTAL,
          businessTypeCode: '',
          payStatus   : '',
          creatTimeDuring:[],
          commonColumn:''
        },
        tradeDetailData:{
          isShow:false,
          title:'交易明细',
          tradeData:[
            {id:1,tradingDescription:'步骤1的描述'},
            {id:2,tradingDescription:'步骤2的描述'},
            {id:3,tradingDescription:'步骤3的描述'},
          ],
        },
      }
    },
    mounted(){
      //获取页面缓存
      this.pars = {...this.pars, ...PageCache.getPars(this.$route.path)};
      console.log("初始化订单列表数据参数",this.pars);
      this.loadData();
    },
    methods:{
      //加载订单列表
      loadData(){
        this.loading = true;
        API.orderManage.list(this.pars).then(res=> {
          if (res!=null){
            this.pars.total = res.total;
            this.pars.pageNum = res.pageNum;
            this.pars.pageSize = res.pageSize;
            this.tableData = res.list;
          }
          else{
            this.pars.total = 0;
            this.pars.pageNum =1;
            this.pars.pageSize = 10;
            this.tableData=[];
          }
          this.loading = false;
        });
      },
      //搜索订单
      searchOrder(){
        this.pars.pageNum=1;
        if (this.pars.creatTimeDuring.length>0){
           let  startTime=  this.pars.creatTimeDuring[0].valueOf();
           let  endTime=this.pars.creatTimeDuring[1].valueOf();
           this.pars.startTime=startTime;
           this.pars.endTime=endTime;
           console.log("--------startTime------"+startTime+",---endTime---"+endTime);
        }
        console.log("搜索订单的参数:",this.pars);
        this.loadData();
      },
      //重置搜索
      reset(){
        this.pars.total =this.GLOBAL.PAGE_COG.TOTAL;
        this.pars.pageNum =this.GLOBAL.PAGE_COG.PAGENUM;
        this.pars.pageSize = this.GLOBAL.PAGE_COG.PAGESIZE;
        this.pars.businessTypeCode="";
        this.pars.payStatus="";
        this.pars.creatTimeDuring=[];
        this.pars.commonColumn="";
        this.pars.startTime="";
        this.pars.endTime="";
        this.loadData()
      },
      //具体信息
      handleView(index, row){
        PageCache.savePars(this.$route.path, this.pars);   //保存页面条件
        this.$router.push({path: '/order/orderDetail/' + row.orderId});
      },
      //交易记录明细
      handleRecordView(index, row){
        let that=this;
        let orderCode=row.orderCode==null?"无":row.orderCode;
        //余额交易明细查询参数
        if (orderCode.length>4){
          /*初始化数据*/
          that.loading=true;
          that.tradeDetailData.isShow=false;
          that.tradeDetailData.tradeData=[];
          that.tradeDetailData.recordId=row.id;
          let detailParam = {orderCode:row.orderCode,tradeType:0};
          API.tradeRecord.historyTradeDetail(detailParam).then(res => {
            if (res!=null){
              that.tradeDetailData.isShow=true;
              that.tradeDetailData.title="订单:["+orderCode+"]交易明细";
              that.tradeDetailData.tradeData=res.tradeData;
            }else{
              console.log("--------------加载交易详情信息失败---------------");
            }
            this.loading=false;
          });
        }
        else{
          that.$notify({
            title: '提示',
            message: '丢失交易单号,无法获取更多详情',
            type: 'warning'
          });
        }
      },

      //删除该行
      handleDelete(index, row){
        this.$confirm('确认是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type             : 'warning'
        }).then(() => {
          API.orderEvaluate.delete({id: row.id}).then(res=> {
            this.pars.total--;
            this.tableData.splice(index, 1);
            this.$message({
              type   : 'success',
              message: '删除成功!'
            });
          })
        }).catch(() => {

        });
      },
      //页面改变回传函数
      handlePageChange(newVal){
        this.pars = newVal;
        this.loadData();
      },
      headercellSstyle({row, rowIndex}) {
        return 'text-align:center;';
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


<style scoped>

</style>

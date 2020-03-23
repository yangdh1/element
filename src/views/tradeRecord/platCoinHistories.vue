<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title"><span style="font-weight: bolder">平台心币交易记录</span></div>
    </div>
    <div>
      <!--      搜索查询参数表单-->
      <el-form :inline="true" :model="params" label-width="100px" size="small"  class="demo-form-inline">
        <el-form-item label="查询角色">
          <el-select v-model="params.roleType" placeholder="请选择用户角色">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="普通用户" value="1"></el-option>
            <el-option label="律师" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支类型">
          <el-select v-model="params.paymentType" placeholder="请选择收支类型">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="收入" value="0"></el-option>
            <el-option label="支出" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务类型">
          <el-select v-model="params.businessTypeCode" placeholder="请选择服务类型">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="电话咨询" value="100000"></el-option>
            <el-option label="图文咨询" value="200000"></el-option>
            <el-option label="预约面谈" value="600000"></el-option>
            <el-option label="诉讼代理" value="700000"></el-option>
            <el-option label="其他委托" value="000000"></el-option>
            <el-option label="非业务类型交易" value="0000000"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-date-picker
            v-model="params.creatTimeDuring"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="模糊查询">
          <el-input style="width: 300px"  v-model="params.commonColumn" placeholder="请输入订单号\手机号\用户名模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchHistory" size="small">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" @click="resetSearch" size="small">重置</el-button>
        </el-form-item>
      </el-form>
      <!--查询结果-->
      <div class="table-wrap" v-loading.body="loading">
        <!--列表展示-->
        <el-table  highlight-current-row
                   border
                   stripe
                   show-summary
                  :summary-method="getSummaries"
                  :data="tableData"
                  :default-sort = "{prop: 'createTimeStr', order: 'descending'}"
                  style="width: 100%">
          <el-table-column sortable prop="id" label="ID" align="center"  min-width="2%"></el-table-column>
          <el-table-column label="交易用户" align="center"  min-width="5%">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.userName }}</p>
                <p>电话: {{ scope.row.userTel==null?"---": scope.row.userTel }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.userName }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="roleName" align="center" label="用户角色"  min-width="5%"></el-table-column>
          <el-table-column prop="paymentTypeName"  align="center" label="收支类型"  min-width="5%"></el-table-column>
          <el-table-column prop="amount"  align="center" label="交易数量"  min-width="5%"></el-table-column>
          <el-table-column prop="serviceTypeName" align="center"  label="业务类型" min-width="5%"></el-table-column>
          <el-table-column  align="center" label="交易单号"  min-width="15%">
            <template slot-scope="scope">
              <p>{{ scope.row.orderCode==null?"非业务订单,无交易单号":scope.row.orderCode }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="createTimeStr"   sortable  align="center" label="交易时间" min-width="8%"></el-table-column>
          <el-table-column prop="tradingDescription"  align="center" label="交易描述"  min-width="15%"></el-table-column>
          <!--操作8-->
          <el-table-column  align="center"  label="操作" min-width="8%">
            <template slot-scope="scope">
              <el-button icon="el-icon-view" title="查看详情" v-power="'ptxb_check'" size="small"  @click="handleView(scope.$index, scope.row)"></el-button>
              <el-button icon="el-icon-delete" size="small" v-power="'ptxb_delete'" title="删除" type="danger" plain  @click="handleDelete(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页展示-->
        <div class="block pagination">
          <io-pagination :pars="params" @change="handlePageChange"></io-pagination>
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
        params: {
          pageSize    : this.GLOBAL.PAGE_COG.PAGESIZE,
          pageNum     : this.GLOBAL.PAGE_COG.PAGENUM,
          total       : this.GLOBAL.PAGE_COG.TOTAL,
          roleType    :'-1',   //1用户  2律师
          paymentType :'-1',   // 0收入  1支出
          businessTypeCode:'-1', //业务类型代号
          creatTimeDuring:[],  //起止时间
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
      this.params = {...this.params, ...PageCache.getPars(this.$route.path)};
      this.loadData();
    },
    methods:{
      loadData(){
        this.loading = true;
        API.tradeRecord.platCoinHistories(this.params).then(res=> {
          console.log("平台心币历史交易记录",res);
          if (res!=null){
            this.params.total = res.total;
            this.params.pageNum = res.pageNum;
            this.params.pageSize = res.pageSize;
            this.tableData = res.list;
          }
          this.loading = false;
        });
      },
      //搜索查询
      searchHistory(){
        this.params.pageNum=1;
        if (this.params.creatTimeDuring.length>0){
          let  startTime=  this.params.creatTimeDuring[0].valueOf();
          let  endTime=this.params.creatTimeDuring[1].valueOf();
          this.params.startTime=startTime;
          this.params.endTime=endTime;
          console.log("--------startTime------"+startTime+",---endTime---"+endTime);
        }
        this.loadData();
      },
      //充值搜索
      resetSearch(){
        this.params.total =this.GLOBAL.PAGE_COG.TOTAL;
        this.params.pageNum =this.GLOBAL.PAGE_COG.PAGENUM;
        this.params.pageSize = this.GLOBAL.PAGE_COG.PAGESIZE;
        this.params.businessTypeCode="-1";
        this.params.creatTimeDuring=[];
        this.params.commonColumn="";
        this.params.roleType="-1";
        this.params.paymentType="-1";
        this.params.startTime="";
        this.params.endTime="";
        this.loadData();
      },
      //当前页数据统计
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '(元/个)';
          } else {
            sums[index] = 'N/A';
          }
        });
        return sums;
      },

      //查询详情
      //查询交易明细
      handleView(index,row){
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
          let delParam={id: row.id,type:3};
          API.tradeRecord.deleteHistoryTradeRecord(delParam).then(res=> {
            this.params.total--;
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
        this.params = newVal;
        this.loadData();
      },

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


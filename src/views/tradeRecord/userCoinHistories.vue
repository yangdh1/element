<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">用户心币交易记录</div>
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
        <el-table class="el-table" highlight-current-row :data="tableData" width="100%" border stripe :header-cell-style="headercellSstyle" :key="$root.$children[0].keyRand">
          <!--操作8-->
          <el-table-column
            align="center"
            label="操作" min-width="8%">
            <template slot-scope="scope">
              <el-button icon="el-icon-view" title="查看详情" size="small"  @click="handleView(scope.$index, scope.row)"></el-button>
              <el-button icon="el-icon-delete" size="small" title="删除" type="danger" plain  v-power="'orderEvaluate_delete'" @click="handleDelete(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block pagination">
          <io-pagination :pars="params" @change="handlePageChange"></io-pagination>
        </div>
      </div>
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
          creatTimeDuring:'',  //起止时间
          commonColumn:''
        }
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
        API.tradeRecord.userCoinHistories(this.params).then(res=> {
          console.log("用户心币历史记录查询结果",res);
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
          let  startTime=  this.pars.creatTimeDuring[0].valueOf()
          let  endTime=this.pars.creatTimeDuring[1].valueOf();
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

      //删除该行
      handleDelete(index, row){
        this.$confirm('确认是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type             : 'warning'
        }).then(() => {
          API.orderEvaluate.delete({id: row.id}).then(res=> {
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

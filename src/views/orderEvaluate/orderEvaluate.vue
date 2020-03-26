<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">订单列表</div>
    </div>
    <div>
      <el-form :inline="true" :model="pars" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="pars.evaluateContent"   clearable size="small" style="width: 350px" prefix-icon="el-icon-search" placeholder="输入评论内容进行搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table-wrap" v-loading.body="loading">

        <el-table class="el-table" highlight-current-row :data="tableData" width="100%" border stripe :header-cell-style="headercellSstyle" :key="$root.$children[0].keyRand">
       <!--订单类型 8-->
          <el-table-column
            prop="serviceTypeName"
            label="订单类型"
            align="center"
            min-width="8%"/>
       <!--订单号 15-->
          <el-table-column
            prop="orderCode"
            label="订单号"
            align="center"
            min-width="15%"/>
     <!--用户8-->
          <el-table-column
            prop="creatorUserName"
            align="center"
            label="撰写用户"
            min-width="8%"/>
        <!--律师8-->
          <el-table-column
            prop="lawyerName"
            align="center"
            label="被评价律师"
            min-width="8%"/>
         <!--专业评分 6-->
  <!--        <el-table-column
            prop="professionalGrade"
            label="专业评分"
            align="center"
            min-width="6%"/>-->
         <!--态度评分 6-->
        <!--  <el-table-column
            prop="attitudeGrade"
            label="态度评分"
            align="center"
            min-width="6%"/>-->
         <!--效率评分 6-->
      <!--    <el-table-column
            prop="efficiencyGrade"
            label="效率评分"
            align="center"
            min-width="6%"/>-->
<!--          综合评分 6-->
          <el-table-column
            prop="syntheticalGrade"
            label="综合评分"
            align="center"
            min-width="6%"/>
 <!--评价内容 15-->
          <el-table-column
            prop="evaluateContent"
            label="评价内容"
            align="center"
            min-width="15%"/>
  <!--评价时间 8-->
          <el-table-column
            prop="createTimeStr"
            label="评价时间"
            align="center"
            min-width="8%"/>
        <!--操作8-->
          <el-table-column
            align="center"
            label="操作" min-width="8%">
            <template slot-scope="scope">
              <el-button type="primary" plain size="small" v-power="'ddpl_check'"  @click="handleView(scope.$index, scope.row)">详情</el-button>
              <el-button type="danger" plain  size="small" v-power="'orderEvaluate_delete'" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block pagination">
          <io-pagination :pars="pars" @change="handlePageChange"></io-pagination>
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
        pars: {
          pageSize    : this.GLOBAL.PAGE_COG.PAGESIZE,
          pageNum     : this.GLOBAL.PAGE_COG.PAGENUM,
          total       : this.GLOBAL.PAGE_COG.TOTAL,
          evaluateContent: ''
        }
      }
    },
    mounted(){
      //获取页面缓存
      this.pars = {...this.pars, ...PageCache.getPars(this.$route.path)};
      this.loadData();
    },
    methods:{
      loadData(){
        this.loading = true;
        API.orderEvaluate.list(this.pars).then(res=> {
          console.log(res);
          this.pars.total = res.total;
          this.pars.pageNum = res.pageNum;
          this.pars.pageSize = res.pageSize;
          this.loading = false;
          this.tableData = res.list;
        });
      },
      search(){
        this.pars.pageNum=1;
        this.loadData();
      },
      //具体信息
      handleView(index, row){
        PageCache.savePars(this.$route.path, this.pars);   //保存页面条件
        this.$router.push({path: 'detail/' + row.id});
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

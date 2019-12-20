<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">359会员列表</div>
    </div>
    <div>
      <el-form :inline="true" :model="pars" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="pars.commonColumn"   clearable size="small" style="width: 350px" prefix-icon="el-icon-search" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table-wrap" v-loading.body="loading">
        <el-table highlight-current-row :data="tableData" width="100%" border stripe :header-cell-style="headercellSstyle" :key="Math.random()">
          <el-table-column
            prop="name"
            label="真实姓名"
            min-width="15%"/>
          <el-table-column
            prop="nickName"
            label="昵称"
            min-width="15%"/>
          <el-table-column
            prop="mobile"
            label="手机号"
            min-width="15%"/>
          <el-table-column
            prop="ordinaryBalancePrecision"
            label="余额"
            min-width="15%"/>
          <el-table-column
            label="操作" min-width="20%">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-view"
                title="查看详情"
                size="small"
                @click="handleView(scope.$index, scope.row)"></el-button>
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
          id:''
         // commonColumn : '',

        }
      }
    },
    mounted(){
      //获取页面缓存
      this.pars = {...this.pars, ...PageCache.getPars(this.$route.path)};
      this.loadData();
    //  this.loadRole();
    },
     methods:{
    //   loadRole(){
    //     API.role.listAll().then(res=>{
    //       this.roleArr = res ;
    //     });
    //   },
      loadData(){
        this.loading = true;
        API.ordinaryVip.listVip(this.pars).then(res=> {
          this.pars.total = res.total;
          this.pars.pageNum = res.pageNum;
          this.pars.pageSize = res.pageSize;
          this.loading = false;
          console.log(res);
          this.tableData = res.list;
        });
      },
       handleView(index, row){
         PageCache.savePars(this.$route.path, this.pars);   //保存页面条件
         this.$router.push({path: 'details/'+row.userId});
       },
      search(){
        this.pars.pageNum=1;
        this.loadData();
      },

      handleGrant(index, row){
        //保存页面条件
        PageCache.savePars(this.$route.path, this.pars);
        this.$router.push({ path: 'loadResource/' + row.id });
      },
      handlePosition(index, row){
        PageCache.savePars(this.$route.path, this.pars);
        this.$router.push({ path: 'positionResource/' + row.id });
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

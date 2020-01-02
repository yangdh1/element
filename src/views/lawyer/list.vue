<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">律师审核列表</div>
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
        <el-table highlight-current-row :data="tableData" width="100%" border stripe :header-cell-style="headercellSstyle" :key="$root.$children[0].keyRand">
          <el-table-column
            prop="accounts"
            label="帐号"
            min-width="15%"/>
          <el-table-column
            prop="nickName"
            label="昵名"
            min-width="15%"/>
          <el-table-column
            prop="enterpriseName"
            label="企业名称"
            min-width="15%"/>
          <el-table-column
            prop="enterpriseCode"
            label="企业信用代码"
            min-width="15%"/>
          <el-table-column
            prop="company"
            label="单位"
            min-width="15%"/>
          <el-table-column
            prop="school"
            label="学校名称"
            min-width="15%"/>
          <el-table-column
            prop="introduction"
            label="简介"
            min-width="15%"/>
          <el-table-column
            label="操作" min-width="20%">
            <template slot-scope="scope">
              <el-button
                icon="iconfont icon-shenpi"
                title="审核"
                size="small"
                @click="handleEdit(scope.$index, scope.row)"></el-button>
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
        API.lawyer.list(this.pars).then(res=> {
          this.pars.total = res.total;
          this.pars.pageNum = res.pageNum;
          this.pars.pageSize = res.pageSize;
          this.loading = false;
          console.log(res);
          this.tableData = res.list;
        });
      },
      search(){
        this.pars.pageNum=1;
        this.loadData();
      },
      //审核
      handleEdit(index, row){
          API.lawyer.toExamine({id: row.id}).then(res=> {
            this.pars.total--;
            this.tableData.splice(index, 1);
            this.$message({
              type   : 'success',
              message: '审核通过!'
            });
            this.loadData();
          })
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

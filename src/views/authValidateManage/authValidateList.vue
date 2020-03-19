<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">认证管理</div>
    </div>
    <div>
      <el-form :inline="true" :model="pars" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="pars.name" placeholder="请输入关键字模糊查询" size="small" style="width: 500px"  prefix-icon="el-icon-search" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="table-wrap" v-loading.body="loading">
        <el-table highlight-current-row :data="tableData"  border style="width: 100%" border @selection-change="selsChange" stripe :header-cell-style="headercellSstyle" :key="$root.$children[0].keyRand">
          <el-table-column label="序号"
            type="index"
            width="60%"/>
          <el-table-column prop="mobile" label="账号" min-width="30%"></el-table-column>
          <el-table-column prop="nickName" label="昵称" min-width="30%"></el-table-column>
          <el-table-column prop="sex" label="性别" min-width="20%" :key="$root.$children[0].keyRand">
            <template slot-scope="scope">
              <p v-if="scope.row.sex == 1">男</p>
              <p v-if="scope.row.sex == 2">女</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="20%">
            <template slot-scope="scope">
              <el-button   size="small" @click="handleEdit(scope.$index, scope.row)" v-power="'role_update'">认证审核</el-button>

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
  import API from '../../api/index'
  import PageCache from '../../utils/pageCache'
  import ioPagination from '../../components/ioPagination.vue'
  export default {
    components: {
      ioPagination
    },
    data: function() {
      return {
        sels: [],
        pars: {
          name:'',
          user: '',
          region: '',
          pageNum: 1,
          total: 1
        },
        loading: true,
        tableData: []
      }
    },
    mounted(){
      //获取页面缓存
      this.pars = { ...this.pars, ...PageCache.getPars(this.$route.path)};
      this.loadData();

    },
    methods: {

      /**
       *  数据加载
       */
      loadData() {
        this.loading = true;
        API.lawyer.list(this.pars).then(res => {
          this.pars.total = res.total;
          this.pars.pageNum = res.pageNum;
          this.pars.pageSize = res.pageSize;
          this.loading = false;
          console.log("----------------------------------");
          console.log(res);
          this.tableData = res.list;
        });
      },
      search(){
        this.pars.pageNum=1;
        this.loadData();
      },
      //编辑
      handleEdit(index, row){
        //保存页面条件
        PageCache.savePars(this.$route.path, this.pars);
        this.$router.push({ path: 'checkAuthValidate/' + row.id });
      },
      selectAble(row){
        if(row.status==3){
          return false;
        }else {
          return true;
        }
      },
      //页面改变回传函数
      handlePageChange(newVal){
        this.pars = newVal;
        this.loadData();
      },
      selsChange(sels) {
        this.sels = sels;
        this.pars.sellers=sels;
      },
      //新增
      handleAdd(){
        this.$router.push({ path: 'add'});
      },
      headercellSstyle({row, rowIndex}) {
        return 'text-align:center;';
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

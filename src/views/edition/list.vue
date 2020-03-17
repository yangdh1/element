<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">应用版本管理列表</div>
    </div>
    <div>
      <el-form :inline="true" :model="pars" class="demo-form-inline"  @submit.native.prevent>
        <el-form-item >
          <el-input v-model="pars.commonColumn"  size="small" style="width: 450px" prefix-icon="el-icon-search" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"  icon="el-icon-search"  @click="search"  size="small">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="addDev" size="small" icon="el-icon-plus"  v-power="'appVersion_add'">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleQR" size="small" v-power="'appVersion_add'">二维码下载链接</el-button>
        </el-form-item>
      </el-form>
      <div class="table-wrap" v-loading.body="loading">
        <el-table highlight-current-row :data="tableData" width="100%" border stripe=""  :key="$root.$children[0].keyRand">
          <el-table-column
          prop="name"
          label="名称"
          min-width="30%"/>
          <el-table-column
            prop="version"
            label="版本"
            min-width="25%"/>
          <el-table-column
            prop="appType"
            label="应用类型"
            min-width="15%">
            <template slot-scope="scope">
              <p v-if="scope.row.appType == 1">android</p>
              <p v-if="scope.row.appType == 2">ios</p>
              <p v-if="scope.row.appType == 3">windows</p>
            </template>
          </el-table-column>

          <el-table-column
            prop="clientType"
            label="客户端类型"
            min-width="15%">
            <template slot-scope="scope">
              <p v-if="scope.row.clientType == 1">普通用户端</p>
              <p v-if="scope.row.clientType == 2">律师用户端</p>
              <!--<p v-if="scope.row.clientType == 3">物业端</p>
              <p v-if="scope.row.clientType == 4">智慧后勤</p>-->
            </template>
          </el-table-column>
          <el-table-column
            label="操作" min-width="15%">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit-outline"
                title="编辑"
                size="small"
                v-power="'appVersion_update'"
                @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button icon="el-icon-error"size="small" title="删除" type="danger"   v-power="'appVersion_delete'" @click="handleDelete(scope.$index, scope.row)"></el-button>
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
  // import { Navbar, Sidebar, AppMain } from 'views/layout'
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
          bureauName  : '',
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
        API.appVersionManager.list(this.pars).then(res=> {
          this.pars.total = res.total;
          this.pars.pageNum = res.pageNum;
          this.pars.pageSize = res.pageSize;
          this.loading = false;
          this.tableData = res.lawyerList;
        });
      },
      search(){
        this.pars.pageNum=1;
        this.loadData();
      },
      addDev(){
        this.$router.push({path: 'add'});
      },
      handleQR(){
        this.$router.push({path: 'qrPage'});
      },
      //编辑
      handleEdit(index, row){
        PageCache.savePars(this.$route.path, this.pars);   //保存页面条件
        this.$router.push({path: 'edit/' + row.id});
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
          API.appVersionManager.delete({id: row.id}).then(res=> {
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
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

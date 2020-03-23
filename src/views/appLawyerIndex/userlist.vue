<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">首页轮播图管理</div>
    </div>
    <div class="bs-header">
      <el-row :gutter="20">

        <el-col :span="2">
          <el-button type="text" disabled @click="$router.push({path: 'userlist'})" v-power="'ptyh_add'"><span style="font-weight:bold;color:blue">用户首页</span>
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="text" v-power="'lssy_delete'" @click="$router.push({path: 'list'})">
            <span style="color: black">        律师首页</span></el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-form :inline="true" :model="pars" class="demo-form-inline"  @submit.native.prevent>
        <el-form-item>
          <el-input v-model="pars.title"  size="small" style="width: 350px" clearable prefix-icon="el-icon-search" placeholder="请输入轮播图标题模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search"  @click="search" size="small">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-plus" @click="addDev" size="small" >新增</el-button>
        </el-form-item>
      </el-form>
      <div class="table-wrap" v-loading.body="">
        <el-table highlight-current-row :data="tableData" width="100%" stripe border :header-cell-style="headercellSstyle">
          <el-table-column
            prop="title"
            label="标题"
            min-width="60%"/>
          <el-table-column
            prop="url"
            label="图片"
            min-width="10%">
          <template slot-scope="scope">
            <img :src="scope.row.url" width="70" height="50"/>
          </template>
          </el-table-column>
          <el-table-column
            prop="seq"
            label="排序"
            min-width="5%"/>
          <el-table-column
            label="操作" min-width="25%">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit-outline"
                title="编辑"
                size="small"
                @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button icon="el-icon-error" size="small" title="删除" type="danger"   @click="handleDelete(scope.$index, scope.row)"></el-button>
             <!-- <el-button icon="el-icon-view" size="small" title="查看详情" @click="handleView(scope.$index, scope.row)"></el-button>-->
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
        API.carouselFigureManager.listAppGeneralUser(this.pars).then(res=> {
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
      addDev(){
        this.$router.push({path: 'addUserImg'});
      },
      //编辑
      handleEdit(index, row){
        PageCache.savePars(this.$route.path, this.pars);   //保存页面条件
        this.$router.push({path: 'editUserImg/' + row.id});
      },
      //具体信息
      handleView(index, row){
        PageCache.savePars(this.$route.path, this.pars);   //保存页面条件
        this.$router.push({path: 'appcarouselFigureUserDetail/' + row.id});
      },
      //删除该行
      handleDelete(index, row){
        this.$confirm('确认是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type             : 'warning'
        }).then(() => {
          API.carouselFigureManager.delete({id: row.id}).then(res=> {
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
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

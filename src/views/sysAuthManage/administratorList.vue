<template>
  <div  class="page-content">
    <!--头-->
    <div class="bs-header">
      <div class="bs-title">管理员列表</div>
    </div>
    <div>
      <!--查询搜索条件-->
      <div>
        <el-form :inline="true" :model="pars" class="demo-form-inline" label-width="100px" size="small" >
          <el-form-item label="关键字">
            <el-input v-model="pars.commonColumn"   clearable size="small" style="width: 350px" prefix-icon="el-icon-search" placeholder="输入搜索关键字模糊查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
          </el-form-item>
          <el-form-item >
            <el-button type="success" icon="el-icon-position" @click="addItem" size="small" >新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--查询列表-->
      <div class="table-wrap" v-loading.body="loading">
        <el-table :data="tableData"  border  style="width: 100%;">
          <el-table-column align="center" prop="mobile"    label="管理员账号" min-width="150" ></el-table-column>
          <el-table-column align="center" prop="name"  label="姓名" min-width="120" ></el-table-column>
          <el-table-column align="center" prop="roleName"  label="角色名称"  min-width="120"></el-table-column>
          <el-table-column
            label="状态"
            min-width="100">
            <template slot-scope="scope">
              <p v-if="scope.row.deleteFlag == 0">启用</p>
              <p v-if="scope.row.deleteFlag == 1">停用</p>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right"  label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
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
  import axios from "axios";
  import {BaseAPI, MultipartAPI} from '../../api/api'
  export default {
    components: {
      ioPagination
    },
    data() {
      return {
        loading:false,
        tableData:[],
        pars: {
          pageSize    : this.GLOBAL.PAGE_COG.PAGESIZE,
          pageNum     : this.GLOBAL.PAGE_COG.PAGENUM,
          total       : this.GLOBAL.PAGE_COG.TOTAL,
          searchKeyWords: '',
        },


      }
    },

    methods: {
      handleEdit(row) {
        //保存页面条件
        PageCache.savePars(this.$route.path, this.pars);
        this.$router.push({ path: 'editSysAuthManage/' + row.id });
      },
      handleDelete(index, row){
        this.$confirm('确认是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type             : 'warning'
        }).then(() => {
          API.user.delete({id: row.id}).then(res=> {
            this.pars.total--;
            this.tableData.splice(index, 1);
            this.$message({
              type   : 'success',
              message: '删除成功!'
            });
            this.loadData();
          })
        }).catch(() => {

        });
      },
      //加载列表数据
      //页面改变回传函数
      handlePageChange(newVal){
        this.pars = newVal;
        this.loadData();
      },

      loadData(){

          //加载数据 通过pars加载数据
          this.loading = true;
          API.user.oAlist(this.pars).then(res=>{
            this.pars.total = res.total;
            this.pars.pageNum = res.pageNum;
            this.loading = false;
            this.tableData = res.list;
            console.log("111111111111111111111111111111111111111111")
            console.log(res.list)
          });

      },
      //搜索数据
      search() {
        this.pars.pageNum=1;
        this.loadData();
      },
      //重置搜索
      reset() {
      },
      //新增
      addItem(){

        this.$router.push({ path: 'addAdministrator'});
      }
    },


    mounted(){
      //获取页面缓存
      this.pars = { ...this.pars, ...PageCache.getPars(this.$route.path)};
      this.loadData();

    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

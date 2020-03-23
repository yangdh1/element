<template>
  <div  class="page-content">
    <!--头-->
    <div class="bs-header">
      <div class="bs-title">角色权限</div>
    </div>
    <!--数据列表-->
    <div>
      <!--查询搜索条件-->
      <div>
        <el-form :inline="true" :model="pars" class="demo-form-inline" label-width="100px" size="small" >
          <el-form-item label="关键字">
            <el-input v-model="pars.searchKeyWords"   clearable size="small" style="width: 350px" prefix-icon="el-icon-search" placeholder="输入搜索关键字模糊查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="info" icon="el-icon-refresh-right" @click="reset" size="small">重置</el-button>
          </el-form-item>
          <el-form-item >
            <el-button type="success" icon="el-icon-position" @click="addItem" size="small" >新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--查询列表-->
      <div class="table-wrap" v-loading.body="loading">
        <el-table :data="tableData"  border  style="width: 100%;">
          <el-table-column align="center" prop="roleName"    label="角色" min-width="150" ></el-table-column>
          <el-table-column align="center" prop="roleDesc"  label="备注"  min-width="120"> </el-table-column>
          <el-table-column align="center" fixed="right"  label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handlePrivileges(scope.row)" type="text" size="small">权限分配</el-button>
              <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--弹窗-->

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

    methods: {
      //编辑信息
      handleEdit(row) {
        console.log("----编辑----",row);
      },
      //删除角色,连带删除该角色的所有关联记录
      handleDelete(){
        console.log("----删除角色----",row);
      },
      //权限分配
      handlePrivileges(row){
        console.log("----分配权限----",row);
      },
      //加载列表数据
      loadData(){
        console.log("----初始化角色列表---",this.pars);
      },
      //搜索数据
      search() {
        this.pars.pageNum=1;
      },
      //重置搜索
      reset() {
        this.pars.pageNum=1;
        this.pars.pageSize=10;
        this.pars.searchKeyWords="";
      },
      //新增
      addItem(){
        console.log("----新增角色----");
        this.$router.push({path: '/sysAuthManage/addRole'});
      }
    },

    data() {
      return {
        loading:false,
        pars: {
          pageSize    : this.GLOBAL.PAGE_COG.PAGESIZE,
          pageNum     : this.GLOBAL.PAGE_COG.PAGENUM,
          total       : this.GLOBAL.PAGE_COG.TOTAL,
          searchKeyWords: '',
        },
        tableData: [
          {id:1,roleName :'超级管理员',roleDesc:'具备所有的权限功能'},
          {id:2,roleName :'普通管理员',roleDesc:'具备部分权限功能'},
        ]
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

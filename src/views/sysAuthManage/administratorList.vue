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
          <el-table-column align="center" prop="userName"    label="管理员账号" min-width="150" ></el-table-column>
          <el-table-column align="center" prop="realName"  label="姓名" min-width="120" ></el-table-column>
          <el-table-column align="center" prop="roleName"  label="角色名称"  min-width="120"></el-table-column>
          <el-table-column align="center"  label="状态"  min-width="120">
               <template slot-scope="scope">
                    <div>
                       <p v-if="scope.row.status==0">正常</p>
                       <p v-else>禁用</p>
                    </div>
               </template>
          </el-table-column>
          <el-table-column align="center" fixed="right"  label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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

    methods: {
      handleEdit(row) {
        console.log("----编辑----",row);
      },
      handleDelete(row){
         console.log("----删除----",row);
      },
      //加载列表数据
      loadData(){

      },
      //搜索数据
      search() {
      },
      //重置搜索
      reset() {
      },
      //新增
      addItem(){

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
          {
          userName: 'administrator',
          realName: '皮皮虾',
          roleId:1,
          roleName: '超级管理员',
          status:0
          },
          {
          userName: 'zhangsan',
          realName: '张三',
          roleId:2,
          roleName: '普通管理员',
          status:1
          }
        ]
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">应用版本列表</div>
    </div>
    <div>
      <el-form :inline="true" :model="pars" class="demo-form-inline">
        <el-form-item label="所属产品" prop="productId">
          <el-select v-model="pars.productId"
                     placeholder="请选择所属产品"
                     size="small"
                     style="width: 200px"
                     clearable>
            <el-option v-for="item in productAll"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="pars.name" placeholder="输入应用名查询" size="small" style="width: 350px"  prefix-icon="el-icon-search" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
        </el-form-item>
        <el-form-item >
          <el-button type="success" @click="handleAdd" size="small" icon="el-icon-plus" v-power="'yrbf_add'">新增</el-button>
        </el-form-item>
      </el-form>

      <div class="table-wrap" v-loading.body="loading">
        <el-table highlight-current-row :data="tableData"  border style="width: 100%" stripe :header-cell-style="headercellSstyle" :key="Math.random()">
          <el-table-column prop="productName" label="产品名" min-width="25%"></el-table-column>

          <el-table-column prop="name" label="应用名" min-width="45%"></el-table-column>
          <el-table-column prop="version" label="版本号" min-width="25%"></el-table-column>
        <!--  <el-table-column prop="path" label="文件"   min-width="55px">
          </el-table-column>-->
          <el-table-column prop="createTimeStr" label="创建时间" min-width="35%"></el-table-column>
          <el-table-column label="操作" min-width="55%">
            <template slot-scope="scope">
              <el-button   icon="el-icon-edit-outline" v-power="'yrbf_update'" title="编辑" size="small" @click="handleEdit(scope.$index, scope.row)" ></el-button>
            <el-button icon="el-icon-delete" title="删除" v-power="'yrbf_delete'" size="small" type="danger" plain @click="handleDelete(scope.$index, scope.row)"></el-button>
        <!--      <el-button size="small" @click="handleGrant(scope.$index, scope.row)"  >下载</el-button>-->
              <el-button title="下载" v-power="'yrbf_xz'" icon="el-icon-download" size="small" @click="handleDownload(scope.$index, scope.row)"></el-button>
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
  import {BaseAPI} from "../../api/api";
  export default {
    components: {
      ioPagination
    },
    data: function() {
      return {
        pars: {
          name:'',
          user: '',
          region: '',
          pageNum: 1,
          total: 1
        },
        loading: true,
        productAll:[],
      }
    },
    mounted(){
      //获取页面缓存
      this.pars = { ...this.pars, ...PageCache.getPars(this.$route.path)};
      this.loadData();
      let obj = {id:0};
      API.product.productAll(obj).then(res=>{
        this.productAll = res
      });

    },
    methods: {

      /**
       *  数据加载
       */
      loadData(){

        //加载数据 通过pars加载数据
        this.loading = true;
        API.app.list(this.pars).then(res=>{
          this.pars.total = res.total;
          this.pars.pageNum = res.pageNum;
          this.loading = false;
          this.tableData = res.lawyerList;
        });

      },
      search(){
        this.pars.pageNum=1;
        this.loadData();
      },
      handleDownload(index, row){
        window.location.href = BaseAPI+ `/getFileFromParam?filePath=`+row.path;
      },

      //编辑
      handleEdit(index, row){
        //保存页面条件
        PageCache.savePars(this.$route.path, this.pars);
        this.$router.push({ path: 'edit/' + row.id });
      },
      handleGrant(index, row){
        //保存页面条件
        PageCache.savePars(this.$route.path, this.pars);
        this.$router.push({ path: 'loadResource/' + row.id });
      },
      //删除该行
      handleDelete(index, row){
        this.$confirm('确认是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type             : 'warning'
        }).then(() => {
          API.caseGroup.delete({id: row.id}).then(res=> {
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

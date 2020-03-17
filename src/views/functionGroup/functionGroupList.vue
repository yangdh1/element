<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">函数管理</div>
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
          <el-input v-model="pars.name" placeholder="函数名称模糊查询" size="small" style="width: 350px"  prefix-icon="el-icon-search" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-power="'functionGroup_dc'" @click="exportData" size="small">导出</el-button>
        </el-form-item>
      </el-form>

      <div class="table-wrap" v-loading.body="loading">
        <el-table highlight-current-row :data="tableData"  border style="width: 100%" stripe :header-cell-style="headercellSstyle" :key="Math.random()">
          <el-table-column prop="productName" label="产品名称" min-width="25%"></el-table-column>
          <el-table-column prop="name" label="函数名称" min-width="25%"></el-table-column>
          <el-table-column prop="updateTimeStr" label="上传时间" min-width="25%"></el-table-column>
          <el-table-column label="操作" min-width="10%">
            <template slot-scope="scope">
              <el-button title="下载" icon="el-icon-download" v-power="'functionGroup_xz'" size="small" @click="handleDownload(scope.$index, scope.row)"></el-button>
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
  import {BaseAPI} from '../../api/api'
  import PageCache from '../../utils/pageCache'
  import ioPagination from '../../components/ioPagination.vue'
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
        tableData: [],
        productAll:[],
        baseAPI: BaseAPI
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
        API.functionGroup.list(this.pars).then(res=>{
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
      //编辑
      handleDownload(index, row){
        window.location.href = BaseAPI+ `/getFileFromParam?filePath=`+row.path;
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
          API.role.delete({id: row.id}).then(res=> {
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
      exportData() {
        axios.post(BaseAPI + `/functionGroup/export`, this.pars, {
          responseType: 'blob'
        }).then(res => {
          if (true) {
            if ('msSaveBlob' in navigator) { // 对IE和Edge的兼容
              console.log(res.headers['content-disposition']);
              window.navigator.msSaveBlob(res.data, decodeURI(res.headers['content-disposition'].split('filename=')[1]))
            } else {
              let blob = new Blob([res.data], {type: 'application/x-xls'});
              let link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = new Date().getTime() + '.xls';
              link.click();
            }
          }
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

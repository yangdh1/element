<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">关键字列表</div>
    </div>
    <div>
      <el-form :inline="true" :model="pars" class="demo-form-inline">
        <el-form-item >
          <el-input v-model="pars.commonColumn"  placeholder="输入关键字模糊查询" size="small" style="width: 450px" prefix-icon="el-icon-search" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
        </el-form-item>
        <el-form-item >
          <el-button type="success" @click="handleAdd" size="small" icon="el-icon-plus" v-power="'gjz_add'">新增</el-button>
        </el-form-item>
      </el-form>

      <div class="table-wrap" v-loading.body="loading">
        <el-table highlight-current-row :data="tableData"  border style="width: 100%" stripe :header-cell-style="headercellSstyle" :key="Math.random()">
          <el-table-column prop="code" label="编码" min-width="40%"></el-table-column>

          <el-table-column prop="name" label="关键字" min-width="45%"></el-table-column>
          <el-table-column prop="valueType" label="数据类型" min-width="20%"></el-table-column>
          <el-table-column prop="description" label="关键字描述" min-width="35%"></el-table-column>
          <el-table-column prop="defaultValue" label="默认值" min-width="35%"></el-table-column>
          <el-table-column prop="companyName" label="所属公司" min-width="35%"></el-table-column>
          <el-table-column label="操作" min-width="55%">
            <template slot-scope="scope">
              <el-button   icon="el-icon-edit-outline" v-power="'gjz_update'" title="编辑" size="small" @click="handleEdit(scope.$index, scope.row)" ></el-button>
              <el-button icon="el-icon-delete" plain title="删除" v-power="'gjz_delete'" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"></el-button>

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
        API.keyword.list(this.pars).then(res=>{
          this.pars.total = res.total;
          this.pars.pageNum = res.pageNum;
          this.loading = false;
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
          API.keyword.delete({id: row.id}).then(res=> {
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

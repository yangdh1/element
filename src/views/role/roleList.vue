<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">角色和权限</div>
    </div>
    <div>
      <el-form :inline="true" :model="pars" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="pars.name" placeholder="角色名称" size="small" style="width: 350px"  prefix-icon="el-icon-search" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
        </el-form-item>
        <el-form-item v-power="'role_add'">
          <el-button type="success" @click="handleAdd" size="small" icon="el-icon-plus" v-power="'role_add'">新增</el-button>
        </el-form-item>
      </el-form>

      <div class="table-wrap" v-loading.body="loading">
        <el-table highlight-current-row :data="tableData"  border style="width: 100%" stripe :header-cell-style="headercellSstyle" :key="$root.$children[0].keyRand">
          <el-table-column prop="name" label="角色" min-width="15%"></el-table-column>
          <el-table-column prop="description" label="备注" min-width="20%"></el-table-column>
          <el-table-column label="操作" min-width="55%">
            <template slot-scope="scope">
              <el-button   icon="el-icon-edit-outline" title="编辑" size="small" @click="handleEdit(scope.$index, scope.row)" v-power="'role_update'"></el-button>
              <el-button size="small" @click="handleGrant(scope.$index, scope.row)" icon="iconfont icon-quanxian" title="权限分配"  v-power="'role_assignResource'"></el-button>
              <el-button icon="el-icon-delete" plain title="删除" size="small" type="danger" v-power="'role_delete'" @click="handleDelete(scope.$index, scope.row)"></el-button>
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
      loadData(){

        //加载数据 通过pars加载数据
        this.loading = true;
        API.role.list(this.pars).then(res=>{
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
        this.$router.push({ path: 'roleResource/' + row.id });
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

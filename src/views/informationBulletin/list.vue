<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">消息推送</div>
    </div>
    <div>
      <el-form :inline="true" :model="pars" class="demo-form-inline">
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="pars.creatTimeDuring"
            type="daterange"
            style="height: 40px;width: 300px"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="pars.name" placeholder="请输入消息标题或关键字模糊查询" size="small" style="width: 300px"  prefix-icon="el-icon-search" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
        </el-form-item>
        <el-form-item v-power="'role_add'">
          <el-button type="success" @click="handleAdd" size="small" icon="el-icon-plus" v-power="'role_add'">批量删除</el-button>
        </el-form-item>
        <el-form-item v-power="'role_add'">
          <el-button type="success" @click="handleAdd" size="small" icon="el-icon-plus" v-power="'role_add'">发布消息</el-button>
        </el-form-item>
      </el-form>

      <div class="table-wrap" v-loading.body="loading">
        <el-table highlight-current-row :data="tableData"  border style="width: 100%" border @selection-change="selsChange" stripe :header-cell-style="headercellSstyle" :key="$root.$children[0].keyRand">
          <el-table-column type="selection" fixed :selectable="selectAble" width="30"/>
          <el-table-column prop="id" label="序号" width="60%"/>
          <el-table-column prop="name" label="消息标题" min-width="40%"></el-table-column>
          <el-table-column prop="name" label="发布人" min-width="15%"></el-table-column>
          <el-table-column prop="description" label="发布时间" min-width="30%"></el-table-column>
          <el-table-column prop="description" label="发布人群" min-width="30%"></el-table-column>
          <el-table-column label="操作" min-width="20%">
            <template slot-scope="scope">
              <el-button   icon="el-icon-edit-outline" title="编辑" size="small" @click="handleEdit(scope.$index, scope.row)" v-power="'role_update'"></el-button>
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
      loadData(){

        //加载数据 通过pars加载数据
        this.loading = true;
        API.role.list(this.pars).then(res=>{
          console.log('error submit!!');
          console.log("111111111111111111111111111111111111111111111111111111111")
          console.log(res);
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

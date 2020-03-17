<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">用户列表</div>
    </div>
    <div>
      <el-form :inline="true" :model="pars" class="demo-form-inline">
         <el-form-item label="">
         <el-select v-model="pars.whetherLawyer"
                    placeholder="请选择用户类型"
                    size="small"
                    clearable
                    style="width: 120px">
           <el-option v-for="item in whetherLawyerList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.whetherLawyer">
           </el-option>
         </el-select>
         </el-form-item>
           <el-form-item label="认证状态">
           <el-select v-model="pars.whetherAutonym"
                      placeholder="请选择认证状态"
                      size="small"
                      clearable
                      style="width: 120px">
             <el-option v-for="item in whetherAutonymList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.whetherAutonym">
             </el-option>
           </el-select>
       </el-form-item>
        <el-form-item label="注册日期：">
          <div class="block">
            <el-date-picker
              v-model="pars.timeString"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="pars.commonColumn"   clearable size="small" style="width: 350px" prefix-icon="el-icon-search" placeholder="输入搜索关键字，多个关键字用空格分开"></el-input>
        </el-form-item>
       <!-- <el-form-item label="角色">
          <el-select v-model="pars.roleId"
                     placeholder="请选择角色"
                     size="small"
                     clearable
                     style="width: 120px">
            <el-option v-for="item in roleArr"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
        </el-form-item>
        <el-form-item>
<!--          <el-button type="success" icon="el-icon-plus" @click="addDev" size="small" v-power="'user_add'">新增</el-button>-->
          <el-button type="success" icon="el-icon-plus" @click="exportFile" size="small" v-power="'user_add'">导出</el-button>
        </el-form-item>
      </el-form>
      <div class="table-wrap" v-loading.body="loading">
        <el-table highlight-current-row :data="tableData" width="100%" border stripe :header-cell-style="headercellSstyle" :key="$root.$children[0].keyRand">
          <el-table-column
            prop="nickName"
            fixed
            label="昵称"
            min-width="15%"/>
          <el-table-column
            prop="name"
            fixed
            label="真实姓名"
            min-width="15%"/>
          <el-table-column
            prop="mobile"
            label="手机号"
            fixed
            min-width="15%"/>
<!--          <el-table-column-->
<!--          prop="roleName"-->
<!--          label="角色"-->
<!--          min-width="15%"/>-->
          <el-table-column
            prop="moneyBalance"
            label="账户余额"
            min-width="15%"/>
          <el-table-column
            prop="lawyerEarningsBalance"
            label="账户收益"
            min-width="15%"/>
          <el-table-column
            prop="coinBalance"
            label="心币"
            min-width="15%"/>
          <el-table-column
            prop="followNum"
            label="关注人数"
            min-width="15%"/>
          <el-table-column
            prop="serviceNum"
            label="服务次数"
            min-width="15%"/>
          <el-table-column
            prop="createTimeDate"
            label="注册日期"
            min-width="15%">
          </el-table-column>
          <el-table-column
            prop="whetherAutonymStr"
            fixed="right"
            label="认证状态"
            min-width="15%">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作" min-width="35%">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-view"
                title="查看详情"
                size="small"
                @click="handleView(scope.$index, scope.row)"></el-button>
              <el-button
                icon="el-icon-edit-outline"
                title="编辑"
                size="small"
                v-power="'service_updateServiceType'"
                @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button icon="el-icon-delete" size="small" title="删除" type="danger" plain  v-power="'service_deleteServiceType'" @click="handleDelete(scope.$index, scope.row)"></el-button>
              <el-button icon="el-icon-tickets" size="small" title="交易记录" plain  v-power="'service_deleteServiceType'"
                         @click="handleTransactionRecord(scope.$index, scope.row)"></el-button>
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
    data: function() {
      return {
        tableData:[],
        roleArr:[],
        whetherLawyerList:[
          {
            name: '全部',
            whetherAutonym: 0
          },
          {
            name: '普通用户',
            whetherLawyer: 1
          },
          {
            name: '律师',
            whetherLawyer: 2
          },
          {
            name: '企业',
            whetherLawyer: 3
          }
        ],
        whetherAutonymList:[{
          name: '全部',
          whetherAutonym: 0
        },{
          name: '未实名认证',
          whetherAutonym: 1
        },{
          name: '已实名认证',
          whetherAutonym: 2
        }],
        loading  : true,
        pars: {
          pageSize    : this.GLOBAL.PAGE_COG.PAGESIZE,
          pageNum     : this.GLOBAL.PAGE_COG.PAGENUM,
          total       : this.GLOBAL.PAGE_COG.TOTAL,
          commonColumn: '',
          whetherLawyer: 1,
          whetherAutonym: 0,
          timeString: '',
          startDate: '',
          endTime: ''
        },

      }
    },
    mounted(){
      //获取页面缓存
      this.pars = {...this.pars, ...PageCache.getPars(this.$route.path)};
      this.loadData();
      //this.loadRole();
    },
    methods:{
      // loadRole(){
      //   API.role.listAll().then(res=>{
      //     this.roleArr = res ;
      //   });
      // },
      loadData(){
        this.loading = true;
        API.user.list(this.pars).then(res=> {
          console.log(res);
          this.pars.total = res.total;
          this.pars.pageNum = res.pageNum;
          this.pars.pageSize = res.pageSize;
          this.loading = false;
          this.tableData = res.lawyerList;
        });
      },
      exportFile(){
        axios.post(BaseAPI + `/user/export`, this.pars, {
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
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      search(){
        this.pars.pageNum=1;
        if(this.pars.timeString != null){
          if(this.pars.timeString[0] != null){
            this.pars.startDate = this.pars.timeString[0];
          }
          if(this.pars.timeString[1] != null){
            this.pars.endTime = this.pars.timeString[1];
          }
        }else{
          this.pars.startDate = '';
          this.pars.endTime = '';
        }
        this.loadData();
      },
      addDev(){
        this.$router.push({path: 'add'});
      },
      //交易记录
      handleTransactionRecord(index, row){
        PageCache.savePars(this.$route.path, this.pars);   //保存页面条件
        this.$router.push({path: 'transactionRecord/' + row.id});
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
          API.user.delete({id: row.id}).then(res=> {
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
      handleGrant(index, row){
        //保存页面条件
        PageCache.savePars(this.$route.path, this.pars);
        this.$router.push({ path: 'loadResource/' + row.id });
      },
      handlePosition(index, row){
        PageCache.savePars(this.$route.path, this.pars);
        this.$router.push({ path: 'positionResource/' + row.id });
      },
      //页面改变回传函数
      handlePageChange(newVal){
        this.pars = newVal;
        this.loadData();
      },
      headercellSstyle({row, rowIndex}) {
        return 'text-align:center;';
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

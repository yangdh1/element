<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">交易记录</div>
    </div>
      <el-form :inline="true" :model="pars" class="demo-form-inline" v-if="transactionTypeId === 1">
        <el-select v-model="transactionTypeId"
                   placeholder="请选择用户类型"
                   size="small"
                   clearable
                   style="width: 120px">
          <el-option v-for="item in transactionType"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
        <el-form-item label="交易类型">
          <el-select v-model="pars.transactionTypeId"
                     placeholder="请选择交易类型"
                     size="small"
                     clearable
                     style="width: 120px">
            <el-option v-for="item in transactionTypeList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
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
          <el-input v-model="pars.commonhandlePageChangeColumn"   clearable size="small" style="width: 350px" prefix-icon="el-icon-search" placeholder="输入搜索关键字，多个关键字用空格分开"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-plus" @click="exportFile" size="small" v-power="'user_add'">导出</el-button>
        </el-form-item>
      </el-form>
    <el-form :inline="true" :model="pars" class="demo-form-inline" v-if="transactionTypeId === 2">
      <el-select v-model="transactionTypeId"
                 placeholder="请选择用户类型"
                 size="small"
                 clearable
                 style="width: 120px">
        <el-option v-for="item in transactionType"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
      <el-form-item label="交易类型">
        <el-select v-model="pars.threeTransactionTypeId"
                   placeholder="请选择交易类型"
                   size="small"
                   clearable
                   style="width: 120px">
          <el-option v-for="item in threeTransactionTypeList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
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
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-plus" @click="exportFile" size="small" v-power="'user_add'">导出</el-button>
      </el-form-item>
    </el-form>
      <div class="table-wrap" v-loading.body="loading" >
        <el-table highlight-current-row :data="tableData" v-if="transactionTypeId === 1" width="100%" border stripe :header-cell-style="headercellSstyle" :key="$root.$children[0].keyRand">
          <el-table-column
            prop="nickName"
            fixed
            label="订单号"
            min-width="15%"/>
          <el-table-column
            prop="name"
            fixed
            label="交易时间"
            min-width="15%"/>
          <el-table-column
            prop="mobile"
            label="交易类型"
            fixed
            min-width="15%"/>
          <el-table-column
            prop="moneyBalance"
            label="金额"
            min-width="15%"/>
        </el-table>
        <el-table highlight-current-row :data="tableData" v-if="transactionTypeId === 2" width="100%" border stripe :header-cell-style="headercellSstyle" :key="$root.$children[0].keyRand">
          <el-table-column
            prop="nickName"
            fixed
            label="订单号"
            min-width="15%"/>
          <el-table-column
            prop="name"
            fixed
            label="交易时间"
            min-width="15%"/>
          <el-table-column
            prop="mobile"
            label="交易类型"
            fixed
            min-width="15%"/>
          <el-table-column
            prop="moneyBalance"
            label="心币支出"
            min-width="15%"/>
          <el-table-column
            prop="lawyerEarningsBalance"
            label="人名币支出"
            min-width="15%"/>
          <el-table-column
            prop="coinBalance"
            label="心币收入"
            min-width="15%"/>
          <el-table-column
            prop="followNum"
            label="人名币收入"
            min-width="15%"/>
          <el-table-column
            prop="serviceNum"
            label="平台人名币收入"
            min-width="15%"/>
          <el-table-column
            prop="createTimeDate"
            label="平台心币收入"
            min-width="15%">
          </el-table-column>
          <el-table-column
            prop="whetherAutonymStr"
            label="对方账户"
            min-width="15%">
          </el-table-column>
        </el-table>
        <div class="block pagination">
          <io-pagination :pars="pars" @change="handlePageChange"></io-pagination>
        </div>
      </div>
    </div>
</template>

<script>
  import API from '../../api'
  import ElOption from "../../../node_modules/element-ui/packages/select/src/option.vue";
  import ElCol from "element-ui/packages/col/src/col";
  import PageCache from '../../utils/pageCache'
  import ioPagination from '../../components/ioPagination.vue'
  import ElRow from "element-ui/packages/row/src/row";
  // import { Navbar, Sidebar, AppMain } from 'views/layout'
  export default {
    components: {
      ElRow,
      ElCol,
      ElOption,
      ioPagination
    },
    data: function () {
      return {
        transactionType: [{
          name: '平台交易',
          id: 1
        },{
          name: '三方交易',
          id: 2
        }],
        pars: {
          pageSize    : this.GLOBAL.PAGE_COG.PAGESIZE,
          pageNum     : this.GLOBAL.PAGE_COG.PAGENUM,
          total       : this.GLOBAL.PAGE_COG.TOTAL,
          commonColumn: '',
        },
        tableData: [],
        loading  : true,
        transactionTypeId: 1,
        threeTransactionTypeId: '',
        transactionTypeList:[{
          name: '全部类型',
          id: 0
        },{
          name: '充值余额',
          id: 1
        },{
          name: '余额提现',
          id: 2
        },{
          name: '收益提现',
          id: 3
        },{
          name: '359°共享基金',
          id: 4
        },{
          name: '股票共享基金',
          id: 0
        }],
        threeTransactionTypeList:[{
          name: '全部类型',
          id: 0
        },{
          name: '律师服务',
          id: 1
        },{
          name: '心币交易',
          id: 2
        }],
        roleArr: [],
        bureauList: [],
        cityAll: [],
        city:{},
        provincrAll: [],
        districtAll:[],
        companyAll: [],
        userId: '',
        form: {
          adminFlag:false,
          status:'1',
        },
        commonRule: [
          {required: true, message: '该项不能为空'}
        ],
        rules: {

        }
      }
    },
    mounted() {
      this.userId = this.$route.params.id;
      this.loadEditData();
    },
    methods: {
      revertingg(){
        this.$router.push({path: '/system/user/list'});
      },
      loadEditData() {
        this.loading = false;
        this.tableData = [];
      },
      search(){

      },
      exportFile(){

      },
      //页面改变回传函数
      handlePageChange(newVal){
        this.pars = newVal;
        this.loadData();
      },
      headercellSstyle({row, rowIndex}) {
        return 'text-align:center;';
      }
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .dev-add-avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .dev-add-avatar-uploader .el-upload:hover {
    border-color: #999;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

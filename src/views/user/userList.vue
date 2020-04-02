<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">用户列表</div>
    </div>
    <div>
      <el-form :inline="true" :model="pars" class="demo-form-inline" label-width="100px" size="medium" >
        <el-form-item label="认证状态">
           <el-select v-model="pars.authValidateStatus"  placeholder="请选择认证状态" size="medium">
             <el-option label="全部" value="0"></el-option>
             <el-option label="未实名认证" value="1"></el-option>
             <el-option label="已经实名认证" value="2"></el-option>
             <el-option label="企业认证" value="3"></el-option>
           </el-select>
       </el-form-item>
        <el-form-item label="注册日期：">
          <div class="block">
            <el-date-picker
              v-model="pars.creatTimeDuring"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
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
          <el-button type="success" icon="el-icon-position" v-power="'yhlb_cnr'" @click="exportFile" size="small" >导出</el-button>
        </el-form-item>
      </el-form>
      <div class="table-wrap" v-loading.body="loading">
        <el-table highlight-current-row  border stripe
                  :data="tableData"
                  width="100%"
                  :default-sort = "{prop: 'createTimeDate', order: 'descending'}">
          <el-table-column  sortable  prop="id"  align="center"    label="序号" min-width="5%"/>
          <el-table-column   prop="mobile"  align="center"    label="账户" min-width="10%"/>
          <el-table-column   align="center"  label="昵称"    min-width="10%">
               <template slot-scope="scope">
                    <p v-if="scope.row.nickName!=null&&scope.row.nickName.length>0">{{scope.row.nickName}}</p>
                    <p v-else>---</p>
               </template>
          </el-table-column>
         <!-- <el-table-column    prop="name"   align="center"    label="真实姓名"  min-width="10%">
            <template slot-scope="scope">
              <p>{{scope.row.name==null||scope.row.name.length<1?'-&#45;&#45;':scope.row.name}}</p>
            </template>
          </el-table-column>-->
          <el-table-column    align="center"    label="性别"  min-width="10%">
            <template slot-scope="scope">
                <p v-if="scope.row.sex==1">男</p>
                <p v-else-if="scope.row.sex==2">女</p>
                <p v-else>---</p>
            </template>
          </el-table-column>
          <el-table-column  sortable prop="moneyBalance"  align="center"  label="账户余额"  min-width="10%"/>
          <el-table-column  sortable prop="coinBalance"  align="center"  label="心币"  min-width="10%"/>
          <el-table-column  sortable prop="createTimeDate"  align="center" label="注册日期"  min-width="10%" />
          <el-table-column    align="center"     label="认证状态"   min-width="10%">
              <template slot-scope="scope">
                <p v-if="scope.row.whetherAutonym==1">未实名认证</p>
                <p v-else-if="scope.row.whetherAutonym==2">已完成实名认证</p>
                <p v-else-if="scope.row.whetherAutonym==3">企业认证</p>
                <p v-else>---</p>
              </template>
          </el-table-column>
          <el-table-column  fixed="right"  align="center"  label="操作" min-width="20%">
            <template slot-scope="scope">
              <el-button  type="primary" plain   size="small"   v-power="'yhlb_check'"   @click="handleView(scope.$index, scope.row)">查看</el-button>
              <el-button  type="info" plain   size="small"   v-power="'yhlb_edit'"    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button  type="success" plain   size="small"  v-power="'yhlb_record'"  @click="handleTradeRecord(scope.$index, scope.row)">交易记录</el-button>
              <!--<el-button   title="冻结" size="small"   v-power="'yhlb_delete'"   @click="handleBlocked(scope.$index, scope.row)"></el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <div class="block pagination">
          <io-pagination :pars="pars" @change="handlePageChange"></io-pagination>
        </div>
      </div>

      <el-dialog title="编辑" :show-close="false" :visible="editDialog.dialogFormVisible" width="40%">
        <el-form style="width: 50%">
          <el-form-item label="昵称" :label-width="editDialog.formLabelWidth">
            <el-input v-model="editDialog.updateObj.nickName" autofocus></el-input>
          </el-form-item>
          <el-form-item label="账号" :label-width="editDialog.formLabelWidth">
            <el-tooltip content="只读,不可编辑" placement="right-start"  effect="light">
              <el-input v-model="editDialog.updateObj.mobile" readonly></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="性别" :label-width="editDialog.formLabelWidth">
            <el-radio-group v-model="editDialog.updateObj.sex" disabled>
              <el-radio :label=1>男</el-radio>
              <el-radio :label=2>女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="地点" :label-width="editDialog.formLabelWidth">
            <el-tooltip content="只读,不可编辑" placement="right-start"  effect="light">
              <el-input v-model="editDialog.updateObj.address" readonly></el-input>
            </el-tooltip>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEdit()">取 消</el-button>
          <el-button type="primary" @click="submitEdit">确 定</el-button>
        </div>
      </el-dialog>

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
        loading  : true,
        pars: {
          pageSize    : this.GLOBAL.PAGE_COG.PAGESIZE,
          pageNum     : this.GLOBAL.PAGE_COG.PAGENUM,
          total       : this.GLOBAL.PAGE_COG.TOTAL,
          searchKeyWords: '',
          authValidateStatus: '',
          creatTimeDuring: [],
          startTime: '',
          endTime: ''
        },

        //编辑弹出层
        editDialog:{
          dialogFormVisible: false,
          formLabelWidth: '120px',
          updateObj:{},
        }
      }
    },
    mounted(){
      //获取页面缓存
      this.pars = {...this.pars, ...PageCache.getPars(this.$route.path)};
      this.loadData();
    },
    methods:{
      loadData(){
        this.loading = true;
        console.log("获取用户列表的参数",this.pars);
        API.user.userList(this.pars).then(res=> {
          console.log("查询用户列表结果",res);
          if (res!=null){
            this.pars.total = res.total;
            this.pars.pageNum = res.pageNum;
            this.pars.pageSize = res.pageSize;
            this.tableData = res.list;
          }else{
            this.pars.total = 0;
            this.pars.pageNum =1;
            this.pars.pageSize = 10;
            this.tableData=[];
          }
          this.loading = false;
        });
      },
      //当前页数据统计
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '(元/个)';
          } else {
            sums[index] = 'N/A';
          }
        });
        return sums;
      },
      //导出
      exportFile(){
        axios.post(BaseAPI + `/userManage/export`, this.pars, {
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
      //搜索
      search(){
        this.pars.pageNum=1;
        console.log(this.pars.creatTimeDuring );
        console.log(this.pars.creatTimeDuring );
        console.log(this.pars.creatTimeDuring );
        if (this.pars.creatTimeDuring != null &&this.pars.creatTimeDuring.length !=0){
          let  startTime=  this.pars.creatTimeDuring[0].valueOf();
          let  endTime=this.pars.creatTimeDuring[1].valueOf();
          this.pars.startTime=startTime;
          this.pars.endTime=endTime;
          console.log("--------startTime------"+startTime+",---endTime---"+endTime);
        }else {
          this.pars.startTime = '',
            this.pars.endTime = ''
        }
        this.loadData();
      },
      //重置搜索
      reset(){
        this.pars.total =this.GLOBAL.PAGE_COG.TOTAL;
        this.pars.pageNum =this.GLOBAL.PAGE_COG.PAGENUM;
        this.pars.pageSize = this.GLOBAL.PAGE_COG.PAGESIZE;
        this.pars.creatTimeDuring=[];
        this.pars.searchKeyWords="";
        this.pars.authValidateStatus="";
        this.pars.startTime="";
        this.pars.endTime="";
        this.loadData()
      },
      //交易记录
      handleTradeRecord(index, row){
        //PageCache.savePars(this.$route.path, this.pars);   //保存页面条件
        this.$router.push({path: 'tradeRecord', query: {userId: row.id,roleType:1}});
       // this.$router.push({path: 'tradeRecord/' + row.id});
      },
      //具体信息
      handleView(index, row){
        PageCache.savePars(this.$route.path, this.pars);   //保存页面条件
        this.setUserInfoToLocalStorage(row);
      },

      //将当前律师信息放入缓存
      setUserInfoToLocalStorage(userInfo){
       // console.log("---用户信息---",userInfo);
        if (userInfo!=null&&userInfo.id!=null){
          let key="userAccount_"+userInfo.id;
          let storageValue=JSON.stringify(userInfo);
          localStorage.removeItem(key);
          localStorage.setItem(key,storageValue);
          this.$router.push({path: 'userDetail/' + userInfo.id});
        }else {
          this.$message({
            showClose: true,
            message: '用户信息缓存失败!请刷新列表后查看详情! ',
            type: 'error',
          });
        }
      },

      //编辑
      handleEdit(index, row){
        console.log("---编辑用户信息---",row);
        this.editDialog.dialogFormVisible=true;
        this.editDialog.updateObj=row;
      },

      //取消编辑
      cancelEdit(){
        this.editDialog.dialogFormVisible = false;
        this.editDialog.updateObj={};
      },

      //提交编辑
      submitEdit(){
        let  updateObj=this.editDialog.updateObj;
        let  userId=updateObj.id;
        let accounts=updateObj.accounts;
        let sex=updateObj.sex;
        let nickName=updateObj.nickName;
        let address=updateObj.address;
        let updateUser={
          userId:userId,
          accounts:accounts,
          sex:sex,
          nickName:nickName,
          addressName:address
        };
        API.user.editUserInfo(updateUser).then(res=> {
          console.log("修改用户信息结果",res);
          if (res!=null){
            this.reset();
            this.loadData();
          }else{
            this.$message.error('修改失败,请稍后重试!');
          }
          //修改成功,需要重新加载律师列表
          this.editDialog.dialogFormVisible=false;
          this.editDialog.updateObj={};
        });
      },


      //删除该行
      handleBlocked(index, row){
        this.$confirm('确认是否冻结该账户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type             : 'warning'
        }).then(() => {
          API.user.blockedAccount({id: row.id}).then(res=> {
            this.pars.total--;
            this.tableData.splice(index, 1);
            this.$message({
              type   : 'success',
              message: '账户已经冻结!'
            });
          })
        }).catch(() => {

        });
      },
      //页面改变回传函数
      handlePageChange(newVal){
        this.pars = newVal;
        this.loadData();
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

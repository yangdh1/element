<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">律师审核列表</div>
    </div>
    <div>
      <el-form :inline="true" :model="pars" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="pars.commonColumn" clearable size="small" style="width: 350px" prefix-icon="el-icon-search"
                    placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table-wrap" v-loading.body="loading">
        <el-table highlight-current-row :data="tableData" width="100%" border stripe
                  :header-cell-style="headercellSstyle" :key="$root.$children[0].keyRand">
          <el-table-column
            prop="accounts"
            label="帐号"
            min-width="10%"/>
          <el-table-column
            prop="nickName"
            label="昵名"
            min-width="10%"/>
          <el-table-column
            prop="enterpriseName"
            label="企业名称"
            min-width="15%"/>
          <el-table-column
            prop="enterpriseCode"
            label="企业信用代码"
            min-width="10%"/>
          <el-table-column
            prop="company"
            label="单位"
            min-width="10%"/>
          <el-table-column
            prop="school"
            label="学校名称"
            min-width="10%"/>
          <el-table-column
            prop="introduction"
            label="简介"
            min-width="15%"/>
          <el-table-column
            prop="status"
            label="状态"
            min-width="10%">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">待审核</span>
              <span v-else-if="scope.row.status == 2">审通过</span>
              <span v-else-if="scope.row.status == 3">审核不通过</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作" min-width="10%">
            <template slot-scope="scope">
              <el-button
                icon="iconfont icon-shenpi"
                title="审核"
                size="small"
                @click="showAudit(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block pagination">
          <io-pagination :pars="pars" @change="handlePageChange"></io-pagination>
        </div>
      </div>
    </div>

    <el-dialog title="输入不通过原因" :visible.sync="auditDialogVisible" width="30%">
      <el-form ref="ruleForm" :model="form" :rules="rules">

        <el-form-item prop="reason" label="原因" label-width="80">
          <el-input type="textarea" :rows="5" v-model="form.reason"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="auditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAudit(3)">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="审核操作" :visible.sync="dialogVisible" width="30%">
      <span>进在进行律师审核操作</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="auditDialogVisible = true, dialogVisible = false">不通过</el-button>
        <el-button type="primary" @click="handleAudit(2)">通 过</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
    import API from '../../api'
    import PageCache from '../../utils/pageCache'
    import ioPagination from '../../components/ioPagination.vue'

    export default {
        components: {
            ioPagination
        },
        data: function () {
            return {
                tableData: [],
                loading: true,
                pars: {
                    pageSize: this.GLOBAL.PAGE_COG.PAGESIZE,
                    pageNum: this.GLOBAL.PAGE_COG.PAGENUM,
                    total: this.GLOBAL.PAGE_COG.TOTAL,
                    id: ''
                    // commonColumn : '',

                },
                dialogVisible: false,
                auditDialogVisible: false,
                form: {
                    reason: ''
                },
                row: '',
                rules: {
                    reason: [{required: true, message: '请输入原因', trigger: 'blur'}]
                }
            }
        },
        mounted() {
            //获取页面缓存
            this.pars = {...this.pars, ...PageCache.getPars(this.$route.path)};
            this.loadData();
            //  this.loadRole();
        },
        methods: {
            //   loadRole(){
            //     API.role.listAll().then(res=>{
            //       this.roleArr = res ;
            //     });
            //   },
            loadData() {
                this.loading = true;
                API.lawyer.list(this.pars).then(res => {
                    this.pars.total = res.total;
                    this.pars.pageNum = res.pageNum;
                    this.pars.pageSize = res.pageSize;
                    this.loading = false;
                    console.log(res);
                    this.tableData = res.lawyerList;
                });
            },
            search() {
                this.pars.pageNum = 1;
                this.loadData();
            },
            //审核
            showAudit(index, row) {
                this.dialogVisible = true;
                this.row = row;
            },

            handleAudit(status) {
                let obj = {
                    id: this.row.id,
                    userId: this.row.userId,
                    status: status,
                    reason: this.form.reason
                };
                console.log(obj);
                if (status == 2) {
                    this.dialogVisible = false;
                    API.lawyer.updateLawyerStatus(obj).then(res => {
                        this.row.status = 2;
                        this.$message({
                            message: '审核成功',
                            type: 'success'
                        })
                    })
                } else {
                    this.$refs['ruleForm'].validate(valid => {
                        if (valid) {
                            this.auditDialogVisible = false;
                            API.lawyer.updateLawyerStatus(obj).then(res => {
                                this.row.status = 3;
                                this.$message({
                                    message: '审核成功',
                                    type: 'success'
                                })
                            }).finally(() => {
                                this.form.reason = null;
                            })
                        }
                    })
                }

            },

            //页面改变回传函数
            handlePageChange(newVal) {
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

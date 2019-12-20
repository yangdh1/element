<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">职位权限分配</div>
    </div>
    <div class="table-wrap" v-loading.body="loading">
      <el-form ref="ruleForm" :model="form" label-width="90px" >
        <el-tree
          v-if="womensgroupArr.length>0"
          :data="womensgroupArr"
          :default-checked-keys.sync="checkedKeys"
          show-checkbox
          node-key="code"
          ref="tree"
          :default-expand-all="true"
          :check-strictly="true"
          :props="defaultPropsss">
        </el-tree>
        <el-form-item>
          <el-button type="primary" size="small"  @click="onSubmit('ruleForm')">保存</el-button>
          <el-button type="info" size="small" @click="recurrence">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import API from '../../api/index'
  import PageCache from '../../utils/pageCache'
  export default {
    data() {
      return {
        form: {
          userId:'',
          womensgroupArr:[],
        },
        loading: true,
        resourceData:[],
        womensgroupArr:[],
        checkedKeys:[],
        defaultPropsss: {
          children: 'powerPositions',
          label: 'name'
        },
      };
    },
    mounted(){
      //获取页面缓存
      this.pars = { ...this.pars, ...PageCache.getPars(this.$route.path)};
      this.loadData();

    },
    methods: {
      loadData(){
        this.loading=true;
        API.user.positionResource({id:this.$route.params.id}).then(res=>{
          this.womensgroupArr = res.record;
          this.loading = false;
          console.log(res.checkedKeys);
          this.checkedKeys=res.checkedKeys;
        });
      },
      recurrence(){
        this.$router.push({path: '/system/user/list'});
      },
      onSubmit(formName) {
        console.log(this.$refs.tree.getCheckedKeys())
        console.log(this.$refs.tree.getCheckedNodes())
        this.form.userId = this.$route.params.id;
        this.form.checkedKeys = this.$refs.tree.getCheckedNodes();
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.user.addpositionResource(this.form).then(res=>{
              console.log(this.form);
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.$router.push({path: '/system/user/list'});
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

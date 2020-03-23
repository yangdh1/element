<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">数据权限分配</div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="form" label-width="90px" >
        <el-tree
                v-if="resourceData.length>0"
                :data="resourceData"
                :default-checked-keys.sync="defaultCheckedKeys"
                show-checkbox
                node-key="id"
                ref="tree"
                :default-expand-all="true"
                :check-strictly="true"
                :props="defaultProps" >
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
  import API from '../../api'
  export default {
    data() {
      return {
        form: {
          userId:'',
          checkedKeys:[]
        },
        resourceData:[],
        defaultCheckedKeys: [],
        defaultProps: {
          children: 'departmentList',
          label: 'label'
        },
      };
    },
    mounted(){
      API.user.loadResource({id:this.$route.params.id}).then(res=>{
        console.log(res)
        this.resourceData = res.record;
        this.defaultCheckedKeys = res.checkedKeys;
      });
    },
    methods: {
      onSubmit(formName) {
        console.log(this.$refs.tree.getCheckedKeys())
        console.log(this.$refs.tree.getCheckedNodes())
        this.form.userId = this.$route.params.id;
        this.form.checkedKeys = this.$refs.tree.getCheckedNodes();
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.user.saveResource(this.form).then(res=>{
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
      },
      recurrence(){
        this.$router.push({path: '/sysAuthManage/role/add'});


      }

    }

  }
</script>

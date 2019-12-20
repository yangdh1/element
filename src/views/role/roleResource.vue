<template>
  <div class="page-content">
    <div class="bs-header">
      <div class="bs-title">角色权限分配</div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="form" label-width="90px">
        <el-tree
          v-if="resourceData.length>0"
          :data="resourceData"
          :default-checked-keys.sync="defaultCheckedKeys"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-expand-all="true"
          :check-strictly="true"
          :props="defaultProps">
        </el-tree>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')"  size="small">保存</el-button>
          <el-button size="small" type="info" @click="recurrenc">返回</el-button>
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
          roleId:'',
          checkedKeys:[]
        },
        resourceData:[],
        defaultCheckedKeys: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    mounted(){
      API.role.loadResource({id:this.$route.params.id}).then(res=>{
        console.log(res)
        this.resourceData = res.resources;
        this.defaultCheckedKeys = res.checkedKeys;
      });
    },
    methods: {
      onSubmit(formName) {
        this.form.roleId = this.$route.params.id;
        this.form.checkedKeys = this.$refs.tree.getCheckedNodes();
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.role.saveResource(this.form).then(res=>{
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.recurrenc();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      recurrenc(){
        this.$router.push({path: '/system/role/list'});
      }
    }
  }
</script>

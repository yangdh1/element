<template>
  <div>
  <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          :page-size= "pars.pageSize"
          :current-page.sync="pars.pageNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pars.total">
  </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['pars'],
  data () {
    return {
//      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    handleCurrentChange(val){
      this.pars.pageNum = val;
      this.$emit('change',  this.pars)
    },
    handleSizeChange(val){
      this.pars.pageSize = val;
      this.$emit('change',  this.pars)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

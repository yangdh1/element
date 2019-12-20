<template>
  <el-dialog
    title="失败视频"
    :visible.sync="videoVisible"
    :modal="false"
    :width="videoWidth">
    <video :src="videoPath" controls='controls' autoplay='autoplay'>你的浏览器不支持html5视频播放</video>
  </el-dialog>
</template>
<script>
  export default {
    props: ['isShow'],
    data: function () {
      return {}
    },
    methods: {
      //修改密码
      handleClose(done) {
        this.$emit('update:isShow', false)
      },
      getVideoPath() {

      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

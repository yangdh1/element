<template>
    <el-dialog
            title="最新通知"
            :visible.sync="isShow"
            :before-close="handleClose"
            width="30%">
        我是通知列表
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose" size="small">取 消</el-button>
            <el-button type="primary" size="small" @click="changePwd('form')" >确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        props  : ['isShow'],
        data   : function() {
            return {

            }
        },
        methods: {
            //修改密码
            handleClose(done) {
                this.$emit('update:isShow', false)
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

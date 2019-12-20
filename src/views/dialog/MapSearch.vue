<template>
    <el-dialog
            title="高级搜索"
            :visible.sync="isShow"
            :before-close="handleClose"
            width="60%">

        <!--{{diaDeviceArr}}-->
       ddddddd
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="handleClose">取 消</el-button>
            <el-button size="small" type="primary">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>

    //没有用到
    export default {
        props  : ['isShow'],
        data   : function() {
            return {

            }
        },
        computed:{

        },
        mounted(){
        },
        methods: {
            handleClose(done) {
                this.$emit('update:isShow', false)
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

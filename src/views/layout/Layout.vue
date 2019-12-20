<template>
    <div class="app-wrapper">
        <navbar></navbar>
        <div class="main-container">
            <sidebar></sidebar>

            <div class="app-container">
                <app-main></app-main>
            </div>

        </div>

    </div>
</template>

<script>
    import {Navbar, Sidebar, AppMain} from '../layout'
    export default {
        data      : function() {
            return {
            }
        },
        computed:{
        },
        mounted(){

        },
        methods: {
        },
        components: {
            Navbar,
            Sidebar,
            AppMain
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .app-wrapper {
        position: relative;

        .main-container {
            position: relative;
            transition: margin-left 0.28s ease-out;
        }
        .app-container {
            margin-left: 200px;
            overflow: auto;
        }


        .footer{
            height: 48px;
            line-height: 48px;
            text-align: center;
            color: #999;
            background: #f1f1f1;
            z-index: 2;
            position: relative;
        }

    }
</style>

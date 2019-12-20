<template>
  <div  class="sidebar-container">
    <div class="sideBar-fixed" v-bind:style="{top: disTop}"></div>
    <div class="sideBar">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#ffffff"
        text-color="#666"
        :router="isRouter"
        :default-active="$route.path"
        active-text-color="#2773e5">

        <el-menu-item index="/index">
          <i class="iconfont icon-index"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <template  v-for="item in syncMenus">
          <el-submenu :index="item.name" :key="item.name" v-if="!item.hidden && syncMenus.length>0 && item.hasSub">
            <template slot="title">
              <i v-bind:class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <template v-if="item.children.length>0 && !child.hidden" v-for="child in item.children">
              <template v-if="child.hasSub &&!child.hidden">
                <el-submenu :index="item.path">
                  <template slot="title">{{child.name}}</template>
                  <template  v-for="third in child.children">
                    <el-menu-item :index="item.path+'/'+third.path">{{third.name}}</el-menu-item>
                  </template>
                </el-submenu>
              </template>
              <el-menu-item :index="item.path+'/'+child.path"  v-if="!child.hasSub">
                <i v-bind:class="child.icon"></i> <span>{{child.name}}</span>
              </el-menu-item>
            </template>
          </el-submenu>

          <el-menu-item :index="item.path+'/index'" :key="item.name" v-if="!item.hasSub">
            <i v-bind:class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </template>

      </el-menu>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data: function() {
      return {
        isRouter: true,
        disTop: '40px'
      }
    },
    mounted(){
      console.log(this.syncMenus);
      window.addEventListener('scroll', this.handleScroll)
    },
    computed: {
      ...mapGetters([
        'syncMenus'
      ])
    },
    methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleScroll(){
        //先这样 这问题 需要整体来看下 菜单问题
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
//      console.log(scrollTop)
        if(scrollTop > 40){
          this.disTop=0;
        }else{
          this.disTop= '40px'
        }
      }


    }
  }
</script>

<style>
  .sidebar-container{
  }

  .sideBar{
    transition: width 0.28s ease-out;
    width: 200px;
    height: 100%;
    float: left;
    overflow-y: hidden;
  }
  .sideBar-fixed{
    position: fixed;
    top: 40px;
    bottom:0;
    width: 1px;
    left:199px;
    background: #e6e6e6;
    z-index: 2;
  }
</style>

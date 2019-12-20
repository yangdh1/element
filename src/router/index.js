import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

import Layout from '@/views/layout/Layout'
import AppMain from '@/views/layout/AppMain'

//基础菜单
export const commonMenus  = [
  { path: '/login',name: '登录', component: _import('login/index')},
  { path: '/about',name: '关于', component: _import('about/index')},
  {
    path: '/',
    redirect: { path: '/login' }
  },
  {
    path: '/',
    component: Layout,
    name: '首页',
    children: [
      { path: 'index', component: _import('index/index') }
    ]
  },
  { path: '/404', component: _import('errorPage/404'), hidden: true }
];


//动态权限菜单
export const asyncMenus = [
  {
    path: '/serviceType',
    component: Layout,
    name: '服务管理',
    menuId: '107',
    icon: 'iconfont icon-fuwuleixingguanli',
    hasSub: true,
    children: [
      { path: 'list', menuId: '107001', name:'查看服务类型列表', component: _import('serviceType/serviceTypeList')},
      { path: 'add', name:'增加服务类型', component: _import('serviceType/addServiceType'),hidden:true },
      { path: 'edit/:id', name:'编辑服务类型', component: _import('serviceType/editServiceType') ,hidden:true},
      { path: 'details/:id', name:'获取服务类型详情', component: _import('serviceType/serviceTypeDetails') ,hidden:true},
    ]
  },
  {
    path: '/skillType',
    component: Layout,
    name: '业务管理',
    menuId: '108',
    icon: 'iconfont icon-yewuleixingguanli',
    hasSub: true,
    children: [
      { path: 'list', menuId: '108001', name:'查看业务类型列表', component: _import('skillType/skillTypeList')},
      { path: 'add', name:'增加业务类型', component: _import('skillType/addSkillType'),hidden:true },
      { path: 'edit/:id', name:'编辑业务类型', component: _import('skillType/editSkillType') ,hidden:true},
      { path: 'details/:id', name:'获取业务类型详情', component: _import('skillType/skillTypeDetails') ,hidden:true},
    ]
  },
  {
    path: '/ordinaryVip',
    component: Layout,
    name: '359会员管理',
    menuId: '109',
    icon: 'iconfont icon-359huiyuanchongzhijilu',
    hasSub: true,
    children: [
      { path: 'list', menuId: '109001', name:'查询充值记录', component: _import('ordinaryVip/ordinaryVipHistoryList')},
      { path: 'listVip', menuId: '109002', name:'查询会员列表', component: _import('ordinaryVip/ordinaryVipList')},
      { path: 'details/:userId', name:'查询账户详情', component: _import('ordinaryVip/ordinaryDetails') ,hidden:true},
    ]
  },
  {
    path: '/stockVip',
    component: Layout,
    name: '股票会员管理',
    menuId: '110',
    icon: 'iconfont icon-gupiaohuiyuanchongzhijilu',
    hasSub: true,
    children: [
      { path: 'list', menuId: '110001', name:'查询充值记录', component: _import('stockVip/stockVipHistoryList')},
      { path: 'listVip', menuId: '110002', name:'查询会员列表', component: _import('stockVip/stockVipList')},
      { path: 'details/:userId', name:'查询账户详情', component: _import('stockVip/stockDetails') ,hidden:true},
    ]
  },
  {
    path: '/money',
    component: Layout,
    name: '账户管理',
    menuId: '111',
    icon: 'iconfont icon-zhanghuguanli',
    hasSub: true,
    children: [
      { path: 'list', menuId: '111001', name:'查询账户列表', component: _import('money/moneyList')},
      { path: 'listMoney', menuId: '111002', name:'查询充值记录', component: _import('money/moneyHistoryList')},
    ]
  },

  {
    path: '/list',
    component: Layout,
    name: '律师审核管理',
    menuId: '110',
    icon: 'iconfont icon-gupiaohuiyuanchongzhijilu',
    hasSub: true,
    children: [
      { path: 'list', menuId: '110001', name:'律师审核管理', component: _import('lawyer/list')},
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: '系统管理',
    menuId: '999',
    icon: 'iconfont icon-xitongguanli',
    hasSub: true,
    children: [
      { path: 'user/list', menuId: '999001', name:'用户管理', component: _import('user/userList') },
      { path: 'user/add', name:'添加用户', component: _import('user/addUser') ,hidden:true},
      { path: 'user/edit/:id', name:'编辑用户', component: _import('user/editUser') ,hidden:true},
      { path: 'user/detail/:id', name:'查看用户', component: _import('user/userDetail') ,hidden:true},
      { path: 'role/list', menuId: '999002', name:'角色管理', component: _import('role/roleList') },
      { path: 'role/add', name:'添加角色', component: _import('role/addRole') ,hidden:true},
      { path: 'role/edit/:id', name:'编辑角色', component: _import('role/editRole') ,hidden:true},
      { path: 'role/roleResource/:id', name:'编辑角色', component: _import('role/roleResource') ,hidden:true},

    ]
  },
  { path: '*', redirect: '/404', hidden: true, is404: true }
];

export default new Router({
  routes: commonMenus
})

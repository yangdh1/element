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
    menuId:'001',
    name:'用户管理',
    icon:'iconfont icon-userManage',
    path:'/userManage',
    component:Layout,
    hasSub:true,
    children:[
      { path: 'addUser', menuId:'00100', name:'添加用户', component: _import('user/addUser') ,hidden:true},
      { path: 'userList', menuId: '00101', name:'用户列表', component: _import('user/userList')},
      { path: 'userDetail/:id', menuId: '0010101', name:'用户详情', component: _import('user/userDetail'),hidden:true},
      { path: 'editUser/:id', menuId: '0010102', name:'编辑用户信息', component: _import('user/editUser'),hidden:true},
      { path: 'lawyerList', menuId: '00102', name:'律师列表', component: _import('lawyer/lawyerList')},
      { path: 'lawyerDetail', menuId: '0010201', name:'律师详情', component: _import('lawyer/lawyerDetail'),hidden:true},
      { path: 'editLawyer', menuId: '0010202', name:'编辑律师信息', component: _import('lawyer/editLawyer'),hidden:true},
    ]
  },
  {
    menuId:'002',
    name:'认证管理',
    icon:'iconfont icon-validateManage',
    path:'/authValidateManage',
    component:Layout,
    hasSub:true,
    children:[
      //审核请求列表
      { path: 'authValidateList', menuId: '00201', name:'审核列表', component: _import('authValidateManage/authValidateList')},
      //详情并判定审核
      { path: 'checkAuthValidate/:id', menuId: '00201', name:'认证审核', component: _import('authValidateManage/checkAuthValidate'),hidden:true},
    ]
  },
  {
    path: '/vipMember',
    component: Layout,
    name: '会员管理',
    menuId: '003',
    icon: 'iconfont icon-vipMemberGuanLi',
    hasSub: true,
    children: [
      { path: 'ordinaryVipList', menuId: '00301', name:'359会员列表', component: _import('ordinaryVip/ordinaryVipList')},
      { path: 'ordinaryVipRechargeList', menuId: '0030101', name:'359充值记录', component: _import('ordinaryVip/ordinaryVipHistoryList'),hidden:true},
      { path: 'stockVipList', menuId: '00302', name:'股票会员列表', component: _import('stockVip/stockVipList')},
      { path: 'stockVipRechargeList', menuId: '0030201', name:'股票会员充值记录',  component: _import('stockVip/stockVipHistoryList'),hidden:true},
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: '订单管理',
    menuId: '004',
    icon: 'iconfont icon-orderGuanLi',
    hasSub: true,
    children: [
      { path: 'orderList', menuId: '00401', name:'查询订单列表', component: _import('order/orderList')},
      { path: 'orderDetail/:orderId', menuId:'0040101',  name:'orderDetail', component: _import('order/orderDetail') ,hidden:true},
      { path: 'orderEvaluate/orderEvaluate', menuId: '00402', name:'订单评价管理', component: _import('orderEvaluate/orderEvaluate') },
      { path: 'orderEvaluate/detail/:id', menuId:'0040201', name:'查看详情', component: _import('orderEvaluate/orderEvaluateDetail') ,hidden:true},
    ]
  },
  {
    path: '/tradeRecord',
    component: Layout,
    name: '交易记录',
    menuId: '005',
    icon: 'iconfont icon-tradeRecord',
    hasSub: true,
    children:[
      { path: 'userCoinHistories', menuId: '00501', name:'用户心币历史交易', component: _import('tradeRecord/userCoinHistories')},
      { path: 'userMoneyHistories', menuId: '00502', name:'用户余额历史交易', component: _import('tradeRecord/userMoneyHistories')},
      { path: 'platMoneyHistories', menuId: '00503', name:'平台余额历史交易', component: _import('tradeRecord/platMoneyHistories')},
      { path: 'platCoinHistories', menuId: '00504', name:'平台心币历史交易', component: _import('tradeRecord/platCoinHistories')},
    ]
  },

  /*
    {
      path: '/serviceType',
      component: Layout,
      name: '服务管理',
      menuId: '107',
      icon: 'iconfont icon-fuwuleixingguanli',
      hasSub: true,
      children: [
        { path: 'lawyerList.vue', menuId: '107001', name:'查看服务类型列表', component: _import('serviceType/serviceTypeList')},
        { path: 'add', name:'增加服务类型', component: _import('serviceType/addServiceType'),hidden:true },
        { path: 'edit/:id', name:'编辑服务类型', component: _import('serviceType/editServiceType') ,hidden:true},
        { path: 'details/:id', name:'获取服务类型详情', component: _import('serviceType/serviceTypeDetails') ,hidden:true},
      ]
    },
   */
  /*
    {
      path: '/skillType',
      component: Layout,
      name: '业务管理',
      menuId: '108',
      icon: 'iconfont icon-yewuleixingguanli',
      hasSub: true,
      children: [
        { path: 'lawyerList.vue', menuId: '108001', name:'查看业务类型列表', component: _import('skillType/skillTypeList')},
        { path: 'add', name:'增加业务类型', component: _import('skillType/addSkillType'),hidden:true },
        { path: 'edit/:id', name:'编辑业务类型', component: _import('skillType/editSkillType') ,hidden:true},
        { path: 'details/:id', name:'获取业务类型详情', component: _import('skillType/skillTypeDetails') ,hidden:true},
      ]
    },
*/
/*
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
    },*/
  /*
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
    */
 /*
  {
    path: '/money',
    component: Layout,
    name: '账户管理',
    menuId: '111',
    icon: 'iconfont icon-zhanghuguanli',
    hasSub: true,
    children: [
      { path: 'lawyerList.vue', menuId: '111001', name:'查询账户列表', component: _import('money/moneyList')},
      { path: 'listMoney', menuId: '111002', name:'查询充值记录', component: _import('money/moneyHistoryList')},
    ]
  },
  */
 /*
  {
    path: '/list',
    component: Layout,
    name: '律师审核管理',
    menuId: '110',
    icon: 'iconfont icon-gupiaohuiyuanchongzhijilu',
    hasSub: true,
    children: [
      { path: 'lawyerList.vue', menuId: '110001', name:'律师审核管理', component: _import('lawyer/list')},
    ]
  },
  */
 /*
  {
    path: '/type',
    component: Layout,
    name: '类型管理',
    menuId: '112',
    icon: 'iconfont icon-gupiaohuiyuanchongzhijilu',
    hasSub: true,
    children: [
      { path: 'principalStatus/list', menuId: '108001', name:'当事人诉讼类型管理', component: _import('principalStatus/list')},
      { path: 'principalStatus/add', name:'添加当事人诉讼类型', component: _import('principalStatus/add'),hidden:true},
      { path: 'principalStatus/edit/:id', name:'编辑当事人诉讼类型', component: _import('principalStatus/edit') ,hidden:true},
      { path: 'lawsuitProcedure/list', menuId: '108002', name:'诉讼程序关系的列表', component: _import('lawsuitProcedure/list')},
    ]
  },
  */

  {
    path: '/config',
    component: Layout,
    name: '系统数据管理',
    menuId: '113',
    icon: 'iconfont icon-gupiaohuiyuanchongzhijilu',
    hasSub: true,
    children: [
      { path: 'lawyerList.vue', menuId: '108003', name:'系统数据', component: _import('config/list')},
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
      { path: 'user/transactionRecord/:id', name:'交易记录', component: _import('user/transactionRecord') ,hidden:true},
      { path: 'user/attestationDetail/:id', name:'查看用户认证信息', component: _import('user/attestationDetail') ,hidden:true},
      { path: 'role/list', menuId: '999002', name:'角色管理', component: _import('role/roleList') },
      { path: 'role/add', name:'添加角色', component: _import('role/addRole') ,hidden:true},
      { path: 'role/edit/:id', name:'编辑角色', component: _import('role/editRole') ,hidden:true},
      { path: 'role/roleResource/:id', name:'编辑角色', component: _import('role/roleResource') ,hidden:true},
      { path: 'oaIndex/list',icon: '', menuId: '999003', name: 'web轮播管理',  component: _import('oaIndex/list') },
      { path: 'oaIndex/addImg', name: '新增web轮播', component: _import('oaIndex/addImg'), hidden: true},
      { path: 'oaIndex/editImg/:id', name: '编辑web轮播', component: _import('oaIndex/editImg'), hidden: true},
      { path: 'appLawyerIndex/list',icon: '', menuId: '999004', name: '律师APP轮播管理',  component: _import('appLawyerIndex/list') },
      { path: 'appLawyerIndex/addImg', name: '新增律师APP轮播', component: _import('appLawyerIndex/addImg'), hidden: true},
      { path: 'appLawyerIndex/editImg/:id', name: '编辑律师APP轮播', component: _import('appLawyerIndex/editImg'), hidden: true},
      { path: 'appLawyerIndex/appcarouselFigureDetail/:id', name: '律师APP轮播详情', component: _import('appLawyerIndex/appcarouselFigureDetail'), hidden: true},
      { path: 'appGeneralUserIndex/list',icon: '', menuId: '999005', name: '普通用户轮播管理',  component: _import('appGeneralUserIndex/list') },
      { path: 'appGeneralUserIndex/addImg', name: '新增普通用户轮播', component: _import('appGeneralUserIndex/addImg'), hidden: true},
      { path: 'appGeneralUserIndex/editImg/:id', name: '编辑普通用户轮播', component: _import('appGeneralUserIndex/editImg'), hidden: true},
      { path: 'appGeneralUserIndex/appcarouselFigureDetail/:id', name: '普通用户轮播详情', component: _import('appGeneralUserIndex/appcarouselFigureDetail'), hidden: true},

      { path: 'edition/list', menuId: '999006', name: '应用版本管理',  component: _import('edition/list') },
      { path: 'edition/add',  name: '添加应用版本管理',  component: _import('edition/add'),hidden: true },
      { path: 'edition/edit/:id', name: '编辑应用版本管理',  component: _import('edition/edit'),hidden: true },
      { path: 'edition/qrPage', name: '二维码下载链接',  component: _import('edition/qrPage'),hidden: true },


    ]
  },
  { path: '*', redirect: '/404', hidden: true, is404: true }
];

export default new Router({
  routes: commonMenus
})

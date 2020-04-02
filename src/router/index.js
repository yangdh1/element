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
      { path: 'userList', menuId: '001001' ,icon: '', name:'用户列表', component: _import('user/userList')},
      { path: 'userDetail/:id', name:'用户详情', component: _import('user/userDetailInfo'),hidden:true},
      { path: 'tradeRecord', name:'交易记录', component: _import('user/transactionRecord') ,hidden:true},
      { path: 'lawyerList', menuId: '001002', name:'律师列表', component: _import('lawyer/lawyerList')},
      { path: 'lawyerDetail/:id', name:'律师详情', component: _import('lawyer/lawyerDetail'),hidden:true},
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
          { path: 'authValidateList', menuId: '002001', name:'审核列表', component: _import('authValidateManage/authValidateList')},
          { path: 'checkAuthValidate/:id', name:'认证审核', component: _import('authValidateManage/checkAuthValidate'),hidden:true},

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
      { path: 'ordinaryVipList', menuId: '003001', name:'359会员列表', component: _import('ordinaryVip/ordinaryVipList')},
      { path: 'ordinaryDetails/:id', name:'359充值记录', component: _import('ordinaryVip/ordinaryDetails'),hidden:true},
      { path: 'stockVipList', menuId: '003002', name:'股票会员列表', component: _import('stockVip/stockVipList')},
      { path: 'stockVipHistoryList/:id', name:'股票会员充值记录',  component: _import('stockVip/stockDetails'),hidden:true},
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
      { path: 'orderList', menuId: '004001', name:'查询订单列表', component: _import('order/orderList')},
      { path: 'orderDetail/:orderId',  name:'orderDetail', component: _import('order/orderDetail') ,hidden:true},
  /*    { path: 'orderEvaluate/orderEvaluate', menuId: '004002', name:'订单评价管理', component: _import('orderEvaluate/orderEvaluate') },
      { path: 'orderEvaluate/detail/:id', name:'查看详情', component: _import('orderEvaluate/orderEvaluateDetail') ,hidden:true},*/
    ]
  },
  {
    path: '/evaluate',
    component: Layout,
    name: '评论管理',
    menuId: '010',
    icon: 'iconfont icon-orderGuanLi',
    hasSub: true,
    children: [
      { path: 'orderEvaluate/orderEvaluate', menuId: '010001', name:'订单评价', component: _import('orderEvaluate/orderEvaluate') },
      { path: 'orderEvaluate/detail/:id', name:'查看详情', component: _import('orderEvaluate/orderEvaluateDetail') ,hidden:true},
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
      { path: 'userCoinHistories', menuId: '005001', name:'用户心币历史交易', component: _import('tradeRecord/userCoinHistories')},
      { path: 'userMoneyHistories', menuId: '005002', name:'用户余额历史交易', component: _import('tradeRecord/userMoneyHistories')},
      { path: 'platMoneyHistories', menuId: '005003', name:'平台余额历史交易', component: _import('tradeRecord/platMoneyHistories')},
      { path: 'platCoinHistories', menuId: '005004', name:'平台心币历史交易', component: _import('tradeRecord/platCoinHistories')},
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
    menuId: '007',
    icon: 'iconfont icon-gupiaohuiyuanchongzhijilu',
    hasSub: true,
    children: [
      { path: 'lawyerList', menuId: '007001', name:'系统数据', component: _import('config/list')},
    ]
  },
  {
    path: '/config',
    component: Layout,
    name: '信息公告管理',
    menuId: '008',
    icon: 'iconfont icon-gupiaohuiyuanchongzhijilu',
    hasSub: true,
    children: [
      { path: 'appLawyerIndex/list',icon: '', name: '首页轮播图管理',  component: _import('appLawyerIndex/list'), hidden: true  },
      { path: 'appLawyerIndex/addImg', name: '新增律师APP轮播', component: _import('appLawyerIndex/addImg'), hidden: true},
      { path: 'appLawyerIndex/editImg/:id', name: '编辑律师APP轮播', component: _import('appLawyerIndex/editImg'), hidden: true},
      { path: 'appLawyerIndex/appcarouselFigureDetail/:id', name: '律师APP轮播详情', component: _import('appLawyerIndex/appcarouselFigureDetail'), hidden: true},
      { path: 'appLawyerIndex/userlist',icon: '', menuId: '007001', name: '普通用户轮播管理',  component: _import('appLawyerIndex/userlist')},
      { path: 'appLawyerIndex/addUserImg', name: '新增普通用户轮播', component: _import('appLawyerIndex/addUserImg'), hidden: true},
      { path: 'appLawyerIndex/editUserImg/:id', name: '编辑普通用户轮播', component: _import('appLawyerIndex/editUserImg'), hidden: true},
      { path: 'appLawyerIndex/appcarouselFigureUserDetail/:id', name: '普通用户轮播详情', component: _import('appLawyerIndex/appcarouselFigureUserDetail'), hidden: true},
    ]
  },

  {
    path: '/sysAuthManage',
    component: Layout,
    name: '权限管理',
    menuId: '006',
    icon: 'iconfont icon-tradeRecord',
    hasSub: true,
    children:[
      { path: 'administratorList', menuId: '006001', name:'管理员维护', component: _import('sysAuthManage/administratorList')},
      { path: 'addAdministrator', name:'新增管理员',hidden:true, component: _import('sysAuthManage/addAdministrator')},
      { path: 'editSysAuthManage/:id', name:'编辑管理员', component: _import('sysAuthManage/editAdministrator'),hidden:true},
      /*      { path: 'roleList', menuId: '00603', name:'角色权限', component: _import('sysAuthManage/roleList')},
            { path: 'editRole', menuId: '00604', name:'编辑角色', hidden:true, component: _import('sysAuthManage/editRole')},
            { path: 'addRole', menuId: '00605', name:'新增角色',  hidden:true, component: _import('sysAuthManage/addRole')},
            { path: 'privileges', menuId: '00606', name:'分配权限', hidden:true, component: _import('sysAuthManage/privileges')},*/
      { path: 'role/list', menuId: '006002', name:'角色权限', component: _import('role/roleList') },
      { path: 'role/add', name:'添加角色', component: _import('role/addRole') ,hidden:true},
      { path: 'role/edit/:id', name:'编辑角色', component: _import('role/editRole') ,hidden:true},
      { path: 'role/roleResource/:id', name:'编辑角色', component: _import('role/roleResource') ,hidden:true},
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: '系统管理',
    menuId: '009',
    icon: 'iconfont icon-xitongguanli',
    hasSub: true,
    children: [
/*      { path: 'role/list', menuId: '999002', name:'角色管理', component: _import('role/roleList') },
      { path: 'role/add', name:'添加角色', component: _import('role/addRole') ,hidden:true},
      { path: 'role/edit/:id', name:'编辑角色', component: _import('role/editRole') ,hidden:true},
      { path: 'role/roleResource/:id', name:'编辑角色', component: _import('role/roleResource') ,hidden:true},*/
/*      { path: 'oaIndex/list',icon: '', menuId: '999003', name: 'web轮播管理',  component: _import('oaIndex/list') },
      { path: 'oaIndex/addImg', name: '新增web轮播', component: _import('oaIndex/addImg'), hidden: true},
      { path: 'oaIndex/editImg/:id', name: '编辑web轮播', component: _import('oaIndex/editImg'), hidden: true},*/
     /* { path: 'appLawyerIndex/list',icon: '', menuId: '999004', name: '律师APP轮播管理',  component: _import('appLawyerIndex/list') },
      { path: 'appLawyerIndex/addImg', name: '新增律师APP轮播', component: _import('appLawyerIndex/addImg'), hidden: true},
      { path: 'appLawyerIndex/editImg/:id', name: '编辑律师APP轮播', component: _import('appLawyerIndex/editImg'), hidden: true},
      { path: 'appLawyerIndex/appcarouselFigureDetail/:id', name: '律师APP轮播详情', component: _import('appLawyerIndex/appcarouselFigureDetail'), hidden: true},
      { path: 'appGeneralUserIndex/list',icon: '', menuId: '999005', name: '普通用户轮播管理',  component: _import('appGeneralUserIndex/list') },
      { path: 'appGeneralUserIndex/addImg', name: '新增普通用户轮播', component: _import('appGeneralUserIndex/addImg'), hidden: true},
      { path: 'appGeneralUserIndex/editImg/:id', name: '编辑普通用户轮播', component: _import('appGeneralUserIndex/editImg'), hidden: true},
      { path: 'appGeneralUserIndex/appcarouselFigureDetail/:id', name: '普通用户轮播详情', component: _import('appGeneralUserIndex/appcarouselFigureDetail'), hidden: true},*/

      { path: 'edition/list', menuId: '009001', name: '应用版本管理',  component: _import('edition/list') },
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

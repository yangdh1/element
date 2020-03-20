import axios from 'axios';
import { Message } from 'element-ui';
import { getToken } from "../utils/auth"

// import Store from '../vuex/store'

// let base = 'http://192.168.1.106:8088';
let base = process.env.BASE_API;
let multipartUrl = process.env.MULTIPART_API;

// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['dataType'] = 'json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

if(getToken()){
  axios.defaults.headers.common['token'] = getToken();
  //getToken();
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {

  if(response.data.type == "application/octet-stream"){
    return response;
  }
  //验证无法通过
  else if(!response.data.code){
    Message.error({
      duration: 1500,
      message  : response.data.msg || 'data返回null',
      type     : 'error'
    });
    // Store.commit('SET_LOADING_STATE', false);
    return Promise.reject(response.data.msg || 'data返回null');
  }
  return response.data.data;

}, function (err) {

  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误';
        break;
      case 401:
        err.message = '账号或密码错误';		//未授权
        break;
      case 403:
        err.message = '拒绝访问';
        break;
      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break;
      case 408:
        err.message = '请求超时';
        break;
      case 500:
        err.message = '服务器内部错误';
        break;
      case 501:
        err.message = '服务未实现';
        break;
      case 502:
        err.message = '网关错误';
        break;
      case 503:
        err.message = '服务不可用';
        break;
      case 504:
        err.message = '网关超时';
        break;
      case 505:
        err.message = 'HTTP版本不受支持';
        break;
      default:
        err.message = '未知错误'+ err.response.status;
    }
  }
  Message.error({
    duration: 1500,
    message  : err.message,
    type     : 'error'
  });
  return Promise.reject(err);
});

export const BaseAPI = base;
export const MultipartAPI = multipartUrl;
export default {
  appVersionManager: {
    list: params => {
      return axios.post(`${base}/appVersionManager/list`, params)
    },
    allappType: params => {
      return axios.post(`${base}/appVersionManager/allappType`, params)
    },
    allClientTypeEnum: params => {
      return axios.post(`${base}/appVersionManager/allClientTypeEnum`, params)
    },
    add: params => {
      return axios.post(`${base}/appVersionManager/add`, params)
    },
    detail: params => {
      return axios.post(`${base}/appVersionManager/detail/` + params.id);
    },
    delete: params => {
      return axios.post(`${base}/appVersionManager/delete/` + params.id);
    },
    compulsory: params => {
      return axios.post(`${base}/appVersionManager/compulsory/` + params.id);
    },
    update: params => {
      return axios.post(`${base}/appVersionManager/update`, params)
    }
  },
  schedule:{
    index: params =>{ return axios.post(`${base}/schedule/index`, params); },
    add: params =>{ return axios.post(`${base}/schedule/add`, params); },
    detail: params =>{ return axios.post(`${base}/schedule/detail/`+params.id); },
    delete: params =>{ return axios.post(`${base}/schedule/delete/`+params.id); }
  },
  holiday:{
    listForSchedule: params =>{ return axios.post(`${base}/holiday/listForSchedule`, params); },
    listHoliday: params =>{ return axios.post(`${base}/holiday/listHoliday`, params); },
    add: params =>{ return axios.post(`${base}/holiday/addHoliday`, params); },
    list: params =>{ return axios.post(`${base}/holiday/listForSchedule`, params); },
    listAllHoliday: params =>{ return axios.post(`${base}/holiday/listAllHoliday`, params); },
    detail: params =>{ return axios.post(`${base}/holiday/detail/`+params.id); },
    update: params =>{ return axios.post(`${base}/holiday/updateHoliday`, params); },
    delete: params =>{ return axios.post(`${base}/holiday/delete/`+params.id); },
  },
  role: {
    list	: params => { return axios.post(`${base}/role/list`, params); },
    listAll	: params => { return axios.post(`${base}/role/listAll`); },
    add:  params => { return axios.post(`${base}/role/add`,  params); },
    detail:  params => { return axios.post(`${base}/role/detail/` +  params.id); },
    edit:  params => { return axios.post(`${base}/role/update`,  params); },
    loadResource:  params => { return axios.post(`${base}/role/loadResource/` + params.id); },
    saveResource:  params => { return axios.post(`${base}/role/saveResource`,  params); },
    delete:  params => { return axios.post(`${base}/role/delete/`+params.id); }
  },
  config:{
    listAll	: params => { return axios.post(`${base}/config/listAll`); },
    edit:  params => { return axios.post(`${base}/config/update`, params); },
  },

  user:{
    login: params =>{ return axios.post(`${base}/login`, params); },
    logout: params =>{ return axios.post(`${base}/logout`, params); },
    loginByToken: params =>{ return axios.post(`${base}/loginByToken`, params); },
    changePwd:  params => { return axios.post(`${base}/updatePassword/`,params); },

    userList: params =>{ return axios.post(`${base}/userManage/userList`, params); },
    blockedAccount: params =>{ return axios.post(`${base}/userManage/blockedAccount/`+params.id); },
    detail: params =>{ return axios.post(`${base}/userManage/userDetail/`+params.id); },
    add: params =>{ return axios.post(`${base}/userManage/add`, params); },
    update:params=>{return axios.post(`${base}/userManage/update`,params)},
    exports:params=>{return axios.post(`${base}/userManage/export/`,params)},
  },
  serviceType:{
    list:params => {return axios.post(`${base}/service/listServiceType`, params)},
    add:params => {return axios.post(`${base}/service/addServiceType`, params)},
    update:params => {return axios.post(`${base}/service/updateServiceType`, params)},
    delete:params => {return axios.post(`${base}/service/deleteServiceType`, params)},
    details:params => {return axios.post(`${base}/service/getServiceType`, params)},
  },
  skillType:{
    list:params => {return axios.post(`${base}/skillType/listSkillType`, params)},
    add:params => {return axios.post(`${base}/skillType/saveSkillType`, params)},
    update:params => {return axios.post(`${base}/skillType/updateSkillType`, params)},
    delete:params => {return axios.post(`${base}/skillType/deleteSkillType`, params)},
    details:params => {return axios.post(`${base}/skillType/getSkillType`, params)},
  },
  principalStatus:{
    list:params => {return axios.post(`${base}/principalStatus/list`, params)},
    add:params => {return axios.post(`${base}/principalStatus/add`, params)},
    update:params => {return axios.post(`${base}/principalStatus/update`, params)},
    delete:params => {return axios.post(`${base}/skillType/deleteSkillType`, params)},
    details:params => {return axios.post(`${base}/principalStatus/getPrincipalStatus`, params)},
  },
  lawsuitProcedure:{
    list:params => {return axios.post(`${base}/lawsuitProcedure/list`, params)},
  },
  ordinaryVip:{
    list:params => {return axios.post(`${base}/userOrdinaryHistory/listVipHistory`, params)},
    listVip:params => {return axios.post(`${base}/userAccount/listUserOrdinary`, params)},
    details:params => {return axios.post(`${base}/userAccount/detail`, params)},
  },
  stockVip:{
    list:params => {return axios.post(`${base}/userStockHistory/listVipHistory`, params)},
    listVip:params => {return axios.post(`${base}/userAccount/listUserStock`, params)},
    details:params => {return axios.post(`${base}/userAccount/detail`, params)},
  },
  money:{
    list:params => {return axios.post(`${base}/userMoneyHistory/listMoneyHistory`, params)},
    listMoney:params => {return axios.post(`${base}/userAccount/listUserMoney`, params)},
  },
  lawyer:{
    list:params => {return axios.post(`${base}/lawyer/list`, params)},
    toExamine:params => {return axios.post(`${base}/lawyer/toExamine/`+ params.id)},
    detail:params => {return axios.post(`${base}/lawyer/detail/`+ params.id)},
    updateLawyerStatus:params => {return axios.post(`${base}/lawyer/updateLawyerStatus`, params)},
  },
  orderEvaluate:{
    list:params => {return axios.post(`${base}/orderEvaluate/list`, params)},
    detail:params => {return axios.post(`${base}/orderEvaluate/detail/`+ params.id)},
    delete:params => {return axios.post(`${base}/orderEvaluate/delete/`+ params.id)},
  },
  orderManage:{
    list:params => {return axios.post(`${base}/order/list`, params)},
    detail:params => {return axios.post(`${base}/order/detail/`+ params.orderId)},
  },

  //交易记录
  tradeRecord:{
    userCoinHistories:params =>  {return axios.post(`${base}/tradeRecord/listUserCoinHistories`, params)},
    userMoneyHistories:params =>  {return axios.post(`${base}/tradeRecord/listUserMoneyHistories`, params)},
    platCoinHistories:params =>  {return axios.post(`${base}/tradeRecord/listPlatCoinHistories`, params)},
    platMoneyHistories:params =>  {return axios.post(`${base}/tradeRecord/listPlatMoneyHistories`, params)},
    deleteHistoryTradeRecord:params =>  {return axios.post(`${base}/tradeRecord/deleteHistoryTradeRecord`, params)},
    historyTradeDetail:params =>  {return axios.post(`${base}/tradeRecord/historyTradeDetail`, params)},
  },
  carouselFigureManager:{
    listAppLawyer:params =>  {return axios.post(`${base}/carouselFigureManager/listAppLawyer`, params)},
    list:params =>  {return axios.post(`${base}/carouselFigureManager/listOA`, params)},
    listAppGeneralUser:params =>  {return axios.post(`${base}/carouselFigureManager/listAppGeneralUser`, params)},
    detail:params =>  {return axios.post(`${base}/carouselFigureManager/detail`, params)},
    update:params =>  {return axios.post(`${base}/carouselFigureManager/update`, params)},
    addAppGeneralUser:params =>  {return axios.post(`${base}/carouselFigureManager/addAppGeneralUser`, params)},
    delete:params =>  {return axios.post(`${base}/carouselFigureManager/delete/` + params.id)},
  }
}

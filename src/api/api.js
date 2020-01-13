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
  carouselFigureManager: {
    add: params => {
      return axios.post(`${base}/carouselFigureManager/addOA`, params)
    },
    list: params => {
      return axios.post(`${base}/carouselFigureManager/listOA`, params)
    },
    detail: params => {
      return axios.post(`${base}/carouselFigureManager/detail`, params)
    },
    update: params => {
      return axios.post(`${base}/carouselFigureManager/update`, params)
    },
    addAppLawyer: params => {
      return axios.post(`${base}/carouselFigureManager/addAppLawyer`, params)
    },
    listAppLawyer: params => {
      return axios.post(`${base}/carouselFigureManager/listAppLawyer`, params)
    },
    addAppGeneralUser: params => {
      return axios.post(`${base}/carouselFigureManager/addAppGeneralUser`, params)
    },
    listAppGeneralUser: params => {
      return axios.post(`${base}/carouselFigureManager/listAppGeneralUser`, params)
    },
    listByType: params => {
      return axios.post(`${base}/carouselFigureManager/listByType`, params)
    },
    delete: params => {
      return axios.post(`${base}/carouselFigureManager/delete/` + params.id)
    },
  },
  user:{
    login: params =>{ return axios.post(`${base}/login`, params); },
    logout: params =>{ return axios.post(`${base}/logout`, params); },
    loginByToken: params =>{ return axios.post(`${base}/loginByToken`, params); },
    changePwd:  params => { return axios.post(`${base}/updatePassword/`,params); },
    list: params =>{ return axios.post(`${base}/user/list`, params); },
    listAll: params =>{ return axios.post(`${base}/user/allUser`, params); },
    add: params =>{ return axios.post(`${base}/user/add`, params); },
    detail: params =>{ return axios.post(`${base}/user/userDetail/`+params.id); },
    delete: params =>{ return axios.post(`${base}/user/delete/`+params.id); },
    update:params=>{return axios.post(`${base}/user/update/`,params)},
  },
  visitor:{
    addAgain : params => { return axios.post(`${base}/visitor/common/complete`, params); },
    detail : params => { return axios.post(`${base}/visitor/common/detail`, params); },
    detailByCode: params => { return axios.post(`${base}/visitor/common/detailByCode`, params); },
    list:params => {return axios.post(`${base}/visitor/common/list`, params)},
    listMeeting:params => {return axios.post(`${base}/visitor/meeting/list`, params)},
    detailMeeting : params => { return axios.post(`${base}/visitor/meeting/detail`, params); },
  },
  vehicle:{
    add:params => {return axios.post(`${base}/vehicle/common/add`, params)},
    list:params => {return axios.post(`${base}/vehicle/common/list`, params)},
    detail:params => {return axios.post(`${base}/vehicle/common/detail`, params)},
    update:params => {return axios.post(`${base}/vehicle/common/update`, params)},
    delete:params => {return axios.post(`${base}/vehicle/common/delete`, params)},
  },
  property:{
    list:params => {return axios.post(`${base}/propertyService/list`, params)},
    detail:params => {return axios.post(`${base}/propertyService/detail`, params)},
    update:params => {return axios.post(`${base}/propertyService/common/update`, params)},
    delete:params => {return axios.post(`${base}/propertyService/delete`, params)},
    dispatches:params => {return axios.post(`${base}/propertyService/dispatch`, params)},
    repairManList:params => {return axios.post(`${base}/propertyService/repairManList`, params)},
    inspectManList:params => {return axios.post(`${base}/propertyInspect/getInspectManList`, params)},

    addPlaceInfo:params => {return axios.post(`${base}/propertyInspect/addPlaceInfo`, params)},
    addPeopleInfo:params => {return axios.post(`${base}/propertyInspect/addPeopleInfo`, params)},
    peopleInfoList:params => {return axios.post(`${base}/propertyInspect/getInspectPeopleInfo`, params)},
    placeInfoList:params => {return axios.post(`${base}/propertyInspect/getPlaceInfoList`, params)},
    detailPeopleInfo:params => {return axios.post(`${base}/propertyInspect/detailInspectPeopleInfo`, params)},
    detailPlaceInfo:params => {return axios.post(`${base}/propertyInspect/detailPlaceInfo`, params)},
    deletePeopleInfo:params => {return axios.post(`${base}/propertyInspect/deletePeopleInfo`, params)},
    deletePlaceInfo:params => {return axios.post(`${base}/propertyInspect/deletePlaceInfo`, params)},
    modifyPeopleInfo:params => {return axios.post(`${base}/propertyInspect/modifyPeopleInfo`, params)},
    modifyPlaceInfo:params => {return axios.post(`${base}/propertyInspect/modifyPlaceInfo`, params)},

    compoundList:params => {return axios.post(`${base}/compound/list`, params)},
    buildingList:params => {return axios.post(`${base}/building/common/list`, params)},
    floorList:params => {return axios.post(`${base}/floor/listByCompound`, params)},

    commentList:params => {return axios.post(`${base}/propertyComments/list`, params)},
    inspectOrderList:params => {return axios.post(`${base}/propertyInspect/getHistoryOrder`, params)},
    inspectOrderDetail:params => {return axios.post(`${base}/propertyInspect/orderDetail`, params)},
  },
  guard:{
    inspectManList:params => {return axios.post(`${base}/guardInspect/getInspectManList`, params)},
    addPlaceInfo:params => {return axios.post(`${base}/guardInspect/addPlaceInfo`, params)},
    addPeopleInfo:params => {return axios.post(`${base}/guardInspect/addPeopleInfo`, params)},
    peopleInfoList:params => {return axios.post(`${base}/guardInspect/getInspectPeopleInfo`, params)},
    placeInfoList:params => {return axios.post(`${base}/guardInspect/getPlaceInfoList`, params)},
    detailPeopleInfo:params => {return axios.post(`${base}/guardInspect/detailInspectPeopleInfo`, params)},
    detailPlaceInfo:params => {return axios.post(`${base}/guardInspect/detailPlaceInfo`, params)},
    deletePeopleInfo:params => {return axios.post(`${base}/guardInspect/deletePeopleInfo`, params)},
    deletePlaceInfo:params => {return axios.post(`${base}/guardInspect/deletePlaceInfo`, params)},
    modifyPeopleInfo:params => {return axios.post(`${base}/guardInspect/modifyPeopleInfo`, params)},
    modifyPlaceInfo:params => {return axios.post(`${base}/guardInspect/modifyPlaceInfo`, params)},
    inspectOrderList:params => {return axios.post(`${base}/guardInspect/getHistoryOrder`, params)},
    inspectOrderDetail:params => {return axios.post(`${base}/guardInspect/orderDetail`, params)},
    getSecurityDepartmentTel:params => {return axios.post(`${base}/compound/getSecurityDepartmentTel`, params)},
    modify:params => {return axios.post(`${base}/compound/modify`, params)},
  },
  merchant: {
    listMerchant: params => {
      return axios.post(`${base}/merchant/common/listMerchant`, params);},//获取商家列表
    add: params => {
      return axios.post(`${base}/merchant/common/add`, params);
    },//添加商家
    getMerchant: params => {return axios.post(`${base}/merchant/common/getMerchant`, params);},//商家详情
    revise: params => {return axios.post(`${base}/merchant/common/revise`, params);},//修改商家信息
    listService: params => {return axios.post(`${base}/merchantService/common/listOA`, params);},//服务列表
    newMerchantService: params => {
      return axios.post(`${base}/merchantService/common/add`, params);
    },//增加服务
    serviceDetail: params => {
      return axios.post(`${base}/merchantService/common/details`, params);
    },//服务详情
    serviceRevise: params => {
      return axios.post(`${base}/merchantService/common/revise`, params);
    },//修改服务详情
    serviceDelete: params => {
      return axios.post(`${base}/merchantService/common/delete`, params);
    },//修改服务详情
    listMerchantServiceOrder: params => {
      return axios.post(`${base}/msoOrder/common/listMsoOA`, params);
    }, //获取订单列表
    receiveMso: params => {return axios.post(`${base}/msoOrder/common/receiveMso`, params);},
    orderDetail: params => {return axios.post(`${base}/msoOrder/common/detail`, params);},
    cancelMso: params => {return axios.post(`${base}/msoOrder/common/cancelMso`, params);},
    modifyState:params => {return axios.post(`${base}/merchantService/common/modifyState`, params);},

  },
  offcieProduct:{
     list:params =>{return axios.post(`${base}/officesuppliesClass/twoList`, params)},
     addList:params =>{return axios.post(`${base}/officesuppliesClass/categoryOneList`, params)},
     add:params =>{return axios.post(`${base}/officesuppliesClass/add`, params)},
    addTwo:params =>{return axios.post(`${base}/officesuppliesClass/addTwo`, params)},
    update:params =>{return axios.post(`${base}/officesuppliesClass/update`, params)},
    detail: params =>{ return axios.post(`${base}/officesuppliesClass/detail/`+params.id); },
    categoryTwoList:params => {return axios.post(`${base}/officesuppliesClass/categoryTwoList/`+params.id);},
    delete:params => {return axios.post(`${base}/officesuppliesClass/delete/`+params.id)},
    categoryTwoListNull:params => {return axios.post(`${base}/officesuppliesClass/OneList`,params)},
  },
  officestock:{
    list:params => {return axios.post(`${base}/officestock/list`, params)},
    delete: params =>{ return axios.post(`${base}/officestock/delete`,params); },
    add:params => {return axios.post(`${base}/officestock/add`, params)},
    detail:params => {return axios.post(`${base}/officestock/detail`, params)},
    update:params => {return axios.post(`${base}/officestock/update`, params)},
    updateStatusReshelf:params => {return axios.post(`${base}/officestock/updateStatusReshelf`,params);},
    updateStatusInstock:params => {return axios.post(`${base}/officestock/updateStatusInstock`,params);},
    updateToExamine:params => {return axios.post(`${base}/officestock/updateToExamine`,params);},
  },
  officeproductname:{
    allList:params => {return axios.post(`${base}/officeproductname/allList`, params)},
    categoryOneList:params => {return axios.post(`${base}/officeproductname/categoryOneList`, params)},
    categoryTwoList:params => {return axios.post(`${base}/officeproductname/categoryTwoList/` +  params.id);},
    merchantList:params => {return axios.post(`${base}/officeproductname/merchantList`, params)},
    add:params => {return axios.post(`${base}/officeproductname/add`, params)},
    listPage:params => {return axios.post(`${base}/officeproductname/listPage`, params)},
    detail:params => {return axios.post(`${base}/officeproductname/detail`, params)},
    update:params => {return axios.post(`${base}/officeproductname/update`, params)},
    list:params => {return axios.post(`${base}/officeproductname/list`, params)},
    officeproductdetail:params => {return axios.post(`${base}/officeproductname/officeproductdetail`, params)},
  },
  officeproductcomment:{
    list:params => {return axios.post(`${base}/officeproductcomment/List`, params)},
    delete: params =>{ return axios.post(`${base}/officeproductcomment/delete/`+params.id); },
  },
  canteen: {
    listCategory: params => {
      return axios.post(`${base}/merchantService/common/listCategoryByMerchantId`, params)
    },
    deleteCategory: params => {
      return axios.post(`${base}/merchantService/common/deleteServiceCategory`, params)
    },
    addCategory: params => {
      return axios.post(`${base}/merchantService/common/addServiceCategory`, params)
    },
    detailCategory: params => {
      return axios.post(`${base}/merchantService/common/getServiceCategoryById`, params)
    },
    editCategory: params => {
      return axios.post(`${base}/merchantService/common/updateServiceCategory`, params)
    },
    cateringfood: params => {
      return axios.post(`${base}/cateringfood/menu/listCateringfood`, params)
    },
    cateringfoodadd: params => {
      return axios.post(`${base}/cateringfood/cateringfood/add`, params)
    },
    cateringfooddelete: params => {
      return axios.post(`${base}/cateringfood/cateringfood/delete`, params)
    },
    cateringfooddetail: params => {
      return axios.post(`${base}/cateringfood/cateringfood/detail`, params)
    },
    cateringfoodupdata: params => {return axios.post(`${base}/cateringfood/cateringfood/updata`, params)},

    listByMerchant: params => {
      return axios.post(`${base}/restaurant/order/listByMerchant`, params)
    },
    orderTake: params => {
      return axios.post(`${base}/restaurant/order/receive`, params)
    },
    orderDetail: params => {
      return axios.post(`${base}/restaurant/order/detail`, params)
    },
    orderDispatch: params => {
      return axios.post(`${base}/restaurant/order/transport`, params)
    },
  },
  canteenFood:{
    listAll: params => {return axios.post(`${base}/cateringfood/listAll`, params)},
  },
  canteenMenu:{
    addSevenDay:params => {return axios.post(`${base}/canteenMenu/addSevenDay`, params)},
    list:params => {return axios.post(`${base}/canteenMenu/listMenu`, params)},
    add:params => {return axios.post(`${base}/canteenMenu/add`, params)},
    detail:params => {return axios.post(`${base}/canteenMenu/detail/`+ params.id)},
    edit:params => {return axios.post(`${base}/canteenMenu/update`, params)},
    delete:params => {return axios.post(`${base}/canteenMenu/menu/deleteMenuById`, params)},
  },
  canteenMenuNew:{
    list:params => {return axios.post(`${base}/canteenMenuNew/listMenu`, params)},
    add:params => {return axios.post(`${base}/canteenMenuNew/add`, params)},
    detail:params => {return axios.post(`${base}/canteenMenuNew/detail/`+ params.id)},
    edit:params => {return axios.post(`${base}/canteenMenuNew/update`, params)},
    delete:params => {return axios.post(`${base}/canteenMenuNew/menu/deleteMenuById`, params)},
    menuByDate:params => {return axios.post(`${base}/canteenMenuNew/menuByDate`, params)},
  },
  officeproductorder:{
    list:params => {return axios.post(`${base}/officeproductorder/list`, params)},
    allList:params => {return axios.post(`${base}/officeproductorder/allList`, params)},
    listByOrderId:params => {return axios.post(`${base}/officeproductorder/listByOrderId/`+  params.id);},
    orderDetailById:params => {return axios.post(`${base}/officeproductorder/orderDetailById`, params);},
    deleteOrderById: params =>{ return axios.post(`${base}/officeproductorder/deleteOrderById/`+  params.id); },
    handleAffirm: params =>{ return axios.post(`${base}/officeproductorder/handleAffirm`, params); },
    handleShipments: params =>{ return axios.post(`${base}/officeproductorder/handleShipments`, params); },
  },
  propertyProblem:{
    list:params => {return axios.post(`${base}/propertyProblem/list`, params)},
    add:params => {return axios.post(`${base}/propertyProblem/add`, params)},
    detail:params => {return axios.post(`${base}/propertyProblem/detail/`+ params.id)},
    update:params => {return axios.post(`${base}/propertyProblem/update`, params)},
    delete:params => {return axios.post(`${base}/propertyProblem/delete/`+ params.id)},
  },
  task:{
    list:params => {return axios.post(`${base}/task/list`, params)},
    add:params => {return axios.post(`${base}/task/add`, params)},
    detail:params => {return axios.post(`${base}/task/detail/`+ params.id)},
    preRepeat:params => {return axios.post(`${base}/task/preRepeat/`+ params.id)},
    listCaseByTask:params => {return axios.post(`${base}/task/listCaseByTask/`+ params.id)},
    update:params => {return axios.post(`${base}/task/update`, params)},
    delete:params => {return axios.post(`${base}/task/delete/`+ params.id)},
    detailList:params => {return axios.post(`${base}/task/result/`+ params.taskId+"/"+params.physicalCode)},
    stop:params => {return axios.post(`${base}/task/stop/`+ params.taskId+"/"+params.physicalCode)},
    export:params => {return axios.post(`${base}/task/export/`+ params.taskId+"/"+params.physicalCode)},
    mark:params => {return axios.post(`${base}/task/mark`, params)},
    detaill:params => {return axios.post(`${base}/task/detaill/`+ params.taskId+"/"+params.physicalCode)},
  },
  province:{
    provinceList:params => {return axios.post(`${base}/province/provinceAll`, params)},
    getCityAll:params => {return axios.post(`${base}/province/getCityAll/`+params.provinceCode);},
  },
  phonemodel:{
    phonemodelAll:params => {return axios.post(`${base}/phonemodel/phonemodelAll`, params)},
    list:params => {return axios.post(`${base}/phonemodel/list`, params)},
    add:params => {return axios.post(`${base}/phonemodel/add`, params)},
    detail:params => {return axios.post(`${base}/phonemodel/preUpdate/`+ params.id)},
    update:params => {return axios.post(`${base}/phonemodel/update`, params)},
    delete:params => {return axios.post(`${base}/phonemodel/delete/`+ params.id)},
  },
  city:{
    getCityAll:params => {return axios.post(`${base}/city/getCityAll/`+params.provinceCode);},
  },
  district:{
    getDistrictAll:params => {return axios.post(`${base}/district/getDistrictAll/`+params.cityCode);},
  },
  device:{
    list:params => {return axios.post(`${base}/device/list`, params)},
    listAll:params => {return axios.post(`${base}/device/listAll`, params)},
    listDeviceBrandAll:params => {return axios.post(`${base}/device/listDeviceBrandAll`, params)},
    add:params => {return axios.post(`${base}/device/add`, params)},
    details:params => {return axios.post(`${base}/device/details/`+ params.id)},
    config:params => {return axios.post(`${base}/device/config/`+ params.physicalCode+"/"+params.id)},
    update:params => {return axios.post(`${base}/device/update`, params)},
    delete:params => {return axios.post(`${base}/device/delete/`+ params.id)},
  },
  company:{
    list:params => {return axios.post(`${base}/company/list`, params)},
    companyAll:params => {return axios.post(`${base}/company/companyAll`, params)},
    add:params => {return axios.post(`${base}/company/add`, params)},
    details:params => {return axios.post(`${base}/company/details/`+ params.id)},
    update:params => {return axios.post(`${base}/company/update`, params)},
    delete:params => {return axios.post(`${base}/company/delete/`+ params.id)},
  },
  product:{
    list:params => {return axios.post(`${base}/product/list`, params)},
    productAll:params => {return axios.post(`${base}/product/productAll`, params)},
    add:params => {return axios.post(`${base}/product/add`, params)},
    details:params => {return axios.post(`${base}/product/details/`+ params.id)},
    listProductByCompanyId:params => {return axios.post(`${base}/product/listProductByCompanyId/`+ params.companyId)},
    update:params => {return axios.post(`${base}/product/update`, params)},
    delete:params => {return axios.post(`${base}/product/delete/`+ params.id)},
  },
  caseGroup:{
    list:params => {return axios.post(`${base}/caseGroup/list`, params)},
    add:params => {return axios.post(`${base}/caseGroup/add`, params)},
    assignDevice:params => {return axios.post(`${base}/caseGroup/assignDevice`, params)},
    listByProductId:params => {return axios.post(`${base}/caseGroup/listByProductId/`+params.productId)},
    details:params => {return axios.post(`${base}/caseGroup/details/`+ params.id)},
    update:params => {return axios.post(`${base}/caseGroup/update`, params)},
    delete:params => {return axios.post(`${base}/caseGroup/delete/`+ params.id)},
    preAssignCase:params => {return axios.post(`${base}/caseGroup/preAssignCase/`+ params.id)},
  },
  case:{
    list:params => {return axios.post(`${base}/case/list`, params)},
    add:params => {return axios.post(`${base}/case/add`, params)},
    details:params => {return axios.post(`${base}/case/details/`+ params.id)},
    update:params => {return axios.post(`${base}/case/update`, params)},
    deletes:params => {return axios.post(`${base}/case/deletes`, params)},
    listByCaseGroupIds:params => {return axios.post(`${base}/case/listByCaseGroupIds/`+params.caseGroupIds)},
    delete:params => {return axios.post(`${base}/case/delete/`+ params.id)},
  },
  norm:{
    list:params => {return axios.post(`${base}/norm/list`, params)},
    normAll:params => {return axios.post(`${base}/norm/normAll`, params)},
    add:params => {return axios.post(`${base}/norm/add`, params)},
    details:params => {return axios.post(`${base}/norm/details/`+ params.id)},
    update:params => {return axios.post(`${base}/norm/update`, params)},
    delete:params => {return axios.post(`${base}/norm/delete/`+ params.id)},
  },
  app:{
    list:params => {return axios.post(`${base}/app/list`, params)},
    add:params => {return axios.post(`${base}/app/add`, params)},
    details:params => {return axios.post(`${base}/app/details/`+ params.id)},
    listAppByProductId:params => {return axios.post(`${base}/app/listAppByProductId/`+ params.productId)},
    update:params => {return axios.post(`${base}/app/update`, params)},
    delete:params => {return axios.post(`${base}/app/delete/`+ params.id)},
  },
  productKey:{
    list:params => {return axios.post(`${base}/productKey/list`, params)},
    add:params => {return axios.post(`${base}/productKey/add`, params)},
    details:params => {return axios.post(`${base}/productKey/details/`+ params.id)},
    update:params => {return axios.post(`${base}/productKey/update`, params)},
    delete:params => {return axios.post(`${base}/productKey/delete/`+ params.id)},
  },
  keyword:{
    list:params => {return axios.post(`${base}/keyword/list`, params)},
    add:params => {return axios.post(`${base}/keyword/add`, params)},
    details:params => {return axios.post(`${base}/keyword/details/`+ params.id)},
    update:params => {return axios.post(`${base}/keyword/update`, params)},
    delete:params => {return axios.post(`${base}/keyword/delete/`+ params.id)},
  },
  brand:{
    list:params => {return axios.post(`${base}/brand/list`, params)},
    listAll:params => {return axios.post(`${base}/brand/listAll`, params)},
    add:params => {return axios.post(`${base}/brand/add`, params)},
    details:params => {return axios.post(`${base}/brand/preUpdate/`+ params.id)},
    update:params => {return axios.post(`${base}/brand/update`, params)},
    delete:params => {return axios.post(`${base}/brand/delete/`+ params.id)},
  },
  script:{
    list:params => {return axios.post(`${base}/script/list`, params)},
    getScript:params => {return axios.post(`${base}/script/getScript/`+ params.id)},
    delete:params => {return axios.post(`${base}/script/delete/`+ params.id)},
  },

  functionGroup:{
    list:params => {return axios.post(`${base}/functionGroup/list`, params)},
  },
  dpi:{
    list:params => {return axios.post(`${base}/dpi/list`, params)},
    listAll:params => {return axios.post(`${base}/dpi/listAll`, params)},
    add:params => {return axios.post(`${base}/dpi/add`, params)},
    details:params => {return axios.post(`${base}/dpi/preUpdate/`+ params.id)},
    update:params => {return axios.post(`${base}/dpi/update`, params)},
    delete:params => {return axios.post(`${base}/dpi/delete/`+ params.id)},
  },
  os:{
    list:params => {return axios.post(`${base}/os/list`, params)},
    listAll:params => {return axios.post(`${base}/os/listAll`, params)},
    add:params => {return axios.post(`${base}/os/add`, params)},
    details:params => {return axios.post(`${base}/os/preUpdate/`+ params.id)},
    update:params => {return axios.post(`${base}/os/update`, params)},
    delete:params => {return axios.post(`${base}/os/delete/`+ params.id)},
  },
  deviceGroup:{
    list:params => {return axios.post(`${base}/deviceGroup/list`, params)},
    listAll:params => {return axios.post(`${base}/deviceGroup/listAll`, params)},
    add:params => {return axios.post(`${base}/deviceGroup/add`, params)},
    details:params => {return axios.post(`${base}/deviceGroup/details/`+ params.id)},
    update:params => {return axios.post(`${base}/deviceGroup/update`, params)},
    delete:params => {return axios.post(`${base}/deviceGroup/delete/`+ params.id)},
    preAssignDevice:params => {return axios.post(`${base}/deviceGroup/preAssignDevice/`+ params.id)},
    assignDevice:params => {return axios.post(`${base}/deviceGroup/assignDevice`, params)},
  },
  result:{
    list:params => {return axios.post(`${base}/result/list`, params)},
    allFail:params => {return axios.post(`${base}/result/allFail`, params)},
    details:params => {return axios.post(`${base}/result/detail/`+ params.id)},
    update:params => {return axios.post(`${base}/result/mark`, params)},
  },

  failType:{
    allFailType:params => {return axios.post(`${base}/failType/listAll`, params)},
  },
  deviceKeyword:{
    add:params => {return axios.post(`${base}/deviceKeyword/add`, params)},
    delete:params => {return axios.post(`${base}/deviceKeyword/delete/`+ params.id)},
  },

  remoteRecord:{
    list:params => {return axios.post(`${base}/remoteRecord/list`, params)},
  },
  remoteDebug:{
    list:params => {return axios.post(`${base}/remoteDebug/list`, params)},
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

  ordinaryVip:{
    list:params => {return axios.post(`${base}/userOrdinaryHistory/listVipHistory`, params)},
    listVip:params => {return axios.post(`${base}/userAccount/listUserOrdinary`, params)},
    details:params => {return axios.post(`${base}/user/userDetail/`+params.id)},
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
  }

}

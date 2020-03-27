import Vue from 'vue';
import store from '../store'
const power = Vue.directive('power', {
  inserted: function (el, binding) {
    // 获取页面按钮权限
    let _btnsArr = store.getters.roleBtns;
    if (!Vue.prototype.$_has(_btnsArr,binding.value)) {
      if(el.parentNode){
        el.parentNode.removeChild(el);
      }
    }
  }
});
// 权限检查方法
Vue.prototype.$_has = function (_btnsArr,currentValue) {
  let isExist = false;
  console.log("==========================")
    console.log(store)
  if(store.getters.userInfo.mobile =="administrator"){
    //如果是管理员
    return true;
  }
  console.log(isExist)
  for(var i=0; i<_btnsArr.length; i++){
    if(_btnsArr[i].id == currentValue){
      isExist = true;
      break;
    }
  }
  return isExist;
};

export {power};

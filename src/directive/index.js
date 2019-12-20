import Vue from 'vue';
import store from '../store'
const power = Vue.directive('power', {
  inserted: function(el, binding, vnode){
		//el.parentNode.removeChild(el);
		// console.log("value------");
		// console.log(binding.value);
		// console.log(vnode);
		// console.log("userInfo------");
		if(store.getters.userInfo.adminFlag){
			//如果是管理员
			return;
		}
		var _btnsArr = store.getters.roleBtns;
		var isShow = false;
		for(var i=0; i<_btnsArr.length; i++){
			if(_btnsArr[i].id == binding.value){
				isShow = true;
			}
		}
		if(!isShow){
			el.parentNode.removeChild(el);
		}
	}
});

export {power};

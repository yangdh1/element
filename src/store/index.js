import Vue from 'vue';
import Vuex from 'vuex';
import user from './moudle/user'
import pageCache from './moudle/pageCache'
import getters from './getters'
Vue.use(Vuex);

//全局共享变量
const store = new Vuex.Store({
	modules: {
		user,
		pageCache
	},
	getters
});

export default store;
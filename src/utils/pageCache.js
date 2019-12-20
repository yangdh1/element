import store from '../store'

var pageCache  = {
	deepCopy(formPars){
		//保存当前查询过滤条件
		return JSON.parse(JSON.stringify(formPars));
	},
	getPars(path){
		if(store.state.pageCache.listPagePars.has(path)) {
			return store.state.pageCache.listPagePars.get(path);
		}
		return {};
	},
	savePars(path, pars){
		store.dispatch('saveListPagePars',{path:path, pars:pars});
	}
};

export default pageCache;
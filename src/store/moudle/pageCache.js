const pageCache = {
	state: {
		listPagePars: new Map()
	},
	mutations: {
		SAVE_LIST_PAGE_PARS: (state,{ path,pars }) => {
			state.listPagePars.set(path,pars);
		}
	},
	actions: {
		saveListPagePars: ({ commit },{path,pars}) => {

			commit('SAVE_LIST_PAGE_PARS',{ path,pars });

		}
	}
};

export default pageCache;
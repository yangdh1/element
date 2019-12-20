const getters = {
	listPagePars: state =>state.pageCache.listPagePars,		//页面查询缓存
	token: state => state.user.token,		//tokens
	syncMenus: state => state.user.syncMenus,		//动态菜单
	allMenus: state => state.user.allMenus,		//全部菜单
	userInfo: state => state.user.info,		//用户信息
	roleBtns: state => state.user.roleButtons		//用户按钮权限信息
};
export default getters

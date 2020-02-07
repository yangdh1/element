import router from './router'
import store from './store'
import { Message } from 'element-ui';
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from './utils/auth' // 验权
// import { commonMenus } from './router'


/**
 * 获取请求sign参数
 * @returns {{}}
 */
function getSignRequestStr(){
	var idx = window.location.hash.indexOf("?")
	var arr = window.location.hash.substr(idx).replace(/^\?/,'').split("&");

	for(var i=0; i<arr.length; i++){
		if(i==0){
			return arr[i].slice(5);
		}
	}
	return '';
}
// register global progress.
const whiteList = ['/login', '/about'];// 不重定向白名单
router.beforeEach((to, from, next) => {
	/**
	 * 1、首先判断是否cookie中是否存在token值
	 * 2、如果存在则根据token值获取用户信息和权限信息，如果不存在则判断是否白名单路由中，不在路由范围内则跳转到登录页面
	 */

	NProgress.start();
	// Do something before request is sent
	//http://localhost:8080/#/detailOnly/8?sign=xxxxxxxxxxx 细节单页
	if(window.location.href.indexOf('detailOnly')>0){
		//console.log(getSignRequestStr());
		var loginForm =  {
			//sign:getSignRequestStr(),
			userName:'linkdetail',
			password: 'g6s8m3t7s'
		};
		//alert(getSignRequestStr());
		store.dispatch('LoginByUsername', loginForm).then(() => {
			next();
		},(err)=>{
			alert(err);
			alert("用户认证失败")
		});

	}else{
		// console.log(getToken());
		if (getToken()) { // 判断是否有 token
			if (to.path === '/login') {
				next();
			} else {
				if (store.getters.syncMenus.length === 0) { // 判断当前用户是否已拉取完 user_info 信息
					store.dispatch('GetUserInfo').then(res => { // 拉取 info
					  if (store.getters.syncMenus.length !== 0) {
              router.addRoutes(store.getters.syncMenus); // 动态添加可访问路由表
              next({ ...to }); // hack 方法 确保 addRoutes 已完成
            }else {
              Message({
                message: '无权限,请联系管理员!',
                type: 'error'
              });
              next('/login');
            }
					}).catch(err => {
					  console.log(err)
						if(err == 'token校验失败'){
							router.push({ path: '/login' });
						}
						//console.log(err);
					});
				} else {
					// router.addRoutes(store.getters.menus);
					next(); //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入 404 页面
				}
			}
		} else {
			if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
				next();
			} else {
				next('/login'); // 否则全部重定向到登录页
			}
		}
	}




});

router.afterEach(() => {
	NProgress.done(); // 结束Progress
	//死办法 暂时处理底部问题 很郁闷的底部。
	try{
		setTimeout(()=>{
			if(!document.getElementByClassName){
				document.getElementByClassName = function(cls){
					var ret = [];
					var els = document.getElementsByTagName('*');

					for(var i=0; i<els.length; i++){
						if(els[i].className === cls
							|| els[i].className.indexOf(cls)>=0
							|| els[i].className.indexOf(cls + " ")
							|| els[i].className.indexOf(" "+cls + " ")
							|| els[i].className.indexOf(" "+cls))
						{
							ret.push(els[i]);
						}
					}
					return ret;
				};
			}
			if(document.getElementsByClassName('sideBar').length>0){
				var a = document.getElementsByClassName('sideBar')[0].offsetHeight;
				var b = document.getElementsByClassName('app-container')[0].offsetHeight;
				var c = window.innerHeight - document.getElementsByClassName('navbar')[0].offsetHeight;
				document.getElementsByClassName('main-container')[0].style.minHeight=  Math.max(a,b,c)+'px';
			}
		},0);
	}catch(e){

	}
});

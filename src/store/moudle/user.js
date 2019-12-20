// import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '../../utils/auth'
import API from '../../api';
import axios from 'axios';
import { commonMenus, asyncMenus } from '../../router'


//从原始的动态菜单中剔除相应的菜单，因为原型链，所以这也会改变asyncMenus原始数据，请额外注意
function getNewSyncMenus(myArr,adminFlag){
	let MyMenu = [];		//重新整理的菜单

	myArr.map((item)=>{
		asyncMenus.some(menu => {
		  if (adminFlag){
        MyMenu = asyncMenus;
      } else {
        if(menu.menuId == item.pid) {
          MyMenu.push(menu);
          let cidArr = item.cid.split('€');
          if(menu.children && menu.children.length){
            let newChildrenMenu = menu.children.filter((item)=>{
              if(item.hidden){
                return true;
              }else{
                return cidArr.some(cItem=>{
                  return (cItem == item.menuId && !item.hidden)
                })
              }
            });
            menu.children = newChildrenMenu;
          }
        }
      }

		});
	});
	return MyMenu;
}

//整理从服务端来的数据数据
function arrangeDate(roleResources,adminFlag){
	//console.log(roleResources);
	//将服务端数据整理
	var obj = {};
	for(var i=0; i<roleResources.length; i++) {
		var _id = roleResources[i].id;
		if(_id.length == 3){
			obj[_id] = '';
		}
	}
	for(var i=0; i<roleResources.length; i++) {
		var _id = roleResources[i].id;
		if(_id.length == 6){
			if(obj[_id] == ''){
				obj[_id.substring(0,3)] =_id;
			}else{
				obj[_id.substring(0,3)] += '€'+ _id;
			}
		}
	}
	//将服务端数据整理成前端需要的格式
	var myArr = [];
	for(let key in obj){
		var _obj = {};
		_obj.pid = key;
		_obj.cid = obj[key];
		myArr.push(_obj);
	}
	//整理后数据
	// let x = [
	// 	{pid:'100', cid: '100001€100002'},
	// 	{pid:'101', cid: '101001'}
	// ];
	return getNewSyncMenus(myArr,adminFlag);
	// console.log(myArr);
}


const user = {
	state: {
		info: null,			//用户信息
		roleButtons: [],	//按钮菜单
		syncMenus: [],		//动态菜单
		allMenus: [],		//全部菜单
		token: '',			//token值
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token;
			axios.defaults.headers.common['token'] = token;		//请求头中加上Token值
		},
		SET_SYNC_MENUS: (state, syncMenus) => {
			state.syncMenus = syncMenus;
		},
		SET_ALL_MENUS: (state, allMenus) => {
			state.allMenus = allMenus;
		},
		SET_INFO: (state, info) => {
			state.info = info;
		},
		SET_ROLE_BTN: (state, roleButtons) => {
			state.roleButtons = roleButtons;
		}
	},
	actions: {
		// 用户名登录
		LoginByUsername({ commit }, userInfo) {
			// const userName = userInfo.userName.trim()
			return new Promise((resolve, reject) => {
				API.user.login(userInfo).then(res=>{
					if(null != res){
            setToken(res.token);		//cookie 设置token
            commit('SET_TOKEN', res.token); //store 保存Token值
            commit('SET_INFO', res.info); //store 保存用户信息
          }else {

          }
					resolve();
				},(error)=>{
					reject(error);
				});
			})
		},

		// 获取用户信息
		GetUserInfo({ commit, state }) {
			return new Promise((resolve, reject) => {
				API.user.loginByToken(getToken()).then(res=>{
					let debug = false;		// 是否测试菜单情况下
					if(debug){
						commit('SET_SYNC_MENUS', asyncMenus);		//测试使用 实际需要获取用户信息后赋值
						commit('SET_ALL_MENUS', [...commonMenus, ...asyncMenus]  );		//实际需要获取用户信息后赋值
					}else{
					  console.log("res.roleResources");
					  console.log(res.roleResources);
						let MyMenu = arrangeDate(res.roleResources,res.userInfo.adminFlag);
						commit('SET_SYNC_MENUS', MyMenu);
						commit('SET_ALL_MENUS', [...commonMenus, ...MyMenu]  );
					}
					commit('SET_TOKEN', getToken()); //store 保存Token值
					commit('SET_INFO', res.userInfo); //store 保存用户信息
					commit('SET_ROLE_BTN', res.roleButtons); //store 保存按钮权限信息
					resolve();
				},(error)=>{
					console.log(error);
					reject(error);
				});

			})
		},
		// 注销
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
        API.user.logout(getToken()).then(res => {
          //严格意义上需要http请求告诉服务器注销
          commit('SET_TOKEN', '');
          commit('SET_MENUS', []);
          commit('SET_INFO', null);
          removeToken();
          resolve();
        },(error)=>{
          console.log(error);
          reject(error);
        });
			})
		}
	}
}

export default user

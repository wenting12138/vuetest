export default{
	
	state:{
		// 标记 用户是否登录
		isLogin: false,
		
		menuArr: [
			{
				name: "首页",
				path: "/main"
				
			}
		]
	},
	
	mutations:{
		changeLoginStatus(state, loginStatus){
			state.isLogin = loginStatus;
		},
		
		addMenuArr(state, menu){
			// 如果 这个 菜单数组 没有 才会 添加
			let arr = state.menuArr;
			if(menu.name != "首页"){
				
				let res = arr.findIndex(item => item.name == menu.name);
				res == -1 ? arr.push(menu): ''
			}
		},
		
		deleteCurMenu(state, menu){
			
			// 删除 当前 
			// let res = state.menuArr.findIndex(item => item.name === menu.name);
			// console.log(res + ": " + menu.name);
			// state.menuArr.slice(res-1, 1);
			// console.log(state.menuArr);
			let arr = [];
			for(let i = 0; i < state.menuArr.length; i ++){
				if(state.menuArr[i].name !== menu.name){
					arr.push(state.menuArr[i]);
				}
			}
			
			state.menuArr = arr;

		}
	},
	
	actions:{
		
	}
	
}
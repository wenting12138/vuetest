import request from "@/util/request.js"
// import Qs from "qs"

const baseUrl = "http://localhost:9090";
const getUserListUrl = "/get/page/users/list";
const getUserUrl = "/get/user/byid";
const updateUserByIdUrl = "/save/user";
const loginUrl = "/login";

// 分页 获取 用户列表
async function getUserListApi(pageNum, pageSize){
	let url = baseUrl + getUserListUrl;
	let parms = {
		pageNum: pageNum,
		pageSize: pageSize,
	}
	// let params = new URLSearchParams();
	// params.append("pageNum", pageNum);
	// params.append("pageSize", pageSize);
	return await request.post(url, parms);
}

async function getUserListBySearchwordApi(pageNum, pageSize, searchword){
	let url = baseUrl + getUserListUrl;
	let parms = {
		pageNum: pageNum,
		pageSize: pageSize,
		searchword: searchword,
	};
	// let params = new URLSearchParams();
	// params.append("pageNum", pageNum);
	// params.append("pageSize", pageSize);
	return await request.post(url, parms);
}

async function getUserByIdApi(id){
	let url = baseUrl + getUserUrl + "?id=" + id;
	
	return await request.get(url);
}

// 修改user
async function updateUserByIdApi(user){
	let url = baseUrl + updateUserByIdUrl;
	// let params = {
	// 	user,
	// }
	return await request.post(url, user);
}
// login success: sreturnVal:  token
async function loginApi(username, password){
	let url = baseUrl + loginUrl;
	let params = {
		username,password
	}
	return await request.post(url, params);
}

export default {
	getUserListApi,
	getUserListBySearchwordApi,
	getUserByIdApi,
	updateUserByIdApi,
	loginApi,
}
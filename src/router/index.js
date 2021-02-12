import Vue from "vue";
import VueRouter from "vue-router";

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		redirect: "/login"
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login")
	},
	{
		path:"/home",
		name: "home",
		component: () => import("@/views/home"),
		children:[
			{
				path: "/main",
				name: "main",
				component: () => import("@/views/main")
			},
			{
				path: "/user",
				name: "user",
				component: () => import("@/views/user/user")
			},
			{
				path: "/permission",
				name: "permission",
				component: () => import("@/views/user/permission")
			},
			{
				path: "/role",
				name: "role",
				component: () => import("@/views/user/role")
			},
			{
				path: "/video",
				name: "video",
				component: () => import("@/views/service/video")
			},
			{
				path: "/page1",
				name: "page1",
				component: () => import("@/views/service/page1")
			},
			{
				path: "/usercenter",
				name: "usercenter",
				component: () => import("@/views/user/usercenter")
			}
		]
	}
];

const router = new VueRouter({
  routes
});

export default router;

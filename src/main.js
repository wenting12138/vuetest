import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import NProgress from  "NProgress";
import ElementUI from 'element-ui';
import { Message } from 'element-ui';


// css
import "nprogress/nprogress.css";
import "./assets/css/reset.css";
import "element-ui/lib/theme-chalk/index.css";

Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }


// 进度条配置项这样写
NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
 });
 // 路由跳转前钩子函数中 - 执行进度条开始加载
 router.beforeEach((to, from, next) => {
	 const nextRoute = ['user', 'video', 'home', 'permission', 'role', 'page1'];
	 NProgress.start();
	 // 说明 要 进入 的 路由 需要 登录 才能 访问
	 let token = sessionStorage.getItem("token");
	 console.log("token: " + token);
	 if(nextRoute.indexOf(to.name) >= 0){
		 // 如果 未登录
		 if(token == null || token == "") {
			 next("/login");
		 }
	 }
	 
	 console.log("to.name: " + to.name);
	 if(to.name == 'login'){
		 // 判断 是否 登录
		 if(token != null && token != ""){
			 next("/home");
		 }
	 }
	 next();
 });
 // 路由跳转后钩子函数中 - 执行进度条加载结束
 router.afterEach(() => {
  NProgress.done();
 });


Vue.use(ElementUI);
Vue.prototype.$message = Message;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

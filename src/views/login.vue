<template>
	<div class="login">
		
		  <div class="inputbox">
			  <el-input
			    placeholder="请输入账号"
			    suffix-icon="el-icon-user"
			    v-model="username">
			  </el-input>
			  <span style="color: red;">{{userMsg}}</span>
		  </div>
		  
		  <div class="inputbox">
			  <el-input
			    placeholder="请输入密码"
			    suffix-icon="el-icon-lock"
			    v-model="password">
			  </el-input>
			  <span style="color: red;">{{passMsg}}</span>
		  </div>
		  <el-button type="primary" class="left" @click="login">登录</el-button>
		  <el-button type="primary" class="right" @click="reset">重置</el-button>
	</div>
</template>

<script>
	import userApi from "@/api/userApi.js"
	export default {
		data(){
			return {
				username: "1455184755",
				password: "18832036905",
				userMsg: "",
				passMsg: "",
			}
		},
		methods:{
			reset(){
				this.username = "";
				this.password = "";
			},
			login(){
				this.clearMsg();
				if(this.invalid()){
					return;
				}
				
				userApi.loginApi(this.username, this.password).then(resp => {
					if(resp.data.status === 200){
						sessionStorage.setItem("token", resp.data.data);
						this.$store.commit('changeLoginStatus', true);
						this.$router.push({path: "/home"});
						this.$message({
							message: resp.data.message,
							type: 'success',
						})
					}else{
						this.$router.push({path: "/login"});
					}
				})
				
			},
			clearMsg(){
				this.userMsg = "";
				this.passMsg = "";
			},
			invalid(){
				if(this.username == "" || this.username.length < 6){
					this.userMsg = "账号不能为空并且长度大于5";
					return false;
				}
				if(this.password == "" || this.password.length < 6){
					this.passMsg = "密码不能为空并且长度大于5";
					return false;
				}
			}
		},
		computed:{
			
		},
		watch:{
		}
	}
</script>

<style>
	.login{
		width: 400px;
		height: 200px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 250px auto auto auto; 
		
	}
	.left{
		float: left;
	}
	.right{
		float: right;
	}
	.inputbox{
		margin-bottom: 20px;
	}
</style>

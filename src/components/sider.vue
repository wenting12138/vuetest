<template>
	<el-container>
		<el-menu default-active="1-2" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<h3 style="text-align: center; color: white; margin-bottom: 10px; margin-top: 10px; box-sizing: border-box;">管理系统</h3>
		  <el-submenu index="1-2">
		    <template slot="title">
		      <i class="el-icon-user"></i>
		      <span slot="title">用户管理</span>
		    </template>
		    <el-menu-item-group>
		      <el-menu-item index="1-1" @click="checkMenu('/permission', '权限管理')">
				  <i class="el-icon-lock"></i>
				  <span>权限管理</span>
			  </el-menu-item>
			  <el-menu-item index="1-2" @click="checkMenu('/user', '账号管理')">
			  	<i class="el-icon-lock"></i>
				<span>账号管理</span>
			  </el-menu-item>
			  <el-menu-item index="1-3" @click="checkMenu('/role', '角色管理')">
			  	<i class="el-icon-lock"></i>
			  	<span>角色管理</span>
			  </el-menu-item>
		    </el-menu-item-group>
		  </el-submenu>
		  
		  <el-menu-item index="2" @click="checkMenu('/video', '视频管理')">
		      <i class="el-icon-video"></i>
		      <span slot="title">视频管理</span>
		  </el-menu-item>
		  
		  <el-submenu index="3">
		    <template slot="title">
		      <i class="el-icon-setting"></i>
		      <span slot="title">其他管理</span>
		    </template>
			<el-menu-item-group >
			  <el-menu-item index="3-1" @click="checkMenu('/page1', '其他管理')">
				  <i class="el-icon-setting"></i>
				  <span>page1</span>
			  </el-menu-item>
			</el-menu-item-group>
		  </el-submenu>
		</el-menu>
	</el-container>
</template>

<script>
	export default {
	    data() {
	      return {
	      };
	    },
	    methods: {
			checkMenu(path, name){
				// 添加到 vuex
				let obj = {
					path, name
				}
				this.$store.commit("addMenuArr", obj);
				this.$router.push({path: path});
			}
	    }
	  }	  
</script>

<style scoped="scoped">
	
</style>

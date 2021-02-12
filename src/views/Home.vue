<template>
	<el-container>
	  <el-aside width="210px" height="100vh">
		  <!-- 侧边 栏 -->
		  <my-sider class="sider"></my-sider>
	  </el-aside>
	  <el-container>
	    <el-header>
			<!-- 头部 -->
			<my-header class="header"></my-header>
		</el-header>
	    <el-main>
			<!-- 内容部分 -->
			<router-view></router-view>
		</el-main>
	  </el-container>
	</el-container>
</template>

<script>
	import mySider from "@/components/sider.vue";
	import myHeader from "@/components/header.vue";
	export default{
		components:{
			mySider,
			myHeader,
		},
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	  .el-main{
		  padding:unset;
	  }
	  .el-header{
		  padding: unset;
	  }
	  .el-container{
		  height: 100vh;
	  }
	  .el-menu{
		  margin: unset;
		  padding: unset;
	  }
</style>

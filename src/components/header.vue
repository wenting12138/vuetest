<template>
	  <header>
	      <div class="l-content">
	        <el-tag :key="tag.name" size="small" v-for="tag in menuArr" 
				  :closable="tag.name !== '首页'"
	              :disable-transitions="false"
				  style="margin-left: 5px;"
	              @close="handleClose(tag)"
	              @click="checkMenu(tag)"
				  
	              :effect="$route.name===tag.path.substring(1) ? 'dark': 'plain'"
	            >
	              {{ tag.name }}
	        </el-tag>
	      </div>
	      <div class="r-content">
	        <el-dropdown trigger="click">
	            <span class="el-dropdown-link my-dropdown-link">
	                <el-avatar :size="userImgSize" :src="userImg"></el-avatar>
	            </span>
	            <el-dropdown-menu slot="dropdown">
	                <el-dropdown-item @click.native="toUserCenter">个人中心</el-dropdown-item>
	                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
	            </el-dropdown-menu>
	        </el-dropdown>
	      </div>
	  </header>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default{
		data(){
			return {
				userImg: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
				userImgSize: "large",
			}
		},
		methods:{
			logout(){
				sessionStorage.removeItem("userid");
				sessionStorage.removeItem("token");
				this.$store.commit('changeLoginStatus', false);
				this.$router.push({name: 'login'});
			},
			checkMenu(item){
				// 添加到 vuex
				this.$store.commit("addMenuArr", item);
				this.$router.push({path: item.path});
			},
			handleClose(item){
				console.log(this.$route.name);
				this.close(item);
			},
			...mapMutations({
				close: 'deleteCurMenu'
			}),
			toUserCenter(){
				this.$router.push({name:'usercenter'});
			}
		},
		computed:{
			menuArr(){
				return this.$store.state.table.menuArr;
			}
		}
	}
</script>

<style lang="scss" scoped>
header{
    display: flex;
    align-items: center;
    height: 100%;
    justify-content:space-between;
}
.my-dropdown-link{
    cursor: pointer;
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px
    }
}
</style>

<style lang="scss">
.el-breadcrumb__item .el-breadcrumb__inner{
    color: #666;
    font-weight: normal
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner{
    color: #aaaaff;
}
</style>

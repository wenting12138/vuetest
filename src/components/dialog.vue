<template>
	<el-dialog title="用户编辑" :visible.sync="isVisible" width="400px">
	  <el-form :model="form" style="padding: 10px;">
	    <el-form-item label="用户昵称" :label-width="formLabelWidth">
	      <el-input v-model="form.username" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="手机号" :label-width="formLabelWidth">
			<el-input v-model="form.phone" autocomplete="off"></el-input>
	    </el-form-item>
		<el-form-item label="邮箱" :label-width="formLabelWidth">
			<el-input v-model="form.email" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="地址" :label-width="formLabelWidth">
			<el-input v-model="form.address" autocomplete="off"></el-input>
		</el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="reset">重置</el-button>
	    <el-button type="primary" @click="saveUser">保存</el-button>
	  </div>
	</el-dialog>
</template> 

<script>
	import userApi from "@/api/userApi.js"
	export default{
		computed:{
			isVisible: {
				get(){
					return this.dialogFormVisible;
				},
				set(val){
					console.log(val);
					// 在点击dialog的 x按钮时， 改变 父组件的值  使窗口 关闭 
					this.$emit("dialogIsShow", false, false);
					this.visible = val;
					
				}
			}
		},
		props:{
			dialogFormVisible:{
				type: Boolean,
				default: false
			},
			sonId:{
				type: Number,
				default: 0,
			}
		},
		data(){
			return {
				form: {
				  username: '',
				  phone: '',
				  address: '',
				  email: '',
				},
				formLabelWidth: '80px',
			}
		},
		methods:{
			reset(){
				this.form = {};
			},
			saveUser(){
				userApi.updateUserByIdApi(this.form).then(resp => {
					console.log(resp.data);
					if(resp.data.status === 200) {
						// 修改成功
						
						// 关闭 弹出框
						this.$emit("dialogIsShow", false, false);
						// 重新刷新 页面
						this.$emit("getUserList", 0, 5);
						// 显示 message
						this.$message({
							type: 'success',
							message: resp.data.message,
						});
					}else{
						// 修改 失败
						// 显示 message
						this.$message({
							type: 'error',
							message: resp.data.message,
						});
					}
				})
				
				
			},
		},
		mounted() {
			
			console.log("sonid: " + this.sonId);
			userApi.getUserByIdApi(this.sonId).then(resp => {
				console.log(resp.data);
				this.form = resp.data.data;
			})
			
		}
		
	}
</script>

<style>
	.el-dialog__body{
		padding: 10px;
	}
</style>

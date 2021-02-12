<template>
	<div>
		<el-col :span="6">
			<el-input
			    placeholder="请输入搜索内容"
			    prefix-icon="el-icon-search"
				size="medium"
				style="margin-left: 10px;"
			    v-model="search">
			</el-input>
		</el-col>
		<el-col :span="2">
			<el-button type="primary" @click="searchUserList" style="margin-left: 10px;">搜索</el-button>
		</el-col>
		<el-table
			v-loading="loading"
		    :data="tableData"
		    style="width: 100%; margin-bottom: 10px;">
			  <el-table-column
			    label="id"
			    width="180">
			    <template slot-scope="scope">
			      <el-tag size="medium">{{ scope.row.id }}</el-tag>
			    </template>
			  </el-table-column>
		    <el-table-column
		      label="日期"
		      width="180">
		      <template slot-scope="scope">
		        <i class="el-icon-time"></i>
		        <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="姓名"
		      width="180">
		      <template slot-scope="scope">
				  <span>{{ scope.row.username}}</span>
		      </template>
		    </el-table-column>
			  <el-table-column
			    label="邮箱"
			    width="180">
			    <template slot-scope="scope">
					<span>{{ scope.row.email}}</span>
			    </template>
			  </el-table-column>
			  <el-table-column
			    label="地址"
			    width="180">
			    <template slot-scope="scope">
					<span>{{ scope.row.address}}</span>
			    </template>
			  </el-table-column>
			  <el-table-column
			    label="手机号"
			    width="180">
			    <template slot-scope="scope">
					<span>{{ scope.row.phone}}</span>
			    </template>
			  </el-table-column>
		    <el-table-column label="操作">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		<el-pagination
		  background
		  layout="prev, pager, next"
		  @current-change="currentChange"
		  :total="total">
		</el-pagination>
		
		<el-dialog
		  title="是否删除该用户"
		  :visible.sync="centerDialogVisible"
		  width="30%"
		  center>
		  <span style="text-align: center;">{{usermessage}}</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="centerDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="deleteUser">确 定</el-button>
		  </span>
		</el-dialog>
		
		<my-dialog 
			v-if="isShow" 
			@dialogIsShow="dialogIsShow"
			:dialogFormVisible="dialogFormVisible"
			:sonId="sonId"
			@getUserList="getUserList"
		>
		</my-dialog>
			
	</div>
	
</template>
  
  <script>
	import userApi from "@/api/userApi.js"  
	import myDialog from "@/components/dialog.vue"
    export default {
		components: {
			myDialog,
		},
      data() {
        return {
          tableData: [],
		  isShow: false,
		  pageSize: 5,
		  pageNum: 0,
		  search: "",
		  total: 0,
		  dialogFormVisible: false,
		  sonId: 0,
		  centerDialogVisible: false,
		  usermessage: '',
		  deleteUserId: 0,
		  loading: true, 
        }
      }, 
      methods: {
		common(resp){
			if(resp.data.status === 200){
				this.$message({
					message: resp.data.message,
					type: "success",
				});
				this.total = resp.data.data.total;
				this.tableData = resp.data.data.list;
				for(let i = 0; i < this.tableData.length; i ++) {
					let timestr = new Date(this.tableData[i].createTime).Format("yyyy-MM-dd");
					this.tableData[i].createTime = timestr;
				}
				console.log(this.tableData);
			}else{ 
				this.$message({
					message: resp.data.message,
					type: "error",
				});
			}
		},  
		searchUserList(){
			let searchWord = this.search;
			if(searchWord == null || searchWord == "") {
				this.$message({
					message: "搜索不能为空",
					type: "warning",
				});
				return;
			}
			 
			userApi.getUserListBySearchwordApi(this.pageNum, this.pageSize, searchWord).then(resp => {
				this.common(resp);
			})
		},
		dialogIsShow(flag, visible){
			// 打开 弹出框
			console.log("dialogIsShow()");
			this.dialogFormVisible = visible;
			this.isShow = flag;
			
		},
		// 修改 user
        handleEdit(index, row) {
			this.sonId = row.id;
			this.dialogIsShow(true, true);
			console.log(index, row);
        },
		// 删除 user
        handleDelete(index, row) {
			this.centerDialogVisible = true;
			this.usermessage = row.username;
			this.deleteUserId = row.id;
        },
		deleteUser(){
			let arr = this.tableData;
			
			let newArr = [];
			for(let i = 0; i < arr.length; i ++){
				if(arr[i].id != this.deleteUserId) {
					newArr.push(arr[i]);
				}
			}
			this.tableData = newArr;
			this.deleteUserId = 0;
			this.centerDialogVisible = false;
			this.usermessage = '';
			this.$message({
				type: 'success',
				message: "删除成功",
			})
		},
		// 获取 userList  渲染
		getUserList(pageNum, pageSize){
			userApi.getUserListApi(pageNum, pageSize).then(resp => {
				this.common(resp);
				this.loading = false;
			})
		},
		// 修改 pageNum  刷新 
		currentChange(val){
			console.log("total" + this.total);
			this.getUserList(val, this.pageSize);
		}
      }, 
	  mounted(){
		  this.getUserList(this.pageNum, this.pageSize);
		  this.loading = false;
	  }
    }
  </script>

<style>
</style>

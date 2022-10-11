<template>
  <div id="app">
    <div class="todo-container">
        <div class="todo-wrap">
            <MyHeader @addTask='addTask'/>
            <MyList :task="task" />
            <MyFooter :task="task" @selectAllTask="selectAllTask" @deleteCheckAll="deleteCheckAll"/>
			<div class="netButton">
				<button class="btn btn-edit" @click="userSendData">发送</button>
				<button class="btn btn-edit" @click="userGetData">同步数据</button>
			</div>
			
        </div>
    </div>
  </div>
</template>

<script>
import { sendData,getData } from './server/api'
import MyFooter from './components/MyFooter.vue'
import MyHeader from './components/MyHeader.vue'
import MyList from './components/MyList.vue'
export default {
  components: { MyHeader, MyList, MyFooter },
    name:'App',
	data(){
		return {
			task:[]
		}
	},
	methods:{
		addTask(item){
			this.task.unshift(item)
			console.log(this.task)
		},
		changeCheck(id){
			this.task.forEach((taskitem)=>{
				if(taskitem.id===id){
					taskitem.done = !taskitem.done
				}
			})
		},
		deleteCheck(id){
			this.task = this.task.filter((taskitem)=>{
				return taskitem.id !== id
			})
		},
		selectAllTask(checkboxValue){
			if(checkboxValue){
				this.task.forEach((taskitem)=>{
				taskitem.done = true
				})
			}
			else{
				this.task.forEach((taskitem)=>{
				taskitem.done = false
				})
			}
		},
		deleteCheckAll(){
			this.task = this.task.filter((taskitem)=>{
				return taskitem.done === false
			})
		},
		updateTask(id,value){
			this.task.forEach((taskitem)=>{
				if(taskitem.id===id){
					taskitem.atask = value
				}
			})
		},
		userSendData() {
			this.task.forEach((taskitem)=>{
				let res = sendData(taskitem);
      			console.log(res); //查看返回信息
			})
   	 	},
		async userGetData(){
			let res = await getData();
			console.log(res)
			/* this.$nextTick(function(){
				this.task = res.data
			}) */
			this.task = res
		}
	},
	mounted(){
		this.$bus.$on('changeCheck',this.changeCheck)
		this.$bus.$on('deleteCheck',this.deleteCheck)
		this.$bus.$on('updateTask',this.updateTask)
	},
	beforeDestroy(){
		this.$bus.$off('changeCheck')
		this.$bus.$off('deleteCheck')
		this.$bus.$off('updateTask')
	}
}
</script>

<style>
	body {
		background: #fff;
	}
	.btn {
		display: inline-block;
		padding: 4px 12px;
		margin-bottom: 0;
		font-size: 14px;
		line-height: 20px;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
		border-radius: 4px;
	}
	.btn-danger {
		color: #fff;
		background-color: #da4f49;
		border: 1px solid #bd362f;
	}
	.btn-edit {
		color: #fff;
		background-color: skyblue;
		border: 1px solid rgb(74, 114, 129);
		margin-right: 5px;
	}
	.btn-danger:hover {
		color: #fff;
		background-color: #bd362f;
	}
	.btn:focus {
		outline: none;
	}
	.todo-container {
		width: 600px;
		margin: 0 auto;
	}
	.todo-container .todo-wrap {
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
	}
	.netButton{
		margin-top: 10px;
		display: flex;
		justify-content: center;
	}
</style>

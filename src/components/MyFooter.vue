<template>
    <div class="todo-footer" v-show="isShow"><!--v-show拿到的值也是布尔值 total值为0不显示 0以外的值显示-->
		<label>
			<input type="checkbox" @change="selectAll" :checked="isAll"/>
		</label>
		<span>
			<span>已完成 {{taskDone}}</span> / 全部 {{task.length}} 
		</span>
		
		<button class="btn btn-danger" @click="deleteAllChcekTask">清除已完成任务</button>
    </div>
</template>

<script>
export default {
    name:'MyFooter',
	props:['task'],
	methods:{
		deleteAllChcekTask(){
			alert('确定要清除已完成任务吗？')
			this.$emit('deleteCheckAll')
		},
		selectAll(e){
			this.$emit('selectAllTask',e.target.checked)
		}
	},
	computed:{
		taskDone(){
			let i = 0
			this.task.map((taskitem) => {
				if(taskitem.done){
					i++
				}
			});
			//两种都行 forEach()返回值是undefined，不可以链式调用。map()返回一个新数组，原数组不会改变。
			/* this.task.foreach((taskitem) => {
				if(taskitem.done){
					i++
				}
			}); */
			return i
		},
		isAll(){
			if(this.taskDone===Array.isArray(this.task) && this.task.length && this.task.length!=0 ){
				return true
			}
		},
		isShow(){
			if(Array.isArray(this.task)&&this.task.length===0){
				return false
			}
			else{
				return true
			}
		}
	}
}
</script>

<style scoped>
    .todo-footer {
		height: 40px;
		line-height: 40px;
		padding-left: 6px;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
	}

	.todo-footer label {
		display: inline-block;
		margin-right: 10px;
		cursor: pointer;
	}

	.todo-footer label input {
		position: relative;
		top: -1px;
		vertical-align: middle;
		margin-right: 5px;
	}

	.todo-footer button {
		float: right;
		margin-top: 5px;
	}
</style>
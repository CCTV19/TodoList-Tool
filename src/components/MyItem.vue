<template>
    <li>
		<label>
			<input class="a" type="checkbox" :checked="taskItem.done" @change="handleCheck(taskItem.id)">
			<!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
			<!-- <input type="checkbox" v-model="todo.done"/> -->
			<span v-show="!taskItem.isEdit">{{taskItem.atask}}</span>
			<input type="text" 
			v-show="taskItem.isEdit" 
			:value="taskItem.atask"
			@blur="editAtask(taskItem,$event)"
			ref="inputTitle"
			>
		</label>
		<button class="btn btn-danger" @click="handleDelete(taskItem.id)">删除</button>
		<button class="btn btn-edit" @click="handleEdit(taskItem)">编辑</button>
	</li>
</template>

<script>
export default {
    name:'MyItem',
	props:['taskItem'],
	/* data(){
		return{
			isEdit:false
		}
	}, */
	methods:{
		handleDelete(id){
			if(confirm('确定要删除该任务吗？')){
				/* this.deleteCheck(id) */
				this.$bus.$emit('deleteCheck',id)
			}
		},
		handleEdit(taskItem){
			if(Object.prototype.hasOwnProperty.call(taskItem,"isEdit")){
				taskItem.isEdit = true
			}else{
				this.$set(taskItem,'isEdit',true)
			}
			//在下一次DOM更新结束后执行其指定的回调(改变数据之后，基于更新后的新DOM进行操作)
			this.$nextTick(function(){
				this.$refs.inputTitle.focus()
			})
		},
		editAtask(taskItem,e){
			this.taskItem.isEdit = false
			if(!e.target.value.trim()) return alert('输入不能为空!')
			this.$bus.$emit('updateTask',taskItem.id,e.target.value)
		},
		//通知App将对应的done取反
		handleCheck(id){
			/* this.changeCheck(id) */
			this.$bus.$emit('changeCheck',id)
		}
	}
}
</script>

<style scoped>
    li {
		list-style: none;
		height: 36px;
		line-height: 36px;
		padding: 0 5px;
		
	}

	li label {
		float: left;
		cursor: pointer;
	}

	li label li input {
		vertical-align: middle;
		margin-right: 6px;
		position: relative;
		top: -1px;
	}

	li button {
		float: right;
		display: none;
		margin-top: 3px;
	}

	li:before {
		content: initial;
	}

	li:last-child {
		
	}

	li:hover{
		background-color: #ddd;
	}
	
	li:hover button{
		display: block;
		transition: all .5s;
	}

	.a{
		margin-right :10px;
		vertical-align: middle;
	}
</style>
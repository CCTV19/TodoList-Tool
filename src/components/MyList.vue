<template>
    <ul class="todo-main">
		<MyItem 
			class="todo-empty"
			v-for="taskItem in task"
			:key="taskItem.id"
			:taskItem="taskItem"
		/>
	</ul>
</template>

<script>
import MyItem from './MyItem'
export default {
    name:'MyList',
    components:{
            MyItem
    },
	props:['task'],
}
</script>

<style>
    .todo-main {
		border: 1px solid #ddd;
		border-radius: 10px;
		padding: 10px;
		padding-bottom: 5px;
	}

	.todo-empty {
		height: 50px;
		line-height: 40px;
		border: 1px solid #ddd;
		border-radius: 4px;
		margin-bottom: 5px;
	}
</style>
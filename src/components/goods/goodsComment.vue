<template>
	<div>
		<comment :id='$route.params.id'></comment>
	</div>
</template>
<script type="text/javascript">
	import comment from '../subcomponents/comment.vue';
	export default {
		name:'goodsComment',
		components:{
			comment,
		}
	}
</script>
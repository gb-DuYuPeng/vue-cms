<template>
	<div>
		<div class="mui-numbox" data-numbox-min="1" data-numbox-max="maxNum">
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" :value="initCount" @change = 'countChange' ref='numBox'>
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
	</div>
</template>
<script>
	import mui from '../../lib/mui/js/mui.min.js'
	export default {
		name:'goodsInfo-number',
		props:['initCount','goodsId'],
		data(){
			return {
				number:1,
			}
		},
		mounted(){
			//初始化数字选择框
			mui('.mui-numbox').numbox();
		},
		methods:{
			countChange(){
				this.$store.commit('updateGoods',{id:this.goodsId,count:this.$refs.numBox.value})
			}
		}
	}
</script>
<style scoped>
	.mui-numbox {
		margin: 0 10px;
	}
</style>
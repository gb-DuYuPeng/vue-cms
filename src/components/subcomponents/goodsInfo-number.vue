<template>
	<div>
		<div class="mui-numbox" data-numbox-min="1" data-numbox-max="maxNum">
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" value="1" @change = 'countChange' ref='numBox'>
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
	</div>
</template>
<script>
	import mui from '../../lib/mui/js/mui.min.js'
	export default {
		name:'goodsInfo-number',
		props:['maxNum'],
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
				this.$emit('getCount' ,parseInt(this.$refs.numBox.value))
			}
		},
		watch:{
			maxNum:function (newVal) {
				mui('.mui-numbox').numbox().setOption('max',newVal)
			}
		}
	}
</script>
<style scoped>
	
</style>
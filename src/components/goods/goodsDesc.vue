<template>
	<div class="goodsInfo-container">
		
		<h3> {{info.title}} </h3>
		<br>
		<div class="content" v-html='info.content'></div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
				info:{}
			}
		},
		created(){
			this.getGoodsDesc()
		},
		methods:{
			getGoodsDesc(){
				this.$http.get('api/goods/getdesc/'+this.$route.params.id).then( result =>{
					if (result.body.status === 0) {
						this.info = result.body.message[0]
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.goodsInfo-container {
		padding: 5px;
		h3 {
			color: #226aff;
			text-align: center;
			font-size: 16px;
			margin: 15px 0;
		}
		.content {
			table {
				width: 100%;
			}
			p{
				margin: 0;
			}
			img{
				width: 100%;
				display: block;
			}
		}
	}
</style>
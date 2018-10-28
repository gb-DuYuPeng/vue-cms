<template>
	<div class="goods-list">
		<div class="goods-item" v-for = 'item in goodsList' :key = 'item.id' @click='goDetail(item.id)'>
			<img :src="item.img_url">
			<h1>{{item.title}}</h1>
			<div class="info">
				<p class="price">
					<span class="now">{{item.sell_price}}</span>
					<span class="old">{{item.market_price}}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩余{{item.stock_quantity}}件</span>
				</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'goodsList',
		data(){
			return {
				pageindex:1,
				goodsList:[]
			}
		},
		created(){
			this.getGoodsList();
		},
		methods: {
			//获取商品列表
			getGoodsList(){
				this.$http.get('api/getgoods?pageindex=' + this.pageindex).then( result => {
					if (result.body.status ===0) {
						this.goodsList = result.body.message;
					}
				})
			},
			goDetail(id){
				this.$router.push('/goods/goodsInfo/'+id);
			}
		}
	}
</script>
<style scoped lang="scss">
	.goods-list {
		display: flex;
		justify-content:space-between;
		padding: 7px;
		// 让弹性盒子在必要的时候拆行
		flex-wrap:wrap;
		.goods-item {
			border: 1px solid #ccc;
			width: 49%;
			box-shadow: 0 0 7px #ccc;
			margin: 3px 0;
			display: flex;
			flex-direction:column;
			justify-content:space-between;

		}
		img {
			width: 100%;
		}
		h1 {
			font-size: 14px;
		}
		.info {
			background: #eee;
			p {
				padding: 5px;
				margin: 0;
			}
			.price {
				.now {
					color: red;
					font-weight: bolder;
					font-size: 16px;
				}
				.old {
					text-decoration: line-through;
					font-size: 12px;
					margin-left: 10px;
				}
			}
			.sell {
				display: flex;
				justify-content:space-between;
				font-size: 13px;
			}
		}
	}
</style>
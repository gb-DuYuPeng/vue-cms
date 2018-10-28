<template>
	<div class="shopcar-container">
		<!-- 购物车商品区域 -->
		<div class="mui-card" v-for = '(item,i) in goods' :key = 'item.id'>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<mt-switch v-model = '$store.getters.getGoodsSelected[item.id]' @change='selected(item.id,$store.getters.getGoodsSelected[item.id])'></mt-switch>
					<img :src="item.thumb_path">
					<div class="info">
						<h2>{{item.title}}</h2>
						<p>
							<span class="price">￥{{item.sell_price}}</span>
							<number :initCount = '$store.getters.getGoodsCount[item.id]' :goodsId='item.id'></number>
							<a href="#" @click.prevent = 'remove(item.id,i)'>删除</a>
						</p>
						<!-- 
							问题：如何从store中的car获取id值
							1.创建一个空对象，遍历商品的数量，商品的id名
						 -->
					</div>
				</div>
			</div>
		</div>
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner goodsCount">
					<div class="left">
						<p>总计(不含运费)</p>
						<p>已勾选商品<span>{{$store.getters.getDoodsTotal.count}}</span>件，总价<span>￥{{$store.getters.getDoodsTotal.amount}}</span></p>
					</div>
					<!-- <div class="right"> -->
						<mt-button type='danger'>去结算</mt-button>
					<!-- </div> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import number from '../subcomponents/shopcar-number.vue'
	export default {
        name: "shopcar",
        components:{
        	number,
        },
        data(){
        	return {
        		goods:[]
        	}
        },
        created(){
        	this.getGoodsList();
        },
        methods:{
        	//获取购物车商品列表的方法
        	getGoodsList(){
        		let idArr = [];
        		this.$store.state.car.forEach( item => {
        			idArr.push(item.id);
        		});
        		if (idArr.length ===0) return false;
        		console.log(idArr)
        		this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then( result =>{
        			if (result.body.status === 0 ) {
        				this.goods = result.body.message
        			}
        		})
        	},
        	//点击删除商品数据，分别在页面上和store仓库里
        	remove(id,index){
        		this.goods.splice(index, 1);
        		//调用store中的删除数据的方法
        		this.$store.commit('del', {id, index})
        	},
        	selected(id,selected){
        		this.$store.commit('updateSelected',{id:id,selected:selected})
        	}
        }
    }
</script>
<style scoped lang="scss">
	.shopcar-container {
		background: #ccc;
		overflow: hidden;
		.mui-card-content-inner {
			display: flex;
			img{
				width: 60px;
				height: 60px;
				margin:  0 10px;
			}
			h2 {
				font-size: 13px;
			}
			.info {
				.price {
					color: red;
					font-weight: bolder;
				}
				 p {
					display: flex;
					// 纵向居中
					align-items:center;
					
				}
			}
		}
		.goodsCount {
			display: flex;
			justify-content:space-between;
			align-items:center;
			span {
				color: red;
				font-weight: bold;
				font-size: 16px;
			}
		}
	}
</style>
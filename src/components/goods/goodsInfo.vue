<template>
	<div class="goodsInfo-container">
		<!-- 小球 -->
		<transition @before-enter = 'beforeEnter' @enter = 'enter' @after-enter = 'afterEnter'>
			<div class="ball " v-show='flag'></div>
		</transition>
		
		<!-- 轮播图区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :bannerList = 'banner' :isfull='false'></swiper>
				</div>
			</div>
		</div>
		<!-- 商品购买区域 -->
		<div class="mui-card">
			<div class="mui-card-header">{{goodsInfo.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						市场价: <del>{{goodsInfo.market_price}}</del>
						市场价: <span>{{goodsInfo.sell_price}}</span>
					</p>
					<p>
						购买数量：{{goodsInfo.stock_quantity}}
						<number @getCount='getNumber' :maxNum = 'goodsInfo.stock_quantity'></number>
					</p>
					<p>
						<mt-button type='primary' size='small'>立即购买</mt-button>
						<mt-button type='danger' size='small' @click = "addShopCar">加入购物车</mt-button>
					</p>
				</div>
			</div>
		</div>
		<!-- 商品参数区域 -->
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{ goodsInfo.goods_no }}</p>
					<p>库存情况：{{ goodsInfo.stock_quantity }} </p>
					<p>上架时间：{{ goodsInfo.add_time | dataFormat }} </p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type='primary' size='large' plain @click = 'goDesc'>图文介绍</mt-button>
				<mt-button type='danger' size='large' plain @click ='goComment'>商品评论</mt-button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import swiper from '../subcomponents/swiper.vue'
	import number from '../subcomponents/goodsInfo-number.vue'
	export default {
		name: 'goodsInfo',
		components:{
			swiper,
			number,
		},
		data(){
			return {
				id:parseInt(this.$route.params.id),
				banner:[],
				goodsInfo:{},
				flag:false,
				//商品数量
				selectedCount:1,
			}
		},
		created(){
			this.getBanner();
			this.getGoodsInfo();
		},
		methods:{
			getBanner(){
				this.$http.get('api/getthumimages/'+this.id).then( result => {
					if (result.body.status === 0 ) {
						result.body.message.forEach( item => {
							item.img = item.src
						});
						this.banner = result.body.message;

					}
				})
			},
			getGoodsInfo(){
				this.$http.get('api/goods/getinfo/'+this.id).then( result => {
					if (result.body.status ===0) {
						this.goodsInfo = result.body.message[0];
					}
				})
			},
			goDesc(){
				this.$router.push({name:'goodsDesc',params:{id:this.id}})
			},
			goComment(){
				this.$router.push({name:'goodsComment',params:{id:this.id}})
			},
			addShopCar(){
				this.flag = !this.flag;
				let obj = {
					id:this.id,
					count:parseInt(this.selectedCount),
					price:this.goodsInfo.sell_price,
					selected:true
				}
				console.log(obj.price)
				this.$store.commit('addToCar', obj)
			},
			beforeEnter(el){
				el.style.transform = 'translate(0,0)'
			},
			enter(el,done){
				el.offsetWidth;
				//获取小球的位置
				const ball = el.getBoundingClientRect();
				
				const badge = document.querySelector('.mui-badge').getBoundingClientRect();
				const x = badge.left - ball.left;
				const y = badge.top - ball.top;
				console.log(x,y);
				el.style.transform = `translate( ${x}px,${y}px )`;
				el.style.transition = 'all 1s cubic-bezier(.2,-0.3,1,.33)';
				done();
			},
			afterEnter(el){
				this.flag = !this.flag;
			},
			//设置商品数量
			getNumber(count){
				this.selectedCount = count 
			}
		}
	}
</script>
<style scoped lang="scss">
	.goodsInfo-container {
		background: #eee;
		overflow: hidden;
		.mui-card-content-inner {
			.price {
				del {
					margin-right: 10px;
				}
				span {
					color:red ;
					font-size: 16px;
					font-weight: bolder;
				}
			}
		}
		.mui-card-footer {
			display: block;
			button {
				margin:10px 0;
			}
		}

		.ball {
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background: red;
			position: absolute;
			top: 440px;
    		left: 140px;
			z-index: 999;
		} 
	}
</style>
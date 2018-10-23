<template>
	<div>
		<!-- 轮播图区域 -->
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for = "item in bannerList" :key = 'item.id'>
				<img :src="item.img">
			</mt-swipe-item>
		</mt-swipe>
		<!-- 六空格区域 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            	<router-link to = '/news/newsList'>
                    <img src="../../images/menu1.png">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to = '../photos/photoList'>
                    <img src="../../images/menu2.png">
                    <div class="mui-media-body">图片分享</div>
                </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu3.png">
                    <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu6.png">
                    <div class="mui-media-body">联系我们</div></a></li>
        </ul>
	</div>
</template>
<script type="text/javascript">
	import { Toast } from 'mint-ui';
	export default {
        name: "home",
        created() {
        	this.getBanner();
        },
        data(){
        	return {
        		bannerList:[],
        	}
        },
        methods:{
        	getBanner() {
        		this.$http.get('api/getlunbo')
        			.then( result => {
        				console.log(result.body);
        				if (result.body.status === 0) {
        					this.bannerList = result.body.message
        				} else {
        					Toast('加载轮播图失败')
        				}
        			})
        	}
        }
    }
</script>
<style scoped>
	.mint-swipe {
		height: 200px;
	}
	.mint-swipe img{
		width: 100%;
		height: 100%;
	}
	.mui-table-view {
		background: #fff;
	}
	.mui-table-view img {
		width: 60px;
		height: 60px;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		border: none;
	}
</style>
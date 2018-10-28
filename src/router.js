//导入vue包
import Vue from 'vue';
//导入路由模块
import VueRouter from "vue-router"
//使用路由模块
Vue.use(VueRouter);
//导入相关的组件
import Home from "./components/tabbar/home.vue"
import Member from "./components/tabbar/member.vue"
import Shopcar from "./components/tabbar/shopcar.vue"
import Search from "./components/tabbar/search.vue"
import NewsList from "./components/news/newsList.vue"
import NewsInfo from "./components/news/newsInfo.vue"
import PhotoList from "./components/photos/photoList.vue"
import PhotoInfo from "./components/photos/photoInfo.vue"
import GoodsList from "./components/goods/goodsList.vue"
import GoodsInfo from "./components/goods/goodsInfo.vue"
import GoodsDesc from "./components/goods/goodsDesc.vue"
import GoodsComment from "./components/goods/goodsComment.vue"
//创建路由对象
let router = new VueRouter({
	//设置路由高亮显示
	linkActiveClass:'mui-active',
	routes: [
		{ path:'/',redirect:'/home' },
		{ path:'/home',component:Home},
		{ path:'/member',component:Member },
		{ path:'/shopcar',component:Shopcar },
		{ path:'/search',component:Search },
		{ path:'/news/newsList',component:NewsList },
		{ path:'/news/newsInfo/:id',component:NewsInfo },
		{ path:'/photos/photoList',component:PhotoList },
		{ path:'/photos/photoInfo/:id',component:PhotoInfo },
		{ path:'/goods/goodsList',component:GoodsList },
		{ path:'/goods/goodsInfo/:id',component:GoodsInfo,name:'goodsInfo'},
		{ path:'/goods/goodsDesc/:id',component:GoodsDesc,name:'goodsDesc'},
		{ path:'/goods/goodsComment/:id',component:GoodsComment,name:'goodsComment'},
	]
})
//最后暴露路由对象
export default router;

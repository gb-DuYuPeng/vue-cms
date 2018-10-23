//导入vue包
import Vue from 'vue';
//注意：如果通过路径的形式去引入node_modules相关的文件，可以直接省略路径前面的node_modules
//2.导入路由模块
import VueRouter from "vue-router"
//3.使用路由模块
Vue.use(VueRouter);
//5.导入相关的组件
import Home from "./components/tabbar/home.vue"
import Member from "./components/tabbar/member.vue"
import Shopcar from "./components/tabbar/shopcar.vue"
import Search from "./components/tabbar/search.vue"
import NewsList from "./components/news/newsList.vue"
import NewsInfo from "./components/news/newsInfo.vue"
import PhotoList from "./components/photos/photoList.vue"
//4.创建路由对象
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
	]
})
//最后暴露路由对象
export default router;

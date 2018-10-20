//导入vue包
import Vue from 'vue';
//注意：如果通过路径的形式去引入node_modules相关的文件，可以直接省略路径前面的node_modules
//2.导入路由模块
import VueRouter from "vue-router"
//3.使用路由模块
Vue.use(VueRouter);
//5.导入相关的组件
import Home from "./components/home.vue"
import Cart from "./components/cart.vue"
import Register from "./components/children/register.vue"
import User from "./components/children/user.vue"
//4.创建路由对象
let router = new VueRouter({
	routes: [
		{ path:'/',redirect:'/home' },
		{ path:'/home',component:Home },
		{ path:'/cart',component:Cart ,children:[
			{ path:'register',component:Register },
			{ path:'user',component:User },
		]},
	]
})

export default router;

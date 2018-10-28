import Vue from 'vue';

import app from './App.vue'

//3.引入mint-ui组件
import MinUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MinUI);
//4.导入miu库
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
//5.导入router.js
import router from './router.js'
//6.导入vue-resource模块
import VueResource from 'vue-resource'
Vue.use(VueResource)
//7.全局配置请求的根目录
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//8.定义全局过滤器
import moment from 'moment'
Vue.filter('dataFormat',function (dataStr,pattern = 'YYYY-MM-DD HH:mm:ss') {
	return moment(dataStr).format(pattern);
})
//9.全局配置post提交方式为表单格式
Vue.http.options.emulateJSON = true;
//10.导入缩略图模块
import VuePreview from 'vue-preview';
Vue.use(VuePreview)
//导入vuex
import Vuex from 'vuex';
//安装
Vue.use(Vuex);
let car = JSON.parse(localStorage.getItem('car') || '[]')
let store = new Vuex.Store({
	state:{
		car:car
	},
	mutations:{
		//1.点击购物车，将信息保存到car
		addToCar(state,goodsList){
			let flag = false;
			state.car.some( item =>{
				if ( item.id === goodsList.id) {
					item.count += parseInt(goodsList.count);
					flag = true;
					return true;
				}
			})
			if (!flag) {
				console.log('aa')
				state.car.push(goodsList)
			}
			//需要把car数组存到localstorage里
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		//4.修改商品的数量
		updateGoods(state,goodsInfo){

			state.car.some( item => {
				if (item.id === goodsInfo.id) {
					item.count = parseInt(goodsInfo.count)
					return true
				}
			})
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		//5.点击删除
		del(state, obj){
			console.log(obj.id);
			console.log(obj.index);
			state.car.some(item =>{
				console.log(item.id);
				if (item.id === obj.id) {
					state.car.splice(obj.index,1)
					console.log(state.car);

					return true;
				}

			})
			//需要把car数组存到localstorage里
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		//7.更新商品的状态
		updateSelected(state,info){
			state.car.some( item =>{
				// console.log(item.id)
				// console.log(info.id)
				if (item.id ==info.id) {
					item.selected = info.selected
					return true;
				}
			})
			//需要把car数组存到localstorage里
			localStorage.setItem('car', JSON.stringify(state.car))
		}
	},
	getters:{
		//获取微标的数量
		getAllCount(state){
			let c = 0;
			state.car.forEach( item => {
				c+=item.count
			});
			return c
		},
		//获取商品数量的方法
		getGoodsCount(state){
			let num = {};
			state.car.forEach( item => {
				num[item.id] = item.count;
			});
			return num
		},
		//渲染商品数据的状态
		getGoodsSelected(state){
			let sel = {};
			state.car.forEach( item => {
				sel[item.id] = item.selected;
			});
			return sel;
		},
		//计算总价
		getDoodsTotal(state){
			let num = {
				count : 0,
				amount : 0 
			};
			state.car.forEach( item => {
				if (item.selected) {
					num.count +=item.count;
					num.amount += item.price*item.count
				}
			});
			return num
		}
	},
})
let vm = new Vue({
	el:'#app',
	render: c => c(app),
	router,
	store,
})
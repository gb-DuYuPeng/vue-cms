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
Vue.filter('dataFormat',function (dataStr,pattern = 'YYYY-MM-DD HH:MM:SS') {
	return moment(dataStr).format(pattern);
})


let vm = new Vue({
	el:'#app',
	render: c => c(app),
	router,
})
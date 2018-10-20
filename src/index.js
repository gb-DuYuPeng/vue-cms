import Vue from 'vue';

import app from './App.vue'

//3.引入mint-ui组件
import MinUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MinUI);
//4.导入miu库
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

let vm = new Vue({
	el:'#app',
	render: c => c(app)
})
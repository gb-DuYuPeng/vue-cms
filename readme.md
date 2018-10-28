## 制作公共组件

1.完成Header 区域，使用的是Mint-ui中的header组件
2.制作底部tabber区域，使用的是MUI中的tabber组件
+在制作购物车小图标的时候要用到mui中扩展图标的css样式，要拷贝到项目当中
+除了拷贝mui样式还要拷贝扩展字体库ttf文件到项目中.

导入所需组件

```
//引入mint-ui组件
import MinUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MinUI);
//导入mui库
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
//5.导入router.js
import router from './router.js'
```



## 制作首页app组件

### 轮播图区域

​	完成轮播图区域，使用的是mint-ui中Swipe轮播图，在methods中使用ajax调接口获取图片，并渲染视图层。

```
//导入vue-resource模块
import VueResource from 'vue-resource'
Vue.use(VueResource)
```

### 六空格区域

​	完成六空格区域及分类列表区域，使用的是MUI中的grid(九空格)组件，然后删除不需要部分，创建img文件，将所需图片复制进去，将图标改成img标签，引入正确路径。

#### 1.新闻列表

​	在制作新闻列表之前，配置路由，实现在点击首页新闻列表时，页面跳转至新闻列表页面。

​	完成新闻列表区域，使用的是MUI中media list(图文列表)组件，使用ajax调接口获取相应数据，渲染视图层，

​	①.其中ajax调接口时，其路径是项目文档中域名+地址，而其中域名是相同的，所以在项目入口文件(index.js)中全局配置请求的根目录.

```
//7.全局配置请求的根目录
Vue.http.options.root = 'http://www.liulongbin.top:3005';
```

​	②.其中''发表时间''中的从接口获取的时间，需要格式化，即使用npm/cnpm下载moment运行依赖，然后在index.js中定义全局过滤器.最后在页面上使用这个全局过滤器.

```
//8.定义全局过滤器
import moment from 'moment'
Vue.filter('dataFormat',function (dataStr,pattern = 'YYYY-MM-DD HH:MM:SS') {
	return moment(dataStr).format(pattern);
})
```

#####  新闻详情

​	1. 置路由并定义变量id，在视图层绘制出大概的架构，然后通过ajax获取对象数据，将获取来的数据再次渲染视图层。

​	其中点击相应新闻列表获取对应的id值，ajax传入id值，返回与之相应的数据，渲染新闻详情页面。

```
//配置路由并定义变量id
{ path:'/news/newsInfo/:id',component:NewsInfo },
//传入新闻列表中所点击数据对应的id值
<router-link :to="'/news/newsInfo/'+item.id"></router-link>
//在新闻详情页中接收id值
this.id = this.$route.params.id
```

 2. 新闻详情页最下面的评论区

    ​	多个页面有这种类似的评论区，所以创建子类公共组件comment.vue。

    ①.渲染评论列表

    ​	子组件comment.vue中，渲染评论列表所需要传入的id值由父组件newsinfo提供，子组件用props[]接收

    ​	其中评论列表显示数量有限，点击“加载更多”通过concat数组拼接，从而渲染更多的评论列表.

    ```
    this.comments = this.comments.concat(result.body.message);
    ```

    ②.添加评论

    ​	评论内容的非空校验，若未输入内容点击添加评论时，友好的提示用户。

    使用的是mint-ui中的Toast。

    ```
    //导入
    import { Toast } from 'mint-ui';
    //非空校验
    if (this.msg.trim().length ===0 ) {
    	return Toast('评论内容不能为空')
    }
    ```


#### 2. 图片列表

​	1.顶部侧滑分类栏是使用mui中的tab bar(选项卡)中的顶部选项卡-可左右拖拽组件

​	2.左右拖拽滚动使用的是mui中scroll(区域滚动)组件。

    ```
    //导入mui组件
    import mui from '../../lib/mui/js/mui.min.js'
    
    <div class="mui-scroll-wrapper">
    	<div class="mui-scroll">
    		<!--这里放置真实显示的DOM内容-->
    	</div>
    </div>
    //初始化scroll控件
    mui('.mui-scroll-wrapper').scroll({
    	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    ```
    
    但是这样会报错
    
    	报错：可能webpack默认是启用严格模式的
    	解决：把webpack打包的时候的严格模式禁用
    
    在.babelrc文件中配置以下内容：
    "plugins":["transform-remove-strict-mode"]
    
    滑动时仍会报错，需要阻止谷歌默认事件
    
    * {
    	touch-action: none;
    }

​	3.调接口，点击分类，将所点击的id值传进去，从而渲染相应的数据。

​	其中有全局配置post提交方式为表单格式

```
//9.全局配置post提交方式为表单格式
Vue.http.options.emulateJSON = true;
```



#####  图片详情

​	创建子组件，获取对应的数据与图片渲染组件。

​	其中渲染图片运用了懒加载：

- 下载插件 

- 导入缩略图模块

- 获取缩略图

- 渲染视图层

- 样式调整

  ```
  下载插件	npm i vue-preview -S
  
  //导入缩略图模块
  import VuePreview from 'vue-preview';
  Vue.use(VuePreview)
  
  //获取缩略图
  getThumbs(){
      this.$http.get('api/getthumimages/' + this.id).then( result => {
          console.log(result.body.message)
          if (result.body.status === 0 ) {
              //遍历每个图片的数据，补全图片的宽和高和小图片
              result.body.message.forEach( item => {
                  item.msrc = item.src;
                  item.w = 600;
                  item.h = 400;
              });
              this.photoList = result.body.message;
          }
      } )
  },
  
  //渲染视图层
  <template>
    <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
  </template>
  
  //样式调整
  figure {
      display: inline-block;
      margin: 1em 10px;
      img {
          width: 88px;
          height: 58px;
      }
  }
  ```

  最下面的评论区，即调用之前封装的公共组件，将id值传入

```
1.引入公共组件comment.vue
import comment from '../subcomponents/comment.vue'
2.从路由中获取图片id
data(){
    return {
        //从路由中获取的图片id
        id:this.$route.params.id,
    }
 },
 3.视图层渲染调用子组件，并将id值传入
<comment-box :id='this.id'></comment-box>
```

#### 3.商品列表

​	1.商品列表的布局是使用的flex布局，解决了，因为商品描述的文字数量不一致，而引起的整个内容的高度不一致的问题。

```
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
}
```

​	2.页面跳转运用的是编程式跳转

```
<!-- 
在网页当中，有两种跳转方式
    ①使用a标签的形式，叫做标签跳转
    ②使用window.localtion.href的形式，叫做编程式跳转
-->
步骤：
1.添加点击事件，并传入id值
<div class="goods-item" v-for = 'item in goodsList' :key = 'item.id' @click='goDetail(item.id)'>内容</div>
2.methods中定义方法，实现页面跳转
goDetail(id){
console.log(this)
    //this.$route 是路由的参数对象,所有的路由的参数 params,query都属于他
    //this.$touter 是一个路由的导航对象，用它可以方便的使用js代码，实现路由的前进，后退，跳转到新的页面
    //1.最简单的
    this.$router.push('/goods/goodsInfo/'+id);
    //2.传递对象
    // this.$router.push({path:'/goods/goodsInfo/'+id});
    // this.$router.push({name:'goodsInfo',params:{id:id}});
}
```

#####  商品详情

1.整体架构是使用的MUI中的cardview（卡片视图）

2.轮播图：进行了封装，首页和商品详情页对封装的轮播图进行调用

```
封装的子组件：
	template：
		<mt-swipe :auto="4000">
			<!-- 将来，谁想用组件，谁就把图片轮播图 -->
			<mt-swipe-item v-for = "item in bannerList" :key = 'item.id'>
				<img :src="item.img" :class = "{'full':isfull}">
			</mt-swipe-item>
		</mt-swipe>
	script:
		props:['bannerList','isfull'],
调用的父组件
	template：
		<swiper :bannerList = 'banner' :isfull='false'></swiper>
	导入子组件：
	import swiper from '../subcomponents/swiper.vue'
	script：
		data(){
			return {
				id:this.$route.params.id,
				banner:[],//轮播图数据
			}
		},
		methods：{
			调接口将获取到的id值传给后台，获取对应的轮播图图片，然后赋给banner
		}	
```

3.购买数量的加减是用MUI中的number box（数字输入框）组件，并封装成公共组件goodsInfo-number.vue，

父组件goodsInfo.vue调用，并 传值

父组件的maxNum传给子组件，子组件数字输入框的value值传给父组件

```
父组件：
	template：
		<number @getCount='getNumber' :maxNum = 'goodsInfo.stock_quantity'></number>
	script：
		//导入子组件
		import number from '../subcomponents/goodsInfo-number.vue'
		components:{
			number,
		},
		data(){
			return {
				//商品数量
				selectedCount:1,
			}
		},
		//设置商品数量
		getNumber(count){
			this.selectedCount = count 
		}
子组件：
	template：
		<inputtype="number" value="1" @change = 'countChange' ref='numBox'>
	script：
		props:['maxNum'],
		data(){
			return {
				number:1,
			}
		},
		methods:{
			countChange(){
				//给当前元素设置ref属性，让通过this.$refs.属性值 拿到当前dom对象
				// console.log(this.$refs.numBox.value) 
				this.$emit('getCount' ,parseInt(this.$refs.numBox.value))
			}
		},
		watch:{
			//用watch来监听最大值，只要监听到maxNum值改变就立马设置最大值。
			maxNum:function (newVal) {
				mui('.mui-numbox').numbox().setOption('max',newVal)
			}
		}
```

4.点击加入购物车时的动画。

```
template：
	<!-- 小球 -->
		<transition 
			@before-enter = 'beforeEnter' 
			@enter = 'enter' 
			@after-enter = 'afterEnter'>
			<div class="ball " v-show='flag'></div>
		</transition>
script:	
	data(){
		return {
			flag:false,
		}
	},
	addShopCar(){
		this.flag = !this.flag;
	},
	beforeEnter(el){
		el.style.transform = 'translate(0,0)'
	},
	enter(el,done){
		el.offsetWidth;
		//获取小球的位置
		const ball = el.getBoundingClientRect();
		
		//获取微标的位置。 注意：想拿到当前页面的任何dom元素和所在的组件没有任何关系
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
```

5.评论组件：

```
<template>
	<div>
		<comment :id='$route.params.id'></comment>
	</div>
</template>
<script type="text/javascript">
	import comment from '../subcomponents/comment.vue';
	export default {
		name:'goodsComment',
		components:{
			comment,
		}
	}
</script>
```

6.点击加入购物车事件：

​	调用仓库方法实现购物车页面。

```
仓库store中：
	每次加载页面先从本地储存获取数据
let car = JSON.parse(localStorage.getItem('car') || '[]')
const store = new Vuex.Store({
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
			//如果没有找到数据
			if (!flag) {
				console.log('aa')
				state.car.push(goodsList)
			}
			//需要把car数组存到localstorage里
			localStorage.setItem('car', JSON.stringify(state.car))
		},
	}
  }）
商品详情页中methods方法
  addShopCar(){
      this.flag = !this.flag;
      //点击需要把id，数量，单价，选中的状态拼接成一个对象，存到store
      //存储的样子：{id:商品的id，count：商品的数量，price：单价，selected：true}
      let obj = {
          id:this.id,
          count:parseInt(this.selectedCount),
          price:this.goodsInfo.sell_price,
          selected:true
      }
      获取仓库方法，并把对象传入
      this.$store.commit('addToCar', obj)
  },
```



### vuex.store仓库下载使用

1.基本过程

```
1.下载	
	cnpm/npm i vuex -S
2.导入vuex
	import Vuex from 'vuex';

3.通过new Vuex.store()实例 得到一个数据仓储对象
let store = new Vuex.Store({
	state:{//可以吧state想象成是组件中的data
		count:999	//如果想访问store中的数据  通过 this.$store.state.***
	},
	mutations:{//想象成是组件的methods
		adds(state){	//如何调用方法 ： this.$store.commit('方法名')
			state.count++;
		},
		delete(state,obj){
			state.count-=(obj.a+obj.b);
			//mutations中的函数最多支持两个参数，
			//参数一：永远是state配置项
			//参数二：是通过commit提交过来的参数，可以穿传对象和数组
		}
	},
	getters:{//只负责对外提供数据，不负责修改数据，如果要修改数据，请去找mutations
		//用法和 组件的过滤器类似，和计算属性computed也类似
		//只要state发生变化，那么getters中的数据也会触发而重新求值。
		cmtCount: function(state) {
			return '当前的值是：' + state.count;
		}//调用 this.$store.getters.***

	}
})

let vm = new Vue({
    el: '#app',
    data: {
    },
    //4.将store挂载到VM实例上
    store,
});
```

总结：​	1.state中的数据不能直接修改，如果想修改必须通过mutations
​		2.如果组件想从state中获取数据，需要 `this.$store.state.属性名`
​		3.如果组件想调用mutations中的方法，需要通过`this.$store.commit('方法名'，唯一的一个参数)`
​		4.若组件想调用getters中的方法；通过`this.$store.getters.方法名`	

### 购物车页面

1.基本结构使用的是MUI中的cardview（卡片视图）

2.获取购物车数据

```
1.获取仓库state中的car的各个商品的id值（即用户添加购物车的商品所对应的id值）
let idArr = [];
this.$store.state.car.forEach( item => {
	idArr.push(item.id);
});
2.将id值传入，调接口获取对应的商品详情数据
	其中使用方法：
		idArr.join(',') —— join() 方法用于把数组中的所有元素放入一个字符串。
3.将获取的数据渲染页面
```

3.点击删除

```
1.将需要删除的商品的id值和索引（i),通过传参方式传入
	<a href="#" @click.prevent = 'remove(item.id,i)'>删除</a>
	其中prevent修饰符，阻止默认事件
2.methods中封装方法
	//点击删除商品数据，分别在页面上和store仓库里
    remove(id,index){
        this.goods.splice(index, 1);
        //调用store中的删除数据的方法
        this.$store.commit('del', {id, index})
    },
3.仓库store中封装del方法，删除购物车car中数据
	del(state, obj){
        state.car.some(item =>{
            if (item.id === obj.id) {
            state.car.splice(obj.index,1)
            	return true;
            }
        })
        //需要把car数组存到localstorage里
        localStorage.setItem('car', JSON.stringify(state.car))
    },
```


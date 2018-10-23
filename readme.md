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

### 1.轮播图区域

​	完成轮播图区域，使用的是mint-ui中Swipe轮播图，在methods中使用ajax调接口获取图片，并渲染视图层。

```
//导入vue-resource模块
import VueResource from 'vue-resource'
Vue.use(VueResource)
```

### 2.六空格区域

​	完成六空格区域及分类列表区域，使用的是MUI中的grid(九空格)组件，然后删除不需要部分，创建img文件，将所需图片复制进去，将图标改成img标签，引入正确路径。

#### 新闻资讯内子组件 — 新闻列表

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

##### 新闻列表子页面 — 新闻详情

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

    #### 图片分享子组件 — 图片列表



    1.顶部侧滑分类栏是使用mui中的tab bar(选项卡)中的顶部选项卡-可左右拖拽组件

    2.左右拖拽滚动使用的是mui中scroll(区域滚动)组件。

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

    ​	报错：可能webpack默认是启用严格模式的
    ​	解决：把webpack打包的时候的严格模式禁用

    在.babelrc文件中配置以下内容：

    ```
    "plugins":["transform-remove-strict-mode"]
    ```

    滑动时仍会报错，需要阻止谷歌默认事件

    ```
    * {
    	touch-action: none;
    }
    ```

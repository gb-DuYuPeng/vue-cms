<template>
	<div>
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-scroll-wrapper">
				<div class="mui-scroll">
					<a :class="['mui-control-item',item.id===0? 'mui-active' : '']" v-for = '(item,i) in cates' :key='item.id'>
						{{item.title}}
					</a>
				</div>
			</div>
		</div>

		<!--图片列表区域-->
        <ul class="photo-list">
            <!--9.点击进入相应的图文详情 把li换成router-link  并用tag设置为li标签, 让流浏览器渲染成li-->
            <li>
                <img data-v-59bc3fc5="" src="http://ofv795nmp.bkt.clouddn.com//upload/201504/18/thumb_201504181230434303.jpg" lazy="loaded">
                <div class="info">
                    <h1 class="info-title">jsfhdfkjshdkfjhd</h1>
                    <div class="info-body">报错：可能webpack默认是启用严格模式的
	//解决：把webpack打包的时候的严格模式禁用</div>
                </div>
            </li>
            <li>
                <img data-v-59bc3fc5="" src="http://ofv795nmp.bkt.clouddn.com//upload/201504/18/thumb_201504181230434303.jpg" lazy="loaded">
                <div class="info">
                    <h1 class="info-title">jsfhdfkjshdkfjhd</h1>
                    <div class="info-body">报错：可能webpack默认是启用严格模式的
	//解决：把webpack打包的时候的严格模式禁用</div>
                </div>
            </li>
        </ul>
	</div>
</template>
<script>
	import mui from '../../lib/mui/js/mui.min.js'
	//报错：可能webpack默认是启用严格模式的
	//解决：把webpack打包的时候的严格模式禁用
	export default {
		name: 'photoList',
		data(){
			return {
				cates:[] //所有数据
			}
		},
		mounted(){
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		},
		created(){
			this.getAllCategory()
		},
		methods:{
			//获取图片分类
			getAllCategory(){
				this.$http.get('api/getimgcategory').then( result => {
					if (result.body.status === 0 ) {
						//手动拼接一个全部的分类列表
						result.body.message.unshift({title:'全部',id:0})
						this.cates = result.body.message
					}
				} )
			}
		}
	}
</script>
<style scoped lang="scss">
	* {
		touch-action: none;
	}
    .photo-list {
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;

        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;

            img {
                width: 100%;
                //vertical-align: middle;
                display: block;
            }

            img[lazy="loading"] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info {
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 84px;
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 13px;
                }
            }

        }
        .mui-slider {
            position: fixed;
            z-index: 1111;
            overflow: hidden;
            width: 100%;
        }
    }
</style>
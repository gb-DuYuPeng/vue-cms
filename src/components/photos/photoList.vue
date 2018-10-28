<template>
	<div>
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-scroll-wrapper">
				<div class="mui-scroll">
					<a :class="['mui-control-item',item.id===0? 'mui-active' : '']" v-for = '(item,i) in cates' :key='item.id'  @click = 'getPhotoList(item.id)'>
						{{item.title}}
					</a>
				</div>
			</div>
		</div>

		<!--图片列表区域-->
        <ul class="photo-list">
            <router-link :to= " '/photos/photoInfo/' + item.id" v-for = 'item in list' :key = 'item.id' tag = 'li'>
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
	</div>
</template>
<script>
	import mui from '../../lib/mui/js/mui.min.js'
	export default {
		name: 'photoList',
		data(){
			return {
				cates:[], //所有数据
                list:[] //图文列表
			}
		},
		mounted(){
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 
			});
            this.getPhotoList(this.id);
		},
		created(){
			this.getAllCategory();
            this.getPhotoList(0);
		},
		methods:{
			//获取图片分类
			getAllCategory(){
				this.$http.get('api/getimgcategory').then( result => {
					if (result.body.status === 0 ) {
						result.body.message.unshift({title:'全部',id:0})
						this.cates = result.body.message
					}
				} )
			},
            //获取图片信息
            getPhotoList(id){
                this.$http.get('api/getimages/'+id).then( result => {
                    if (result.body.status === 0 ) {
                        this.list = result.body.message;
                    }
                })
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
            a {
                display: block;
            }
            img {
                width: 100%;
                vertical-align: middle;
                display: block;
            }
            img[lazy=loading] {
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
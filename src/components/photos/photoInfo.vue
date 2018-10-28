<template>
	<div class="photoInfo-container">
		<!-- 大标题 -->
		<h3 class="title">{{photoInfo.title}}</h3>
		<p class="subTitle" >
			<span>发表时间： {{photoInfo.add_time | dataFormat}} </span>
			<span>点击：{{photoInfo.click}}</span>
		</p>
		<hr>
		<!-- 缩略图 -->
		<vue-preview :slides="photoList" @close="handleClose"></vue-preview>
		<!-- 内容区域 -->
		<div class="content" v-html='photoInfo.content'>内容</div>
		<!-- 评论区 -->
		<comment-box :id='this.id'></comment-box>
	</div>
</template>
<script type="text/javascript">
	import comment from '../subcomponents/comment.vue'
	export default {
        name: "photoInfo",
        components:{
        	commentBox:comment,
        },
        data(){
        	return {
        		id:this.$route.params.id,
        		photoInfo:{},
        		photoList:[] //缩略图数组
        	}
        },
        created(){
        	this.getPhotoInfo();
        	this.getThumbs()
        },
        methods:{
        	getPhotoInfo(){
        		this.$http.get('api/getimageInfo/'+this.id).then( result => {
        			// console.log(result.body.message[0])
        			if (result.body.status === 0) {
        				this.photoInfo = result.body.message[0]
        			}
        		})
        	},
        	//获取缩略图
        	getThumbs(){
        		this.$http.get('api/getthumimages/' + this.id).then( result => {
        			// console.log(result.body.message)
        			if (result.body.status === 0 ) {
        				result.body.message.forEach( item => {
        					item.msrc = item.src;
        					item.w = 600;
        					item.h = 400;
        				});
        				this.photoList = result.body.message;
        			}
        		} )
        	},
        	handleClose () {
		        // console.log('close event')
		    },
        }
    }
</script>
<style lang="scss">
	.photoInfo-container {
		padding: 0 4px;
		.title {
			color: #26a2ff;
			margin: 15px 0;
			text-align: center;
			font-size: 15px;
		}
		.subTitle {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #8f8f94;
		}
		.content {
			font-size: 13px;

		}
		.content img{
			width: 100%;
		}
		figure {
			display: inline-block;
			margin: 1em 10px;
			img {
				width: 88px;
				height: 58px;
			}
		}
	}
</style>
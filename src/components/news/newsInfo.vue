<template>
	<div class="newsInfo-container">
		<!-- 大标题 -->
		<h3 class="title">{{newsInfo.title}}</h3>
		<p class="subTitle" >
			<span>发表时间： {{newsInfo.add_time | dataFormat}} </span>
			<span>点击：{{newsInfo.click}}</span>
		</p>
		<hr>
		<!-- 内容区域 -->
		<div class="content" v-html='newsInfo.content'>内容</div>
		<!-- 评论区 -->
	</div>
</template>
<script type="text/javascript">
	export default {
        name: "newsInfo",
        data(){
        	return {
        		id:'',
        		//储存新闻详情
        		newsInfo:{}
        	}
        },
        created(){
        	this.getNewsInfo()
        },
        methods:{
        	getNewsInfo(){
        		console.log(this.$route.params.id)
        		this.id = this.$route.params.id
        		this.$http.get('api/getnew/'+this.id).then( result => {
        			console.log(result.body.message[0])
        			if (result.body.status === 0) {
        				this.newsInfo = result.body.message[0]
        			}
        		})
        	}
        }
    }
</script>
<style scoped>
	.newsInfo-container {
		padding: 0 4px;
	}
	.newsInfo-container .title {
		color: red;
		margin: 15px 0;
		text-align: center;
	}
	.newsInfo-container .subTitle {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #226aff;
	}
</style>
<template>
	<div class="cmt-container">
		<h3>发表评论</h3>
		<hr>
		<textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120" v-model='msg'></textarea>
		<mt-button type="primary" size = 'large' @click = 'postComment'>发表评论</mt-button>
		<!-- 评论内容区域 -->
		<div class="cmt-list">
			<div class="cmt-item" v-for = '(item,index) in comments' :key='item.id'>
				<div class="cmt-title">
					第{{index+1}}楼&nbsp;用户:{{item.user_name}}  发表时间：{{item.add_time | dataFormat}}
				</div>
				<div class="cmt-body">
					{{ item.content === 'undefined' ? '系统默认好评': item.content }}
				</div>
			</div>
		</div>
		<mt-button type="danger" size = 'large' plain @click = 'getMore'>加载更多</mt-button>
	</div>
</template>
<script type="text/javascript">
	import { Toast } from 'mint-ui';
	export default {
		name:'comment',
		props:['id'],
		data(){
			return {
				pageindex:1,//默认展示第一页的数据
				comments:[],//所有评论数据
				msg:'',//评论内容
			}
		},
		created(){
			this.getComments();
		},
		methods:{
			//1.获取评论信息
			getComments(){
				console.log(this.id);
				this.$http.get(`api/getcomments/${this.id}?pageindex=${this.pageindex}`).then( result => {
					if (result.body.status === 0) {
						this.comments = this.comments.concat(result.body.message);
					}
				})
			},
			//2.点击加载更多
			getMore(){
				this.pageindex++;
				this.getComments();
			},
			//3.点击添加评论信息
			postComment(){
				if (this.msg.trim().length ===0 ) {
					return Toast('评论内容不能为空')
				}
				this.$http.post(`api/postcomment/${this.id}`,{content:this.msg.trim()}).then( result => {
					if (result.body.status === 0 ) {
						//拼接一个评论对象
						let cmt = {
							add_time:Date.now(),
							user_name:"匿名用户",
							content:this.msg.trim()
						};
						this.comments.unshift(cmt);
						this.msg='';
					}
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.cmt-container {
		h3 {
			font-size: 18px;
		}
		textarea {
			margin:0;
			font-size:14px;
			height: 90px;
		}
		.cmt-list {
			margin: 5px 1px;
			.cmt-item {
				font-size: 13px;
				.cmt-title {
					background: #ccc;
					line-height: 30px;
				}
				.cmt-body {
					line-height:35px;
					text-indent: 2em;
				}
			}
		}
	}
</style>
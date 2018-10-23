<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for = 'item in newsList' :key = 'item.id'>
				<router-link :to="'/news/newsInfo/'+item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h2> {{item.title}} </h2>
						<p class="mui-ellipsis">
							<span>发表时间: {{item.add_time | dataFormat('YYYY-MM-DD')}} </span>
							<span>点击次数: {{item.click}} </span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default {
        name: "newsList",
        data(){
        	return {
        		newsList:[],
        	}
        },
        created(){
        	this.getNewsList()
        },
        methods: {
        	getNewsList(){
        		this.$http.get('api/getNewsList').then( result => {
        			if (result.body.status === 0) {
        				this.newsList = result.body.message;
        			}
        		})
        	}
        }
    }
</script>
<style scoped>
	.mui-table-view li h2 {
		font-size: 14px;
	}
	.mui-table-view li .mui-ellipsis {
		font-size: 12px;
		display: flex;
		justify-content: space-between;
		color: #226aff;
	}
</style>
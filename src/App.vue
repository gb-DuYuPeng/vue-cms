<template>
    <div class="app-container">
    	<!-- header -->
		<mt-header fixed title="首页"></mt-header>
		<h1>65465</h1>
    	<!-- router路由区域 -->

    	<!-- 底部tabar区域 -->
		<nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item" href="#tabbar">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">购物车</span>
			</a>
			<a class="mui-tab-item mui-active" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</a>
		</nav>
	</div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped>
	.app-container{
		padding-top: 40px;
	}
</style>
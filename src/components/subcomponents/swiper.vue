<template>
	<div>
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for = "item in bannerList" :key = 'item.id'>
				<img :src="item.img" :class = "{'full':isfull}">
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script type="text/javascript">
	export default {
		name :'swiper',
		props:['bannerList','isfull'],
	}
</script>
<style scoped>
	 .full {
        width: 100%;
    }
	.mint-swipe {
		text-align: center;
		height: 200px;
	}
	.mint-swipe img{
		height: 100%;
	}
</style>
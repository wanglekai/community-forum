<template>
	<view class="index-container">
		<!-- 首页顶部导航 -->
		<swiper
			class="index-swiper"
			:autoplay="true" 
			:interval="3000" 
			:duration="1000"
			:circular="true">
			<swiper-item class="swiper-item">
				<navigator 
					:url="'/pages/webview/webview?target='+encodeURI('http://www.baidu.com')">
					<image
					class="item-img"
					src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F911%2F111G5133543%2F15111G33543-1.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638202632&t=ec06698ad250f68cdf7ef7c8e72a7ae2" 
					mode="aspectFit"></image>
				</navigator>
			</swiper-item>
			<swiper-item>
				<image
					class="item-img"
					src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fphoto%2F2011-10-16%2Fenterdesk.com-7CB92AFE828D7295E2CA6E7FC3BF7B90.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638202632&t=2522f3407622ba2c4c04ef430a6c417e" 
					mode="aspectFit"></image>
			</swiper-item>
		</swiper>
		<!-- 首页导航切换 -->
		<view class="tag-nav-wrapper">
			<navigator
				class="tab-item"
				url="../feeds/feeds"
				open-type="switchTab">
				<image src="../../static/coffee.png" mode="aspectFit"></image>
				<text class="tag-name">精彩动态</text>
			</navigator>
			<navigator
				class="tab-item"
				url="../me/me"
				open-type="switchTab">
				<image src="../../static/ran.png" mode="aspectFit"></image>
				<text class="tag-name">个人中心</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
.index-swiper {
	width: 100%;
	.swiper-item {
		width: 100%;
		.item-img {
			width: 100%;
		}
	}
}
.tag-nav-wrapper {
	display: flex;
	justify-content: space-around;
	.tab-item {
		display: flex;
		align-items: center;
		position: relative;
		padding: 6px 30px;
		margin-top: -20px;
		border: 1px solid #808080;
		background-color: #fff;
		border-radius: 20px;
		
		image {
			width: 33px;
			height: 33px;
		}
		text {
			margin-left: 10px;
		}
	}
}
</style>

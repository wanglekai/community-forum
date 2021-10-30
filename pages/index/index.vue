<template>
	<view class="index-container">
		<!-- 首页顶部导航 -->
		<swiper 
			class="index-swiper"
			:autoplay="true" 
			:interval="3000" 
			:duration="1000" 
			:circular="true">
			<swiper-item 
				class="swiper-item"
				v-for="item in adList"
				:key="item.id">
				<navigator 
					:url=" item.data.link + encodeURI('http://www.baidu.com')">
					<image 
						class="item-img"
						:src="item.data.image"
						mode="aspectFit"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 首页导航切换 -->
		<view class="tag-nav-wrapper">
			<navigator class="tab-item" url="../feeds/feeds" open-type="switchTab">
				<image src="../../static/coffee.png" mode="aspectFit"></image>
				<text class="tag-name">精彩动态</text>
			</navigator>
			<navigator class="tab-item" url="../me/me" open-type="switchTab">
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
				title: 'Hello',
				adList: []
			}
		},
		onLoad() {
			this.getAdverts()
		},
		methods: {
			async getAdverts() {
				const res = await this.$u.api.getAdvert({
					space: '1,2,3'
				})
				
				// console.log('index', res)
				
				this.adList = res
			}
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

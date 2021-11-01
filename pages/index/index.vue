<template>
	<view class="index-container">	
		<uni-nav-bar :fixed="true" v-show="isShowTopBar">
			<view class="index-toggle-btns">
				<text :class="['tag', {'on': curIdx === 0}]" @tap="handleToggleTab(0)">推荐</text>
				<text :class="['tag', {'on': curIdx === 1}]" @tap="handleToggleTab(1)">资讯</text>
			</view>
		</uni-nav-bar>
		
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
					:url=" '/pages/webview/webview?target=' + encodeURI(item.data.link)">
					<image 
						class="item-img"
						:src="item.data.image"
						mode="aspectFill"></image>
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
		
		<!-- 切换标签 -->
		<view class="index-toggle-btns">
			<text :class="['tag', {'on': curIdx === 0}]" @tap="handleToggleTab(0)">推荐</text>
			<text :class="['tag', {'on': curIdx === 1}]" @tap="handleToggleTab(1)">资讯</text>
		</view>
		<swiper 
			class="content-wrapper"
			:interval="3000" 
			:duration="300" 
			:current="curIdx"
			:style="'height:' + swiperSliderHeight"
			@animationfinish="swiperSliderFinsh">
			<!-- 推荐内容 -->
			<swiper-item>
				<view class="swiper-item recommend" >
					<sns-waterfall v-model="feedList" ref="uWaterfall">
						<template v-slot:left="{leftList}">
							<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
								<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
								<u-lazy-load 
									threshold="-150" 
									border-radius="10" 
									class="main-img" 
									:image="item.image"
									:index="index"></u-lazy-load>
								<!-- <image
									class="main-img" 
									:src="item.image" 
									mode="aspectFill"></image> -->
								<view class="info-wrapper">
									<text class="title" v-text="item.title"></text>
									<view class="info-content">
										<view class="info-user">
											<image 
												class="icon icon-user" 
												:src="item.avatar" 
												mode="aspectFit"></image>
											<text class="nickname" v-text="item.nickname"></text>
										</view>
										<!-- <image class="icon icon-like" src="../../static/love.png"></image> -->
										<view 
										:class="['icon icon-like', { 'on': item.isLike }]" 
										@tap="handleLikeClick"></view>
									</view>
								</view>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
								<u-lazy-load
									threshold="-450" 
									border-radius="10" 
									class="main-img" 
									:image="item.image"
									:index="index"></u-lazy-load>
								<!-- <image
									class="main-img" 
									:src="item.image" 
									mode="aspectFill"></image> -->
								<view class="info-wrapper">
									<text class="title" v-text="item.title"></text>
									<view class="info-content">
										<view class="info-user">
											<image 
												class="icon icon-user" 
												:src="item.avatar" 
												mode="aspectFit"></image>
											<text class="nickname" v-text="item.nickname"></text>
										</view>
										<!-- <image class="icon icon-like" src="../../static/love.png"></image> -->
										<view 
										:class="['icon icon-like', { 'on': item.isLike }]" 
										@tap="handleLikeClick"></view>
									</view>
								</view>
							</view>
						</template>
					</sns-waterfall>
				</view>
			</swiper-item>
			
			<!-- 新闻列表 -->
			<swiper-item>
				<view 
					class="swiper-item news"
					v-for="item in newsList"
					:key="item.id">
					<view class="news-wrapper">
						<text class="news-title" v-text="item.title"></text>
						<view class="news-info">
							<text class="author" v-text="item.author"></text>
							<text class="new-time" v-text="item.created_at"></text>
						</view>
					</view>
					
					<!-- <view class="news-img"></view> -->
					<image 
						class="news-img"
						mode="aspectFill"
						:src="item.image"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import snsWaterfall from '@/components/sns-waterfall.vue'
	export default {
		components:{
			snsWaterfall
		},
		data() {
			return {
				curIdx: 0,
				adList: [],
				feedList: [],
				newsList: [],
				isLike: false,
				swiperSliderHeight: '0',
				swiperSliderFeedsHeight: '0',
				swiperSliderNewsHeight: '0',
				feedScrollTop: 0,
				newsScrollTop: 0,
				isShowTopBar: false
			}
		},
		onLoad() {
			this.getAdverts()
			this.getFeeds()
			this.getNews()
			
			uni.$on('swiperHeightChange', height =>{
				console.log(height)
				this.swiperSliderHeight = height + 150 + 'px'
				this.swiperSliderFeedsHeight = this.swiperSliderHeight
			})
		},
		// 监听用户下拉动作 
		onPullDownRefresh() {
			console.log('onPullDownRefresh')
			this.getAdverts()
			
			if (this.curIdx === 0) {
				this.$refs.uWaterfall.clear()
				this.getFeeds()
			} else {
				this.getNews()
			}
		},
		// 页面上拉触底事件的处理函数 
		onReachBottom() {
			// console.log('onReachBottom')
			// if (this.curIdx === 0) {
			// 	this.getFeeds()
			// 	this.swiperSliderFeedsHeight = this.swiperSliderHeight
			// } else {
			// 	this.getNews()
			// }
		},
		onPageScroll(e) {
			if (e.scrollTop >= 200) {
				this.isShowTopBar = true
			} else {
				this.isShowTopBar = false
			}
			
			if (this.curIdx === 0) {
				this.feedScrollTop = e.scrollTop
			} else {
				this.newsScrollTop = e.scrollTop
			}
		},
		methods: {
			// 获取首页顶部广告位列表
			async getAdverts() {
				const res = await this.$u.api.getAdvert({
					space: '1,2,3'
				})
				this.adList = res
			},
			// 获取推荐信息列表
			async getFeeds () {
				const { feeds } = await this.$u.api.getFeeds()
				
				const feedsList = feeds.map(item => {
					return {
						id: item.id,
						image: this.baseURL + item.images[0].file,
						nickname: item.user.name,
						avatar: item.user.avatar,
						title: item.feed_content,
						isLike: item.has_like
					}
				})
				
				this.feedList = [...this.feedList, ...feedsList]
			},
			// 获取首页资讯
			async getNews() {
				const result = await this.$u.api.getNews()
				
				const newsList = result.map(item => {
					return {
						id: item.id,
						title: item.title,
						author: item.author,
						created_at: item.created_at,
						image: this.baseURL + item.image.id
					}
				})
				
				this.newsList = [...this.newsList, ...newsList]
				
				this.swiperSliderNewsHeight = (this.newsList.length * 100) + 150 + 'px'
			},
			// 首页切换 推荐和资讯
			swiperSliderFinsh (swiper) {
				// console.log(swiper)
				let idx = swiper.detail.current
				this.handleToggleTab(idx)
			},
			handleToggleTab (idx) {
				console.log(idx)
				this.curIdx = idx
				if (idx === 0) {
					this.swiperSliderHeight = this.swiperSliderFeedsHeight
					uni.pageScrollTo({
						scrollTop: this.feedScrollTop,
						duration:0
					})
				} else {
					this.swiperSliderHeight = this.swiperSliderNewsHeight
					uni.pageScrollTo({
						scrollTop: this.newsScrollTop,
						duration:0
					})
				}
			},
			handleLikeClick () {
				this.isLike = !this.isLike
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-container {
		background-color: #eeebf0;
	}
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
		justify-content: space-around;;
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

	.index-toggle-btns {
		display: flex;
		justify-content: center;
		padding: 20upx;
		margin: 0 auto;

		.tag {
			font-size:20px;
			margin-right: 10px;
			&.on {
				color: $uni-color-primary;
			}
		}
	}
	
	.content-wrapper {

		.swiper-item.recommend {
			// margin-left: 10upx;
			margin-bottom: 10upx;
			border-radius: 20upx;
			overflow: hidden;
			
			.demo-warter {
				margin: 5px;
				background-color: #fff;
			}
			.info-wrapper {
				padding: 10upx;
				
				.main-img {
					width: 100%;
					border-radius: 20upx;
				}
				.title {
					// padding: 10upx 0 20upx;
				}
				.info-content {
					margin-top: 20upx;
					display: flex;
					justify-content: space-between;
					.info-user {
						display: flex;
						align-items: center;
						
						.nickname {
							// margin-left: 10upx;
						}
					}
					.icon-like {
						width: 40upx;
						height: 40upx;
						// background-color: #000;
						// background: url(../../static/love.png) no-repeat top center;
						background-image: url(../../static/love.png);
						background-repeat: no-repeat;
						background-size: 100%;
						
						&.on {
							background-image: url(../../static/lover.png);
						}
						// borr
					}
				}
			}
			
			// .icon-like {
			// 	width: 60upx;
			// 	height: 60upx;
			// }
		}
	
		.swiper-item.news {
			padding: 20upx;
			margin-bottom: 20upx;
			background-color: #fff;
			border-radius: 10upx;
			display: flex;
			justify-content: space-between;
			.news-wrapper {
				max-width: 550rpx;
				padding-right: 20upx;
				.news-title {
					@include line(2);
					font-size: 32upx;
					font-weight: bold;
				}
				
				.news-info {
					margin-top: 30upx;
					display: flex;
					justify-content: space-between;
					color: #b5b7bb;
				}
			}
			
			.news-img {
				width: 150upx;
				height: 150upx;
				background-color: #000;
			}
		}
	}
	.icon {
		width: 40upx;
		height: 40upx;
	}
</style>

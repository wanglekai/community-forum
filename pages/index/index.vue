<template>
	<view class="index-container">
		
		<!-- 顶部导航 -->
		<uni-nav-bar v-if="navBarShowTag">
			<view class="tabs-box">
				<view class="one-nav" :class="currentSwiperIndex === 0 ? 'nav-actived' : '' " @tap="swiperChange(0)">推荐</view>
				<view class="one-nav" :class="currentSwiperIndex === 1 ? 'nav-actived' : '' " @tap="swiperChange(1)">资讯</view>
			</view>
		</uni-nav-bar>
		
		<view class="header-box">
			<!-- 顶部广告位轮播图 -->
			<swiper 
				class="swiper" 
				:indicator-dots="false" 
				:autoplay="true" 
				:interval="2500" 
				:duration="500">
				<swiper-item v-for="item in swiperAdList" :key="item.id">
					<navigator open-type="navigate" :url=" '/pages/webview/webview?url='+item.link">
						<image class="banner-swiper-img" :src="item.image" mode="aspectFill" />
					</navigator>
				</swiper-item>
			</swiper>
			<!-- 遮罩使用弧形框 -->
			<image class="crile" src="@/static/crile.png" mode="aspectFill" />
			
			<!-- 两个选项按钮 -->
			<view class="card-header">
				<view class="card-one card-left" @tap="gotoFeeds('/pages/feeds/feeds')">
					<image class="img" src="@/static/coffee.png" mode="aspectFill" />
					<view class="iright">
						<view class="title">精彩动态</view>
					</view>
				</view>
				<view class="card-one card-right" @tap="gotoFeeds('/pages/me/me')">
					<image class="img" src="@/static/ran.png" mode="aspectFill" />
					<view class="iright">
						<view class="title">个人中心</view>
					</view>
				</view>
			</view>

			<!-- Tab 选项卡 -->
			<view class="tabs-box">
				<view 
					class="one-nav" 
					:class="!isOn ? 'nav-actived' : '' " 
					@tap="toggleTag(0)">推荐</view>
				<view 
					class="one-nav" 
					:class="isOn ? 'nav-actived' : '' " 
					@tap="toggleTag(1)">资讯</view>
			</view>
		</view>

		<view class="content-wrapper" :class="{on: isOn}">
			<!-- 推荐列表 -->
			<view class="feeds-box">
				<waterfall-sns v-model="feedsList" :addTime="200" ref="waterfall">
					<template v-slot:left="{leftList}">
						<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
							<navigator open-type="navigate" :url=" '/subpages/feedinfo/feedinfo?id=' + item.id">
								<!-- <image class="feed-img" :src="item.cover" mode="widthFix" :lazy-load="true" /> -->
								<u-lazy-load threshold="-450" border-radius="10" :image="item.cover" :index="index"></u-lazy-load>
								<view class="u-line-2 feed-title" v-if="!!item.feed_content">{{ item.feed_content }}</view>
								<view class="feed-info">
									<view class="iview">
										<image class="avatar" :src=" item.avatar" />
										<text class="name u-line-1">{{ item.name }}</text>
									</view>
									<view class="iview">
										<view class="ilike" @tap.stop="clickLove(item)">
											<image v-if="item.has_like" src="@/static/lover.png" class="micon" />
											<image v-else src="@/static/love.png" class="micon" />
											<text class="love-count" v-if="item.like_count>0">{{ item.like_count }}</text>
										</view>
									</view>
								</view>
							</navigator>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
							<navigator open-type="navigate" :url=" '/subpages/feedinfo/feedinfo?id=' + item.id">
								<!-- <image class="feed-img" :src="item.cover" mode="widthFix" :lazy-load="true" /> -->
								<u-lazy-load threshold="-450" border-radius="10" :image="item.cover" :index="index"></u-lazy-load>
								<view class="u-line-2 feed-title" v-if="!!item.feed_content">{{ item.feed_content }}</view>
								<view class="feed-info">
									<view class="iview">
										<image class="avatar" :src=" item.avatar" />
										<text class="name u-line-1">{{ item.name }}</text>
									</view>
									<view class="iview">
										<view class="ilike" @tap.stop="clickLove(item)">
											<image v-if="item.has_like" src="@/static/lover.png" class="micon" />
											<image v-else src="@/static/love.png" class="micon" />
											<text class="love-count" v-if="item.like_count>0">{{ item.like_count }}</text>
										</view>
									</view>
								</view>
							</navigator>
						</view>
					</template>
				</waterfall-sns>
			</view>
			
			<!-- 资讯列表 -->
			<view class="sns-news" v-for="(item, index) in newsList" :key="index">
				<navigator class="one-new" open-type="navigate" :url=" '/subpages/newinfo/newinfo?id=' + item.id">
					<view class="left">
						<view class="title u-line-2">{{item.title}}</view>
						<view class="uinfo">
							<view class="iview">
								<view class="utime">
									<text class="name">{{ item.author }}</text>
								</view>
							</view>
							<text class="uptime">{{ item.created_at  }}发布</text>
						</view>
					</view>
					<view class="right">
						<image class="pic" mode="aspectFill" :src="item.cover" />
					</view>
				</navigator>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import WaterfallSns from '@/components/waterfall-sns/index.vue'

	export default {
		components: {
			WaterfallSns
		},
		data() {
			return {
				// navBar 显示状态控制
				navBarShowTag: false,
				// 顶部 轮播图列表
				swiperAdList: [],
				// 动态列表数据
				feedsList: [],
				// 资讯列表数据
				newsList: [],
				// 当前 推荐 资讯 滑动位置
				currentSwiperIndex: 0,
				// 滑动页面轮播器的高度
				swiperSliderHeight: '500px',
				swiperSliderFeedsHeight: 0,
				swiperSliderNewsHeight: 0,
				// 记录滚动所在的位置
				oldFeedsScrollTop: 0,
				oldNewsScrollTop: 0,
				isOn: false
			}
		},
		onLoad() {
			this.getAdverts()
			this.getFeedsList()
			this.getNewsList()
		},
		onPageScroll(event) {
			if (this.currentSwiperIndex === 0) {
				this.oldFeedsScrollTop = event.scrollTop
			} else {
				this.oldNewsScrollTop = event.scrollTop
			}
			if (event.scrollTop > 220) {
				this.navBarShowTag = true
			} else {
				this.navBarShowTag = false
			}
		},
		methods: {
			// 请求 广告轮播图信息
			async getAdverts() {
				let adverts = await this.$u.api.getAdvert({
					space: '1,2,3'
				})
				this.swiperAdList = adverts.map(item => {
					return {
						id: item.id,
						link: item.data.link,
						image: item.data.image
					}
				})
			},
			// 请求 feeds 列表数据
			async getFeedsList() {
				let feeds = await this.$u.api.getFeeds()
				// console.log(feeds)
				let feedList = feeds.feeds.map(item => {
					return {
						...item,
						cover: this.BaseFileURL + item.images[0].file,
						avatar: !!item.user.avatar ? item.user.avatar.url : '/static/nopic.png',
						name: item.user.name,
					}
				})
				this.feedsList = [...this.feedsList, ...feedList]
				// 在这里注册一个 uniAPP 的顶层事件，用来作为数据通信
				uni.$once("swiperHeightChange", height => {
					console.log('计算出来的高度为:'+ height)
					this.swiperSliderFeedsHeight = height
					this.swiperSliderHeight = height
				})
			},
			// 请求资讯列表数据
			async getNewsList() {
				let news = await this.$u.api.getNews()
				let newsList = news.map(item => {
					return {
						...item,
						cover: this.BaseFileURL + item.image.id
					}
				})

				this.newsList = [...this.newsList, ...newsList]
				this.swiperSliderNewsHeight = this.newsList.length * 95 + 100 + 'px'
				this.swiperSliderHeight = this.swiperSliderNewsHeight
			},
			// 页面滑动左右分页的时候实现的效果
			swiperSlider(event) {
				if (event.detail.current === 0) {
					this.swiperSliderHeight = this.swiperSliderFeedsHeight
					uni.pageScrollTo({
						duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
						scrollTop: this.oldFeedsScrollTop, //滚动到目标位置
					})
				} else {
					this.swiperSliderHeight = this.swiperSliderNewsHeight
					uni.pageScrollTo({
						duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
						scrollTop: this.oldNewsScrollTop, //滚动到目标位置
					})
				}
				this.currentSwiperIndex = event.detail.current
			},
			// 点击按钮实现切换效果
			swiperChange(index) {
				if (index === 0) {
					this.swiperSliderHeight = this.swiperSliderFeedsHeight
					uni.pageScrollTo({
						duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
						scrollTop: this.oldFeedsScrollTop, //滚动到目标位置
					})
				} else {
					this.swiperSliderHeight = this.swiperSliderNewsHeight
					uni.pageScrollTo({
						duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
						scrollTop: this.oldNewsScrollTop, //滚动到目标位置
					})
				}
				this.currentSwiperIndex = index
			},
			gotoFeeds(url) {
				uni.switchTab({
					url
				})
			},
			toggleTag (i) {
				if (i === 1) {
					this.isOn = true
				} else {
					this.isOn = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#sns {
		background-color: #f1f1f1;
	}

	// 推荐、咨询 按钮样式
	.tabs-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 750upx;

		.one-nav {
			width: 120upx;
			color: #9B9B9B;
			font-size: 36upx;
			text-align: center;
			font-weight: blod;

			&.nav-actived {
				color: #0050FF;
			}
		}
	}

	.header-box {
		position: relative;
		left: 0;
		height: 500upx;
		background-color: #f1f1f1;
		z-index: 1;

		// 广告位轮播器相关样式
		.swiper {
			width: 750upx;
			height: 400upx;
			position: absolute;
			left: 0;
			top: 0;
			text-align: center;
			z-index: 1;

			.banner-swiper-img {
				width: 750upx;
				height: 400upx;
				box-shadow: 0 0 2px 0 rgb(188, 188, 188);
			}
		}

		.crile {
			width: 750upx;
			height: 50upx;
			position: absolute;
			left: 0;
			top: 355upx;
			z-index: 9;
		}

		// 新鲜事 活动墙 按钮样式
		.card-header {
			position: absolute;
			left: 0;
			top: 320upx;
			height: 160upx;
			z-index: 99;
			width: 710upx;
			margin-left: 20upx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			align-content: center;

			.card-one {
				width: 328upx;
				height: 96upx;
				border-radius: 49upx;
				background-color: #fff;
				margin: 0 10upx;
				box-shadow: 0 0 2px 0 rgb(188, 188, 188);
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-items: center;
				align-content: center;

				.img {
					width: 44upx;
					height: 44upx;
					margin-left: 50upx;
				}

				.iright {
					margin-left: 30upx;
					text-align: left;
					color: #888;

					.title {
						font-size: 30upx;
						color: #001432;
					}

					.iview {
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						justify-content: space-between;
						align-items: center;
						align-content: center;
						font-size: 20upx;
						margin-top: -5upx;
					}
				}
			}
		}

		// 推荐、咨询 按钮样式
		.tabs-box {
			width: 750upx;
			position: absolute;
			z-index: 1;
			left: 0;
			top: 480upx;
			display: flex;
			flex-direction: row;
			justify-content: center;

			.one-nav {
				height: 80upx;
				width: 110upx;
				color: #9B9B9B;
				font-size: 36upx;
				text-align: center;
				font-weight: blod;

				&.nav-actived {
					color: #0050FF;
				}
			}
		}
	}

	// 此刻 栏目样式\
	.swiper-box {
		background-color: #f1f1f1;
		padding: 60upx 0 40upx;
	}
	
	.content-wrapper {
		position: relative;
		width: 1500upx;
		overflow: hidden;
		transition: .3s ease-in;
		left: 0;
		
		&.on {
			left: -100%;
		}
		
		.feeds-box {
			float: left;
			width: 50%;
		}
		
		.sns-news {
			float: right;
			width: 50%;
		}
		
	}

	// 资讯列表
	.sns-news {
		background-color: #fff;
		width: 750upx;

		.one-new {
			width: 700upx;
			height: 74px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: flex-start;
			align-content: center;
			padding-bottom: 10px;
			padding-top: 10px;
			padding-left: 25upx;
			padding-right: 25upx;
			border-bottom: 1px solid #f1f1f1;

			.left {
				width: 490upx;
				height: 140upx;
				text-align: left;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;

				.title {
					font-size: 30upx;
					line-height: 42upx;
					color: #001432;
					margin-top: 21upx;
				}

				.uinfo {
					width: 490upx;
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: space-between;
					align-items: center;
					align-content: center;
					margin-top: 6upx;
					font-size: 20upx;
					color: #999;

					.utime {
						font-size: 24upx;

						.name {
							max-width: 120upx;
							color: #777;
						}
					}
				}
			}

			.right {
				width: 120upx;

				.pic {
					width: 120upx;
					height: 120upx;
					margin-top: 20upx;
					border-radius: 6upx;
				}
			}
		}
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}
	
	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}
	
	.demo-image {
		width: 100%;
		border-radius: 4px;
	}
	
	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}
	
	.demo-tag {
		display: flex;
		margin-top: 5px;
	}
	
	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}
	
	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}
	
	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}
	
	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
	
	// .avatar 
	
	.feed-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.avatar, .micon {
		width: 40upx;
		height: 40upx;
	}

</style>

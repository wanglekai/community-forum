<template>
	<view class="feeds-container">
		<view 
			class="grid-wrapper"
			v-for="(item, i) in feedsList"
			:class="(i % 2 === 0) ? 'grid-big-left' : 'grid-big-right'  "
			:key="i">
			<view 
				class="grid-item"
				v-for="grid in item"
				:key="grid.id">
				<image 
					class="grid-image"
					:src="grid.image" 
					mode="widthFix"></image>
				</view>
		</view>

	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getFeedsList()
		},
		data() {
			return {
				feedsList: []
			}
		},
		methods: {
			async getFeedsList () {
				const showList = []
				
				const { feeds } = await this.$u.api.getFeeds({
					limit: 12
				})
				let k = 0
				for (let i = 1, len = feeds.length; i <= len; i ++) {
					if ( (i % 6) === 0) {
						// showList.push(feeds.slice(k, k+6))
						let list = feeds.slice(k, k + 6)
						list.forEach(item => {
							item.image = this.baseURL + item.images[0].file
						})
						showList.push(list)
						k += 6
					}
				}
				
				console.log(showList)
				this.feedsList = showList
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.feeds-container {
	.grid-wrapper {
		display: grid;
		grid-template-columns: auto auto auto;	
		// margin-bottom: 2upx;
		.grid-item {
			// background-color: #333;
			margin: 1upx;
			height: 33.33vw;
			
			.grid-image {
				width: 100%;
			}
			
			&:first-child {
				// background-color: #ff0000;
				height: 66.7vw;
			}
		}

		&.grid-big-left .grid-item {
			&:first-child {
				grid-column: 1 / 3;
				grid-row: 1 / 3;
			}	
		}
		&.grid-big-right .grid-item {
			&:first-child {
				grid-area: 1 / 2 / 3 / 4;
			}	
		}
	}
}
</style>

<template>
	<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			// console.log(options)
			this.url = decodeURI(options.target)
		},
		data() {
			return {
				url: ''
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

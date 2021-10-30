const install = (Vue, vm) => {
	let api = {}
	// 获取广告位列表信息
	api.getAdvert = params => vm.$u.get('/advertisingspace/advertising',
		params)
	api.getFeeds = params => vm.$u.get('/feeds', params) // 获取资讯列表信息
	api.getNews = params => vm.$u.get('/news', params)
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即 this.$u.api)下
	vm.$u.api = api
}
export default {
	install
}

export default function (obj){
	var url = "http://waterapi.qijiatech.com";
	uni.showLoading({
		title: '加载中',
		mask:true
	});
	uni.request({
		url: url+obj.url,
		data: obj.data,
		method:obj.method,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		success: (d) => {
			obj.success(d.data)
		},
		fail(e) {
			console.log(e)
			uni.showToast({
				title:e.StatusMsg,
				duration:2000,
				icon:'none'
			})
		},
		complete(){
			uni.hideLoading()
		}
	});
}
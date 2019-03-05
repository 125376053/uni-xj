<template>
	<view>
		<button @click="wenjian">获取文件信息</button>
		<view v-for="(item,index) in infor" :key="index">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:'',
				infor:''			
			};
		},
		methods: {
			wenjian() {
				var self = this;
				uni.showLoading({
					title:'加载中，请稍后',
					mask:true
				})
				// 远程下载文档
				uni.downloadFile({
					url: 'http://hm4-test.haomai-mrm.com/api/balance/balanceDetailListExcel?startDate=&endDate=&page=1&limit=10&empId=539&companyId=1',
					success: function(res) {
						var filePath = res.tempFilePath;
						self.src = filePath
						
						// 获取文档信息
						uni.getFileInfo({
							filePath: filePath,
							success(res) {
								console.log(res)
								self.infor = res
								uni.showToast({
									title:'获取文档信息成功',
									success() {
										// 直接打开文档
										uni.openDocument({
											filePath: filePath,
											fileType: 'xlsx',
											success: function(res) {
												console.log(res)
												uni.showToast({
													title:'打开文档成功'
												})
											},
											fail(e){
												uni.showToast({
													title:'打开文档失败'
												})
											}
										});
									}
								})
							},
							fail() {
								uni.showToast({
									title:'获取文档信息失败'
								})
							}
						})
					},
					fail() {
						uni.showToast({
							title:'下载失败'
						})
					},
					complete() {
						uni.hideLoading()
					}
				});
			}
		}
	}
</script>

<style>

</style>

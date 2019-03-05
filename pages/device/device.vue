<template>
	<view>
		<button @click="saoma">扫码</button>
		<view v-for="(item,index) in infor" :key="index">
			{{item}}
		</view>
		<button @click="tel">拨打电话</button>
		<button @click="getTelInfor">获取系统信息</button>
		<view v-for="(item,index) in telInfor" :key="index">
			{{item}}
		</view>
		<button @click="addPepole">手机通讯录添加联系人</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infor: {},
				telInfor: {}
			};
		},
		methods: {
			saoma() {
				uni.scanCode({
					// onlyFromCamera: true,
					success: (res) => {
						this.infor = res
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			tel() {
				uni.makePhoneCall({
					phoneNumber: '13546583152',
					success() {
						uni.showModal({
							title: '你是否要拨打电话',
							content: '13546583152',
							success() {
								uni.showToast({
									title: '电话拨打成功'
								})
							}
						})
					}
				})
			},
			getTelInfor() {
				uni.getSystemInfo({
					success: (res) => {
						this.telInfor = res
						console.log(res.model);
						console.log(res.pixelRatio);
						console.log(res.windowWidth);
						console.log(res.windowHeight);
						console.log(res.language);
						console.log(res.version);
						console.log(res.platform);
					}
				});
			},
			addPepole() {
				uni.addPhoneContact({
					nickName: '张超杰--',
					lastName: '张',
					firstName: '超杰',
					remark: '我自己',
					mobilePhoneNumber: '13546583152',
					weChatNumber: '张超杰',
					success: function() {
						uni.showToast({
							title: '写入通讯录成功'
						})
					},
					fail: function() {
						uni.showToast({
							title: '写入通讯录失败'
						})
					}
				});
			}
		}
	}
</script>

<style>

</style>

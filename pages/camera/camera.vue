<template>
	<view>
		<!-- 这个拍照可以用下面的实现 -->
		<!-- <camera device-position="back" flash="off" @error="error" style="width: 100%; height: 300px;"></camera>
		<button type="primary" @click="takePhoto">拍照</button>
		<view>预览</view>
		<image mode="widthFix" :src="src"></image> -->

		<!-- 5+app端 拍照 录像-->
		<button @click="paizhao">app拍照用小程序选择图片api</button>
		<image :src="urls"></image>
		<button @click="luxiang">app录像用小程序选择视频</button>
		<video :src="video"></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: "",
				urls: '',
				video:''
			}
		},
		methods: {
			takePhoto() {
				const ctx = uni.createCameraContext();
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						this.src = res.tempImagePath
					}
				});
			},
			error(e) {
				console.log(e.detail);
			},

			// app 拍照
			paizhao() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						// 预览图片
						uni.previewImage({
							urls: res.tempFilePaths
						});
						console.log(JSON.stringify(res.tempFilePaths));
					}
				})
			},
			luxiang() {
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: (res) => {
						this.video = res.tempFilePath;
					}
				});
			}
		}
	}
</script>

<style>

</style>

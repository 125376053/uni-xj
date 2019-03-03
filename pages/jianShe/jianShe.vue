<template>
	<div class="overAuto2">
		<div class="yunxing">
			<div class="jianshe">
				<div class="jianshe_bottom JustifyFlex">
					<div class="index_text">
						<b>{{ jianSheObj.totoalmianji }}</b>
						<span>项目规模</span>
					</div>
					<div class="index_text">
						<b>{{ jianSheObj.totoalcount }}</b>
						<span>安装设备数量</span>
					</div>
				</div>
			</div>

			<ul class="tableUl">
				<li>
					<span>设施/设备名称</span>
					<span>规模/数量</span>
				</li>
				<li v-for="(item, index) in jianSheObj.datalist">
					<span class="ellipse">{{ item.Name }}</span>
					<span>{{ item.NameVal }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
	name: '',
	data() {
		return {
			title: '建设情况',
			jianSheObj: {}
		};
	},
	computed: {
		...mapGetters(['user'])
	},
	methods: {
		getData() {
			this.request({
				url: '/api/Sheshi/JianSheQingkuang?ticket=' + this.user.ticket,
				data: {},
				method: 'post',
				success: d => {
					if (d.IsError > 0) {
						uni.showToast({
							title: d.StatusMsg,
							duration: 2000,
							icon: 'none'
						});
						return false;
					} else {
						this.jianSheObj = d.Model || null;
					}
				}
			});
		}
	},
	mounted() {
		this.getData();
	}
};
</script>

<style scoped>
.index_text {
	width: 335rpx;
	height: 130rpx;
	background: #3eaeff;
	border-radius: 5px;
	color: #fff;
	text-align: center;
}
.index_text b {
	display: block;
	font-size: 50rpx;
	line-height: 0;
	margin-top: 50rpx; /*border-bottom: 1px solid red;*/
}
.index_text span {
	display: block;
	font-size: 28rpx;
	line-height: 0;
	margin-top: 50rpx; /*border-bottom: 1px solid green;*/
}
</style>

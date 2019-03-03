<template>
	<div class="overAuto2">
		<div class="yunxing">
			<div class="yunZhuan JustifyFlex">
				<div class="p1">
					<p class="number">{{ yunXingObj.Normal }}</p>
					<p class="text">正常设备</p>
				</div>
				<div class="yunzhuanlv">
					<p id="tijiaoProcess1">
						<span>{{ normalScale }}%</span>
					</p>
					<p class="huanText">正常运转率</p>
				</div>

				<div class="p1">
					<p class="number">{{ yunXingObj.Trouble }}</p>
					<p class="text">故障设备</p>
				</div>
			</div>

			<ul class="tableUl2">
				<li>
					<span>设备名称</span>
					<span>运转正常数</span>
					<span>运转故障数</span>
				</li>

				<li v-for="(item, index) in yunXingObj.DataList">
					<span class="ellipse">{{ item.SheBeiname }}</span>
					<span>{{ item.Normal }}</span>
					<span>{{ item.Trouble }}</span>
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
			title: '运行情况',
			yunXingObj: {},
			normalScale: 0
		};
	},
	mounted() {
		this.getData();
	},
	computed: {
		...mapGetters(['user'])
	},
	methods: {
		getData() {
			this.request({
				url: '/api/Sheshi/YunxingQingKuang?ticket=' + this.user.ticket,
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
						this.yunXingObj = d.Model || null;
						this.normalScale = (
							(this.yunXingObj.Normal / this.yunXingObj.TotalCount) *
							100
						).toFixed(2);
					}
				}
			});
		}
	}
};
</script>

<style scoped>
#tijiaoProcess1 {
	position: relative;
}
#tijiaoProcess1 span {
	font-size: 55rpx;
	position: absolute;
	left: 0;
	right: 0;
	text-align: center;
	top: 0;
	bottom: 0;
	margin-top: 70rpx;
}
</style>

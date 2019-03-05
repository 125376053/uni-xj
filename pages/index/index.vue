<template>
	<div v-if="user">
		<div class="indexWrap">
			<div class="index_top">
				<p>
					<navigator url="/pages/device/device" style="width: 344rpx;height: 165rpx;display: block;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;">
						<img src="/static/images/weihu1.png" alt="" />
						<span>本地能力</span>
					</navigator>
				</p>

				<p>
					<navigator url="/pages/camera/camera" style="width: 344rpx;height: 165rpx;display: block;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;">
						<img src="/static/images/weihu2.png" alt="" />
						<span>拍照录像</span>
					</navigator>
				</p>

				<!-- :to="{ path: '/renwuManage?step=1' }" -->
				<p class="xiaoxiListWrap">
					<navigator url="/pages/zhibo/zhibo" style="width: 344rpx;height: 165rpx;display: block;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;">
						<img src="/static/images/weihu3.png" alt="" />
						<span>文件操作</span>
						<i class="xiaoxiList1">{{ renwuNum }}</i>
					</navigator>
				</p>

				<p>
					<navigator url="/pages/echarts/echarts" style="width: 344rpx;height: 165rpx;display: block;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;">
						<img src="/static/images/weihu4.png" alt="" />
						<span>实时监测</span>
					</navigator>
				</p>
			</div>

			<div class="jianshe">
				<p class="jianshe_top">
					<span class="shuIcon"></span>
					<b>建设情况</b>
				</p>
				<div class="jianshe_bottom">
					<navigator url="/pages/jianShe/jianShe" class="JustifyFlex">
						<div class="index_text">
							<b>{{ jianSheObj.totoalmianji }}</b>
							<span>项目规模</span>
						</div>
						<div class="index_text">
							<b>{{ jianSheObj.totoalcount }}</b>
							<span>安装设备数量</span>
						</div>
					</navigator>
				</div>
			</div>

			<div class="jianshe jiansheNomargin">
				<p class="jianshe_top">
					<span class="shuIcon"></span>
					<b>运行情况</b>
				</p>
				<div class="yunZhuan">
					<navigator url="/pages/yunxing/yunxing" class="yunxingLink JustifyFlex">
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
					</navigator>
				</div>
			</div>
		</div>

		<FooterNav :MessageLength="messageNum" :MyLength="renwuNum"></FooterNav>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Footer from "../../components/Footer.vue"
export default {
	components: {
		FooterNav: Footer
	},
	data() {
		return {
			title: '首页',
			isShowRe: true,
			jianSheObj: {},
			yunXingObj: {},
			normalScale: 0,
			renwuNum: 0,
			messageNum: 0
		};
	},
	computed: {
		...mapGetters(['user'])
	},
	onLoad() {
		if(this.user){
			this.jianSheData();
			this.yunXingData();
		}
	},
	methods: {
		jianSheData() {
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
		},
		yunXingData() {
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

<template>
	<div>
		<div class="yh_list xiaoxiGuanli">
			<ul>
				<li
					class="JustifyFlex"
					:key="index"
					:id="item.WorkOrderId"
					v-for="(item, index) in MessageList"
					@click="gotoXq(item)"
				>
					
					<div class="left"><img v-if="true" :src="imgsType[item.OrderType - 1]"/></div>
					<div class="right">
						<p class="title ellipse">{{ item.OrderRemark }}</p>
						<p class="dataAndText JustifyFlex">
							<span
								class="ellipse"
								style="display:inline-block;width:320rpx;font-size:28rpx;"
							>
								{{ item.Address || '' }}
							</span>
							<span>{{ item.ReportTime }}</span>
						</p>
					</div>
				</li>
			</ul>
		</div>

		<FooterNav :MessageLength="messageNum" :MyLength="renwuNum"></FooterNav>
	</div>
</template>
<script>
import Footer from '../../components/Footer.vue';
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
	components: {
		FooterNav: Footer
	},
	data() {
		return {
			title: '消息管理',
			imgsType: [
				'/static/images/yhicon1.jpg', //1报警图标 static目录下的不需要模块打包进入
				'/static/images/yhicon2.jpg', //2维护图标
				'/static/images/yhicon3.jpg', //3工单
				'/static/images/yhicon4.jpg' //4 科目
			],
			//设施id 空是片区 跳转到选择设施
			sheshiId: '',
			MessageList: [],
			pullUpLoad: true,
			pageInfo: {},
			pageIndex: 1,
			pageSize: 10,
			getRelateId: 0
		};
	},
	computed: {
		...mapGetters(['user'])
	},
	onPullDownRefresh() {
		console.log('下拉刷新只能用页面的行为');
		//如果还有下一页
		if (this.pageInfo.PageCount > this.pageIndex) {
			this.pageIndex++;
			this.getData();
		} else {
			//如果没有新数据
			uni.stopPullDownRefresh()
		}
	},
	onReachBottom() {
		console.log('上拉触底不能用内部滚动条');
	},
	methods: {
		getRelateIdFn() {
			this.request({
				url: '/api/XunchaPlan/GetTempPlanId?ticket=' + this.user.ticket,
				data: {},
				method: 'get',
				success: d => {
					if (d.IsError > 0) {
						uni.showToast({
							title: d.StatusMsg,
							duration: 2000,
							icon: 'none'
						});
						return false;
					} else {
						this.getRelateId = d.Model;
					}
				}
			});
		},
		getData() {
			this.request({
				url:'/api/WorkOrder/GetItemListPage?pageindex=' +this.pageIndex +'&pagesize=' +this.pageSize +'&ticket=' +this.user.ticket,
				data: {},
				method: 'get',
				success: d => {
					if (d.IsError > 0) {
						uni.showToast({
							title: d.StatusMsg,
							duration: 2000,
							icon: 'none'
						});
					} else {
						if (d.Model) {
							this.MessageList = this.MessageList.concat(d.Model.DataList || []);
							this.pageInfo = d.Model.PageInfo || [];
							uni.stopPullDownRefresh()
						}
					}
				}
			});
		},
		gotoXq(item) {
			console.log(item);
			uni.navigateTo({
				url:
					'/pages/selectSheshi/selectSheshi?RelateId=' + item.RelateId ||
					this.getRelateId + '&WorkOrderId=' + item.WorkOrderId
			});
		}
	},
	mounted() {
		this.getData();
		this.getRelateIdFn();
	}
};
</script>
<style scoped>
.wrapper {
	top: 0 !important;
	bottom: 120rpx !important;
}
</style>

<template>
	<div class="overAuto2">
		<div class="rc">
			<ul>
				<li
					:key="index"
					v-for="(item, index) in sheshiList"
					class="JustifyFlex"
				>
					<span class="wt">{{ item.SheshiName }}</span>
					<img class="jt" src="/static/images/myLeft.jpg" />
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
			title: '巡检',
			sheshiList: []
		};
	},
	computed: {
		...mapGetters(['user'])
	},
	methods: {
		getData() {
			this.request({
				url: '/api/Sheshi/AllSheShi?ticket=' + this.user.ticket,
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
						this.sheshiList = d.Model || [];
					}
				}
			})
		}
	},
	mounted() {
		this.getData();
	}
};
</script>

<style></style>

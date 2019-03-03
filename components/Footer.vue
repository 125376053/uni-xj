<template>
	<div class="orderFooter" ref="footer">
		<ul>
			<li @click="changeIndex(0, '/pages/index/index')">
				<p :class="{ currentStyle: currIndex2 == 0 }">
					<b class="first1" :class="{ first11: currIndex == 0 }"></b>
					<span>首页</span>
				</p>
			</li>

			<li @click="changeIndex(1, '/pages/message/message')">
				<p :class="{ currentStyle: currIndex2 == 1 }">
					<b class="sencond1" :class="{ sencond11: currIndex == 1 }"></b>
					<span>消息</span>
					<i v-if="MessageLength > 0" class="xiaoxiList">
						{{ MessageLength <= 99 ? MessageLength : '99' + '+' }}
					</i>
				</p>
			</li>

			<li @click="changeIndex(2, '/pages/selectSheshi/selectSheshi')">
				<p :class="{ currentStyle: currIndex2 == 2 }">
					<b class="three1" :class="{ three11: currIndex == 2 }"></b>
					<span>巡检</span>
				</p>
			</li>
			<li @click="changeIndex(3, '/pages/my/my')">
				<p :class="{ currentStyle: currIndex2 == 3 }">
					<b class="four1" :class="{ four11: currIndex == 3 }"></b>
					<span>我的</span>
					<i v-if="MyLength > 0" class="xiaoxiList">{{ MyLength }}</i>
				</p>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	props: {
		MessageLength: {
			default: 0
		},
		MyLength: {
			default: 0
		}
	},
	data() {
		return {
			currIndex: 0,
			currIndex2: 0
		};
	},
	methods: {
		changeIndex(index, path) {
			this.currIndex = index;
			this.currIndex2 = index;

			if (index == 2) {
				//跳转路由后 点击状态消失
				uni.navigateTo({
					url:path+'?RelateId=""&WorkOrderId=""'
				})
			} else {
				//跳转路由后 点击状态消失
				uni.navigateTo({
					url:path
				})
			}
		}
	},
	mounted() {
		let pages = getCurrentPages()
		let currPage = null;
		let path = ''
		if (pages.length) {
		   currPage = pages[pages.length - 1];
		   path = currPage.route
		}
		console.log(path) 
		
		//打开页面保存点击状态高亮
		if (path == 'pages/index/index') {
			this.currIndex = 0;
			this.currIndex2 = 0;
		} else if (path == 'pages/message/message') {
			this.currIndex = 1;
			this.currIndex2 = 1;
		} else if (path == 'pages/selectSheshi/selectSheshi') {
			this.currIndex = 2;
			this.currIndex2 = 2;
		} else if (path == 'pages/my/my') {
			this.currIndex = 3;
			this.currIndex2 = 3;
		}
	}
};
</script>
<style scoped>
li > p {
	text-align: center;
}
b {
	display: inline-block;
}
.first1 {
	width: 53rpx;
	height: 53rpx;
	background: url('http://waterh5.qijiatech.com/static/images/01.jpg') no-repeat;
	background-size: 100% 100%;
}
.first11 {
	width: 53rpx;
	height: 53rpx;
	background: url('http://waterh5.qijiatech.com/static/images/1.jpg') no-repeat;
	background-size: 100% 100%;
}
.sencond1 {
	width: 53rpx;
	height: 53rpx;
	background: url('http://waterh5.qijiatech.com/static/images/02.jpg') no-repeat;
	background-size: 100% 100%;
}
.sencond11 {
	width: 53rpx;
	height: 53rpx;
	background: url('http://waterh5.qijiatech.com/static/images/2.jpg') no-repeat;
	background-size: 100% 100%;
}
.three1 {
	width: 53rpx;
	height: 53rpx;
	background: url('http://waterh5.qijiatech.com/static/images/03.jpg') no-repeat;
	background-size: 100% 100%;
}
.three11 {
	width: 53rpx;
	height: 53rpx;
	background: url('http://waterh5.qijiatech.com/static/images/3.jpg') no-repeat;
	background-size: 100% 100%;
}
.four1 {
	width: 53rpx;
	height: 53rpx;
	background: url('http://waterh5.qijiatech.com/static/images/04.jpg') no-repeat;
	background-size: 100% 100%;
}
.four11 {
	width: 53rpx;
	height: 53rpx;
	background: url('http://waterh5.qijiatech.com/static/images/4.jpg') no-repeat;
	background-size: 100% 100%;
}
</style>

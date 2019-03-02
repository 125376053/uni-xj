<template>
    <div>
        <div class="bigImg centerFlex">
            <div class="myTou JustifyFlex">
                <p class="left">
                    <img src="/static/images/myTou.png" alt="">
                </p>
                <div class="right" v-if="userObj">
                    <p class="title">{{userObj.TrueName}}</p>
                    <p>
                        <span>{{userObj.RoleName}}</span>
                        <span>丨</span>
                        <span>{{userObj.LastLoginTime}}</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="rc" style="background:#f0f2f5;">
            <ul>
                <li class="li JustifyFlex">
                    <img class="bq" src="/static/images/my4.jpg">
                    <span class="wt">帮助文档</span>
                    <img class="jt" src="/static/images/myLeft.jpg">
                </li>

                <li class="li JustifyFlex">
                    <img class="bq" src="/static/images/my5.jpg">
                    <span class="wt">关于应用</span>
                    <img class="jt" src="/static/images/myLeft.jpg">
                </li>
            </ul>

            <div class="logout" v-if="user" @click="logout">退出登录</div>

        </div>

        <FooterNav :MessageLength="messageNum" :MyLength="renwuNum"></FooterNav>

        <!--弹出-->
        <div class="imgBigList gdTan" v-if="modiaFlag">
            <div class="save">
                <h1 style="font-size:38rpx">确定注销</h1>
                <div class="content">
                    <p style="font-size:32rpx; text-align: left;">确定注销当前账号？</p>
                    <div class="logout2" style="margin-left:210rpx;">
                        <button class="quxiao" @click="modiaFlag=false">取消</button>
                        <span class="enter" @click="enterLogout">确定</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import Footer from "../../components/Footer.vue"
    export default{
        components: {
            FooterNav: Footer
        },
        data(){
            return {
                MyLength: 0,
                modiaFlag: false,
                userObj:{}
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        methods: {
            //通过方法  用mapActions将事件转发给仓库的actions动作
            ...mapActions([
                'removeLocal'
            ]),
            //mapActions传递参数 单独定义一个方法调用 mapactions里面的方法
            logout(){
                this.modiaFlag = true;
            },
            enterLogout(){
                this.modiaFlag = false;
                this.$store.dispatch("removeLocal")
            },
            //获取当前用户
            getUser(){
				this.request({
					url: '/api/Common/GetLoginedUser?ticket=' + this.user.ticket,
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
							this.jianSheObj = d.Model || null;
						}
					}
				});
            }
        },
        mounted(){
            this.getUser()
        }
    }
</script>
<style scoped>

    .save{
        height: 400rpx;
    }

    .quxiao {
        font-size: 28rpx;
        background: #2b6dcb;
        float:left;
        text-align: center;
        padding:15rpx 40rpx 15rpx;
        color: #999;
    }

    .logout2{
        margin-top:30rpx;
    }

    .enter {
        font-size: 28rpx;
        background: #2b6dcb;
        float:left;
		margin-left: 20rpx;
        text-align: center;
        padding:15rpx 40rpx 15rpx;
        color: #fff !important;
        border-radius: 5px;
    }
</style>

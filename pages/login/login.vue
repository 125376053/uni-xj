<template>
    <div class="loginBg">
        <div class="loginWrap">
            <h1 class="login_title">用户登录</h1>
            <div class="login_input">
                <p class="username">
                    <img src="/static/images/user_icon.png" alt="">
                    <input placeholder-class="ph" v-model="username" placeholder="用户名">
                </p>
                <p class="password">
                    <img src="/static/images/pass_icon.png" alt="">
                    <input placeholder-class="ph" v-model="password" placeholder="密码">
                </p>
                <a class="resetPass">
                    忘记密码?
                </a>
            </div>
            <a class="loginBtn" @click="check">登录</a>
        </div>
    </div>
</template>
<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
    export default{
        data(){
            return {
                username: '',
                password: ''
            }
        },
		computed: {
		    ...mapGetters([
		        'user'
		    ])
		},
        methods: {
            check(){
                var telMoshi = /^1[34578]\d{9}$/; //手机号验证
                var passMoshi = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/);
                if (this.username == "") {
					uni.showToast({
						title:'用户名不能为空',
						icon:'none'
					})
                } else if (this.username=="" && !telMoshi.test(this.username)){
					uni.showToast({
						title:'请输入正确的手机号码',
						icon:'none'
					})
                } else if (this.password == '') {
					uni.showToast({
						title:'密码不能为空',
						icon:'none'
					})
                } else if (!passMoshi.test(this.password)) {
					uni.showToast({
						title:'密码由6-12位数字，大小写字母组成',
						icon:'none'
					})
                } else {
                    //后台检测
                    this.checkUser();
                }
            },
            //检测用户名和密码是否正确
            checkUser(){
				this.request({
					url:'/api/Login/LoginUser?username='+this.username+'&password='+this.password,
					data:{
						username:this.username,
						password:this.password
					},
					method:'post',
					success:d=>{
						if (d.IsError > 0) {
						    //失败提示
						    uni.showToast({
						    	title:d.StatusMsg,
						    	duration:2000,
								icon:'none'
						    })
						} else {
						    //缓存用户信息
						    let userInfo=d.Model.UserInfo||null;
						    let ticket=d.Model.ticket||''
						    let user={
						        userInfo:userInfo,
						        ticket:ticket
						    }                      
						    //保存用户信息到Vuex
						    this.$store.dispatch('user',user);
							//缓存本地数据
							uni.setStorage({
								key: 'user',
								data: user,
								success: function (d) {
									console.log(d);
								}
							});
							
						    //成功提示
						    uni.showToast({
								title:d.StatusMsg,
						    	duration:2000,
								success() {
									uni.navigateTo({
										url:"/pages/index/index"
									})
								}
						    })
						}
					}
				})
				
            }
        }
    }
</script>
<style>
	.ph{
		color:#C2C2C2;
	}
</style>

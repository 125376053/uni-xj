<template>
        <div class="overAuto2">
            <div class="rc">
                <ul>
                    <li :key="index" v-for="(item,index) in helpList">
                        <navigator class="JustifyFlex" url="/pages/util/util">
							<span class="wt">{{item.EnumName}}</span>
							<img class="jt" src="/static/images/myLeft.jpg">
						</navigator>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    export default{
        name: '',
        data(){
            return {
                title:'帮助文档',
                helpList:[]
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        methods:{
            getData(){
				this.request({
					url: '/api/Common/GetDicList?typeid=11&ticket='+this.user.ticket,
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
							this.helpList=d.Model||[]
						}
					}
				})
            }
        },
        mounted(){
            this.getData()
        }
    }
</script>

<style>

</style>

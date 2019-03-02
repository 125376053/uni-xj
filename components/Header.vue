<template>
    <div class="pageTitle">
        <span class="leftJt">
            <img v-if="!isShowRe" src="/static/images/returnLeft.png" @click.stop="returnPage">
        </span>
        <span class="titleName">{{title}}</span>
        <span class="rightJt"></span>
    </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
            returnPage(){
                //有历史记录才回退
                uni.navigateBack({
					delta:1
				});
            },
        },
        props:['title','isShowRe']
    }
</script>
<style>

</style>

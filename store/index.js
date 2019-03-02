import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
var state = {
    user:null
};
const mutations = {
    user:(state,content)=>{
        state.user=content;
    },
    removeLocal:(state)=>{
        state.user=null;
		uni.removeStorage({
			key:'user'
		})
    }
};

const actions = {
    user:({commit},content)=>{
        commit("user",content)
    },
    removeLocal:({commit})=>{
        uni.showToast({
        	title:'退出成功',
        	duration:2000,
        	icon:'none'
        })
        commit("removeLocal")
    }
};

const getters = {
    user(state){
        //刷新vuex数据丢失 vuex加缓存能实现即时更新数据与持久保存数据
        return state.user?state.user:uni.getStorageSync('user')
    }
};


//需要导出Store对象
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});

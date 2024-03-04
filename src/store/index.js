import { createStore } from 'vuex'

export default createStore({
  state: {
    userinfo:{
      headImg:String,
      nickName:String,
      token:String
    }
  },
  getters: {
  },
  mutations: {
    saveUserInfo(state,userinfo){
      state.userinfo = userinfo
    }
  },
  actions: {
  },
  modules: {
  }
})

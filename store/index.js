
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'


export default () => new Vuex.Store({
  state, 
  mutations,   
  actions,
  plugins: [createPersistedState({
    paths: ['user'] 
  })]
})






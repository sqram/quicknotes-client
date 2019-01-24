<template>
  <div class="top-wrap">
    
      <div class="topnav">   
        <div class="left">
          Notes
        </div>
        <div class="right">
          <a href="#" @click.prevent="handleNewNote" class="new-note">+ new note</a>
          <!-- <a href="#/login" v-if='!$store.state.user.jwt'>login</a> -->
          <a href="#" v-if='$store.state.user.jwt' @click.prevent='handleLogout'>logout</a>
          <input type="text">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top',  
  methods: {
    handleNewNote ()
    {     
      this.$store.dispatch('addNewNote')     
    },

    handleLogout (e)
    {
      this.$store.commit('SET_USER_DATA', {
        jwt: null,
        email: null
      })
      window.localStorage.clear()
      window.location.href = '/'
    }
  }
 
}
</script>

<style lang="stylus" scoped>
  .top-wrap
    width 100%    
    padding 0
    display flex
    flex-direction column
  .topnav
    background #343a40    
    color #fff
    display flex
    width 100%
    box-sizing border-box
  & > div
    padding 0
    display flex
    padding 0.5em
    align-items center
  .left
    text-align left
    width 20%    
  .right    
    flex-grow 1       
    justify-content flex-end
    a
      background #bad1d699
      background #bad1d62e
      padding 5px 10px
      border-radius 3px
      font-size 85%
      text-decoration none
      color #fff
      margin-right 15px
      // new note
      &.new-note
        background #4ca4b5
    input
      display none     
</style>


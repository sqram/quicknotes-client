<template>
  <div class="app">
    <div v-if='this.$store.state.user.jwt'>
      <Top />
      <div v-if='$store.state.isFetchingNotes'>
        <Loader />
      </div>
      <div class="main" v-else>
        <Aside />
        <nuxt />
      </div>      
    </div>
    <div v-else>
      <a href="#/login">Login first</a>
    </div>
  </div>
  
</template>
<script>
  import Top from '~/components/Top.vue'
  import Aside from '~/components/Aside.vue'
  import Loader from '~/components/Loader.vue'
  export default {
    components: {
      Top,
      Aside,      
      Loader
    },

    async beforeMount()
    {      
      var note
      var notes = await this.$store.dispatch('getAllNotes'); //await axios.get('/notes')
      
      if ( Array.isArray(notes) &&  notes.length)
      {
        notes = notes.map(n => {
          n.isActive = false
          return n
        })

        this.$store.commit('SET_NOTES', notes)        

        // There's an ID in the url
        if (this.$route.path != '/')
        {
          // remove the initial '/'
          let id = this.$route.path.slice(1)
          note = notes.filter(n => n.id == id)[0]
        }
        else
        {          
          note = notes[0]
        }

        // Usually happens if note isn't found (id in url is wrong, note doesnt exist, etc)
        if (note === undefined)
        {
          return this.$router.push('/')          
        }       
        
        note.isActive = true
        this.$store.commit('SET_ACTIVE_NOTE', note.id)       
      }
    },
  }

</script>

<style lang="stylus">
  body
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    display flex
    flex-direction column    
       

  body, html, #__nuxt, #__layout, #__layout > .app, #__layout > .app > div, .main
    padding 0
    margin 0
    height 100%
    display flex
    flex-direction column
  .main
    flex-direction row

</style>


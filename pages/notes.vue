<template>
  <div v-if='this.$store.state.user.jwt'>    
    <Top />
    <Loader v-if='$store.state.isFetchingNotes' />
    <main v-else>
      <Aside />
      <nuxt-child></nuxt-child>
    </main>
  </div>
  <div v-else class="login-first">
    <a href="#/login">Login first</a>
  </div>

</template>

<script>
  import Top from '~/components/Top.vue'
  import Aside from '~/components/Aside.vue'
  import Notes from '~/components/Notes.vue'
  import Loader from '~/components/Loader.vue'

  export default {    
    components: {
      Top,
      Aside,      
      Loader
    },   

    /**
    * Fetch notes before mounting, so that our sidebar
    * and main section is filled
    */
    async beforeMount()
    {                   
      var note
      var notes = await this.$store.dispatch('getAllNotes'); 
      
      if ( Array.isArray(notes) &&  notes.length)
      {
        notes = notes.map(n => {
          n.isActive = false
          return n
        })

        this.$store.commit('SET_NOTES', notes)        

        // There's an ID in the url

        if (this.$route.params.pathMatch)
        {
          let id = this.$route.params.pathMatch          
          note = notes.filter(n => n.id == id)[0]
        }
        else
        {
          // No ID in url - app loaded and no notes selected yet.
          note = notes[0]
        }

        // Usually happens if note isn't found (id in url is wrong, note doesnt exist, etc)
        if (note === undefined)
        {
          //note = notes[0]
          return this.$router.push('/notes')
        }       
        
        note.isActive = true
        this.$store.commit('SET_ACTIVE_NOTE', note.id)       
      }
     
    },    

  }
</script>



<style lang="stylus" scoped>
  main
    display flex
    height 100%
  .login-first    
    a
      display block
      width 50%
      max-width 300px
      background cadetblue
      color #fff
      text-decoration none 
      text-align center 
      padding 1em 0
      margin 4em auto
      border-radius 5px
</style>

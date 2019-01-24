<template>
  <div v-if='this.$store.state.user.jwt'>    
    <Top />
    <Loader v-if='$store.state.isFetchingNotes' />
    <main v-else>
      <Aside />
      <nuxt-child></nuxt-child>
    </main>
  </div>
  <div v-else>
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
  main
    display flex
    height 100%  
</style>

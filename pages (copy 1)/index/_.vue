<template>
  <div v-if='this.$store.state.user.jwt'>
    <!-- Main content / middle -->
    <Top />
    
    <Loader  v-if='$store.state.isFetchingNotes' /> 
    
    <main v-else>
      <Aside />
      <Notes />
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
      Notes,
      Loader
    },

    data ()
    {
      return {        
        // Is title being edited? Fill with an ID to make it editable (true).
        isBeingEdited: null,              
      }
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


    methods: {
      async handleTitleEdit (e)
      { 
        let title = e.currentTarget.value      
        // let req = await axios.post('/save-note', {
        //   title: this.$store.state.note.title,
        //   content: this.$store.state.note.content,
        //   id: this.$store.state.note.id,
        // })
      },

      async handleContentEdit (e)
      {
        this.$store.dispatch('updateNote', {
          title: this.$store.state.note.title,
          content: e.currentTarget.value,
          id: this.$store.state.note.id,
          createdDate: this.$store.state.note.createdDate
        })       
      },
     
      handleTitleFocusOut (e)
      { 
        // Grab copy of active note. Change title. Update note        
        this.isBeingEdited = null
        let note = this.$store.state.note
        note.title = e.currentTarget.value
        this.$store.dispatch('updateNote', note)
      },

      handleTitleEditClick (e)
      {
        let id = e.currentTarget.dataset.id
        this.isBeingEdited = id        
        let input = document.querySelector(`input[data-id='${id}']`)        
        this.$nextTick(() => input.focus())
      },


      handleSideLinkClick (e)
      {        
        this.$store.commit('SET_ALL_NOTES_INACTIVE')        
        this.$store.commit('SET_ACTIVE_NOTE', e.currentTarget.dataset.id)
      },
    

      async handleDelete (e)
      {
        e.stopPropagation()
        let remove = confirm('Delete?')
        if (remove)
        {
          this.$store.dispatch('deleteNote', e.currentTarget.dataset.id)          
        }
      },  
    
    },

  }
</script>



<style lang="stylus">   
  main
    display flex
    height 100%

  
</style>

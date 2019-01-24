<template>  
  <Notes />
</template>

<script>  
  import Notes from '~/components/Notes.vue'

  export default {    
    components: {      
      Notes
    },

    data ()
    {
      return {        
        // Is title being edited? Fill with an ID to make it editable (true).
        isBeingEdited: null,              
      }
    },


    


    methods: {
      async handleTitleEdit (e)
      { 
        let title = e.currentTarget.value      
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

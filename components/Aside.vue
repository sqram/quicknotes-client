<template> 
  <aside>
      <div v-if='$store.state.notes.length'>
        <!-- <Article v-for='(note, index) in notes' :key=note.id :title=note.title :id=note.id  /> -->
        <!-- <transition-group name="fade"> -->
          <router-link 
            :to="`/${note.id}`" 
            class="note-title" 
            v-for='note in $store.state.notes' 
            :key=note.id :data-id=note.id 
            @click.native='handleSideLinkClick' 
            :class="{ active: note.isActive }">
            
            <input type="text" :value=note.title :disabled='isBeingEdited != note.id' @focusout='handleTitleFocusOut' :data-id=note.id>
            <div class="title-action">
              <a href="#" @click.prevent='handleTitleEditClick' :data-id=note.id class="edit"></a>
              <a href="#" @click.prevent='handleDelete' :data-id=note.id class="delete"></a>                
            </div>
          </router-link>
        <!-- </transition-group> -->
      </div>
      <div v-else class="no-notes">No notes</div>
    </aside> 
</template>


<script>
export default {
  data ()
  {
    return {
      isBeingEdited: false
    }
  },  
  
  methods: {
     
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
        // TODO make scroll stop when clicking  
        e.preventDefault()
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



<style lang="stylus" scoped>

  aside    
    flex-basis 30%
    max-width 300px
    background #eeeeee7d
    border-right 1px solid #ccc
    overflow-y auto
    .note-title
      border-bottom 1px solid #ccc
      display flex
      text-decoration none
      color #333
      position relative      
      &:hover
        div.title-action
          visibility  visible  
      div.title-action
        display flex  
        //background pink
        position absolute
        right 0
        top 0
        width 60px
        height 100%
        visibility hidden
      input
        padding 10px
        flex-grow 1      
        display flex
        border none
        cursor pointer
        &:disabled
          background transparent
        &:focus
          cursor default
      &.active
        background #bad1d699
        font-weight bold
        border-bottom 2px solid #333
        
          
      a        
        width 100%        
        background-size 50%
        background-position center
        background-repeat no-repeat
        &:hover a
          visibility visible
        
      a.edit
        background-image url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjYgMjYiIHZlcnNpb249IjEuMSIgd2lkdGg9IjI2cHgiIGhlaWdodD0iMjZweCI+CjxnIGlkPSJzdXJmYWNlMSI+CjxwYXRoIHN0eWxlPSIgIiBkPSJNIDIwLjA5Mzc1IDAuMjUgQyAxOS41IDAuMjQ2MDk0IDE4LjkxNzk2OSAwLjQ1NzAzMSAxOC40Njg3NSAwLjkwNjI1IEwgMTcuNDY4NzUgMS45Mzc1IEwgMjQuMDYyNSA4LjU2MjUgTCAyNS4wNjI1IDcuNTMxMjUgQyAyNS45NjQ4NDQgNi42Mjg5MDYgMjUuOTcyNjU2IDUuMTY0MDYzIDI1LjA2MjUgNC4yNSBMIDIxLjc1IDAuOTM3NSBDIDIxLjI5Mjk2OSAwLjQ4MDQ2OSAyMC42ODc1IDAuMjUzOTA2IDIwLjA5Mzc1IDAuMjUgWiBNIDE2LjM0Mzc1IDIuODQzNzUgTCAxNC43ODEyNSA0LjM0Mzc1IEwgMjEuNjU2MjUgMTEuMjE4NzUgTCAyMy4yNSA5Ljc1IFogTSAxMy43ODEyNSA1LjQzNzUgTCAyLjk2ODc1IDE2LjE1NjI1IEMgMi43MTg3NSAxNi4yODUxNTYgMi41MzkwNjMgMTYuNTExNzE5IDIuNDY4NzUgMTYuNzgxMjUgTCAwLjE1NjI1IDI0LjYyNSBDIDAuMDUwNzgxMyAyNC45Njg3NSAwLjE0NDUzMSAyNS4zNDc2NTYgMC4zOTg0MzggMjUuNjAxNTYzIEMgMC42NTIzNDQgMjUuODU1NDY5IDEuMDMxMjUgMjUuOTQ5MjE5IDEuMzc1IDI1Ljg0Mzc1IEwgOS4yMTg3NSAyMy41MzEyNSBDIDkuNTgyMDMxIDIzLjQ3NjU2MyA5Ljg4MjgxMyAyMy4yMjI2NTYgMTAgMjIuODc1IEwgMjAuNjU2MjUgMTIuMzEyNSBMIDE5LjE4NzUgMTAuODQzNzUgTCA4LjI1IDIxLjgxMjUgTCAzLjg0Mzc1IDIzLjA5Mzc1IEwgMi45MDYyNSAyMi4xNTYyNSBMIDQuMjUgMTcuNTYyNSBMIDE1LjA5Mzc1IDYuNzUgWiBNIDE2LjE1NjI1IDcuODQzNzUgTCA1LjE4NzUgMTguODQzNzUgTCA2Ljc4MTI1IDE5LjE4NzUgTCA3IDIwLjY1NjI1IEwgMTggOS42ODc1IFogIi8+CjwvZz4KPC9zdmc+Cg==')
      a.delete
        background-image url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjYgMjYiIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwOHB4IiBoZWlnaHQ9IjIwOHB4Ij4KPGcgaWQ9InN1cmZhY2UxIj4KPHBhdGggc3R5bGU9IiAiIGQ9Ik0gMTEuNSAtMC4wMzEyNSBDIDkuNTQyOTY5IC0wLjAzMTI1IDcuOTY4NzUgMS41OTM3NSA3Ljk2ODc1IDMuNTYyNSBMIDcuOTY4NzUgNCBMIDQgNCBDIDMuNDQ5MjE5IDQgMyA0LjQ0OTIxOSAzIDUgTCAzIDYgTCAyIDYgTCAyIDggTCA0IDggTCA0IDIzIEMgNCAyNC42NDQ1MzEgNS4zNTU0NjkgMjYgNyAyNiBMIDE5IDI2IEMgMjAuNjQ0NTMxIDI2IDIyIDI0LjY0NDUzMSAyMiAyMyBMIDIyIDggTCAyNCA4IEwgMjQgNiBMIDIzIDYgTCAyMyA1IEMgMjMgNC40NDkyMTkgMjIuNTUwNzgxIDQgMjIgNCBMIDE4LjAzMTI1IDQgTCAxOC4wMzEyNSAzLjU2MjUgQyAxOC4wMzEyNSAxLjU5Mzc1IDE2LjQ1NzAzMSAtMC4wMzEyNSAxNC41IC0wLjAzMTI1IFogTSAxMS41IDIuMDMxMjUgTCAxNC41IDIuMDMxMjUgQyAxNS4zMDQ2ODggMi4wMzEyNSAxNS45Njg3NSAyLjY4NzUgMTUuOTY4NzUgMy41NjI1IEwgMTUuOTY4NzUgNCBMIDEwLjAzMTI1IDQgTCAxMC4wMzEyNSAzLjU2MjUgQyAxMC4wMzEyNSAyLjY4NzUgMTAuNjk1MzEzIDIuMDMxMjUgMTEuNSAyLjAzMTI1IFogTSA2IDggTCAxMS4xMjUgOCBDIDExLjI1IDguMDExNzE5IDExLjM3MTA5NCA4LjAzMTI1IDExLjUgOC4wMzEyNSBMIDE0LjUgOC4wMzEyNSBDIDE0LjYyODkwNiA4LjAzMTI1IDE0Ljc1IDguMDExNzE5IDE0Ljg3NSA4IEwgMjAgOCBMIDIwIDIzIEMgMjAgMjMuNTYyNSAxOS41NjI1IDI0IDE5IDI0IEwgNyAyNCBDIDYuNDM3NSAyNCA2IDIzLjU2MjUgNiAyMyBaIE0gOCAxMCBMIDggMjIgTCAxMCAyMiBMIDEwIDEwIFogTSAxMiAxMCBMIDEyIDIyIEwgMTQgMjIgTCAxNCAxMCBaIE0gMTYgMTAgTCAxNiAyMiBMIDE4IDIyIEwgMTggMTAgWiAiLz4KPC9nPgo8L3N2Zz4'K)
        
      


    .no-notes
      text-align center
      padding 2em 0
    .aside-actions      
      color #444
      border-bottom 1px dotted #222
      background #DBDBDB //rgba(#333, 10%)
      display flex
      align-items center
      padding 2px 1em
      & span
        flex-basis 20%        
      select
        flex-basis 80%
        flex-grow 1      
        background rgba(white, 0%)
        color #444
        border none
        paddomg 0    
  
</style>

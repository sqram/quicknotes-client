<template>
    <!-- Main content / middle -->
    <div class="note-wrap">
      <router-view></router-view>
      <main v-if='$store.state.notes.length'>
        <div class="content-actions" v-if='$store.state.note'>                    
          <div>
            <span>Created On: </span>
            <span>{{ formattedCreationDate }}</span>
          </div>
          <div v-if='$store.state.note.lastEditTime'>
            <span>Last Edited:</span>
            <span>{{ formattedEditDate }}</span>
          </div>
        </div>
        <textarea v-model='$store.state.note.content' @keyup='handleContentEdit' v-if='$store.state.note'></textarea>
      </main>

      <main v-else>        
        <h3>You have no notes :(</h3>
        <a href="#" class="new-note" @click.prevent="$store.dispatch('addNewNote')">
          Create New Note!
        </a>
      </main>
    </div>
</template>


<script>  
  export default {    
    methods: {    
      async handleContentEdit (e)
      {
        this.$store.dispatch('updateNote', {
          title: this.$store.state.note.title,
          content: e.currentTarget.value,
          id: this.$store.state.note.id,
          createdDate: this.$store.state.note.createdDate
        })       
      },
    },

    computed: {  
      formattedEditDate ()
      {
        let date = new Date(this.$store.state.note.lastEditTime).toString()
        return date.split(' ').slice(0, 4).join(' ')        
      },
      formattedCreationDate ()
      {
        let date = new Date(this.$store.state.note.createdDate).toString()
        return date.split(' ').slice(0, 4).join(' ')        
      }
    }
  }
</script>



<style lang="stylus" scoped>
  .note-wrap
    display flex
    flex-direction column
    flex-grow 1
    border-right 10px solid #333
  main
    display flex
    flex-direction column    
    
  .content-actions
      color #444
      border-bottom 1px dotted #ccc
      background rgba(186, 209, 214, 0.18) //rgba(#333, 10%)
      display flex
      align-items center
      padding 10px 1em
      justify-content space-between
      font-size 80%      
      div
        display flex      
        span:first-of-type
          font-weight bold
          padding-right 10px
        input
          margin 0
          background none 
          padding 0
          height 19px
          border none 
          color #2e6ce6
          font-weight bold
  textarea
      height 100%
      width 100%
      border none
      padding 10px 20px
      box-sizing border-box
      &:focus
        outline none
  h3
    color #ccc
    margin 2em 0 0 0
    font-size 3em
  .new-note
    display block
    border 5px solid rgba(186, 209, 214, 0.18)
    padding 1em 0
    width 40%
    margin 3em auto 0
    background #4ca4b5
    color #fff
    text-decoration none
    border-radius 5px
    font-weight bold
    text-transform uppercase

</style>


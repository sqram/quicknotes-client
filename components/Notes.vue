<template>
    <!-- Main content / middle -->
    <div class="note-wrap">
      
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
          <div class="toggle">  
            <input class="tgl tgl-flat" id="cb4" type="checkbox" :checked=isMarkdown v-model='isMarkdown' />
            <label class="tgl-btn" for="cb4" title="You can use 'esc' key to toggle this switch"></label>
            <span>Markdown: </span>
            <span>{{ isMarkdown }}</span>
          </div>
        </div>
        <div class="compiled" v-html="compiledMarkDown" v-if='isMarkdown' @dblclick='handleDblClick'></div>
        <textarea          
          v-model='$store.state.note.content'          
          @keydown='handleContentEdit'
          v-if='$store.state.note && !isMarkdown'
          spellcheck="false"></textarea>
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
    data ()
    {
      return {
        isMarkdown: false,
      }
    },   
    
    mounted ()
    {
      document.onkeyup =  (e) => {
        let keycode = e.keyCode || e.which
        if (keycode == 27)
        {
          this.isMarkdown = !this.isMarkdown
          console.log(this.isMarkdown)
        }
      };
    },
    methods: {
      handleDblClick ()
      {        
        this.isMarkdown = false
      },

      async handleContentEdit (e)
      {       
        // If it's tab, insert tab
        // https://jsfiddle.net/2wAzx/13/
        let text = e.currentTarget.value
        let keycode = e.keyCode || e.which        
        if (keycode == 9)
        {
          let start = e.currentTarget.selectionStart;
          let end   = e.currentTarget.selectionEnd;          
          e.currentTarget.value = text.substring( 0, start ) + "\t" + text.substring( end );
          e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1;          
          e.preventDefault()
        }

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
      },
      compiledMarkDown ()
      {      
        return marked(this.$store.state.note.content, { sanitize: true })
      }
    }
  }
</script>



<style lang="stylus" scoped>
  @require '~assets/style/variables'
  
  .note-wrap
    display flex
    flex-direction column
    flex-grow 1
    border-right 10px solid $top-bg
  main
    display flex
    flex-direction column    
    height 100%
  .content-actions
      color #555
      border-bottom 1px dotted #ccc
      background rgba(186, 209, 214, 0.18) //rgba(#333, 10%)
      display flex
      align-items center
      padding 10px 1em
      justify-content space-between
      font-size 80%
      div
        display flex      
        align-items center
        
        &.toggle
          span:first-of-type
            display inline-block
            padding-left 10px
            color #777
          span:last-of-type
            width 54px
            
        span:first-of-type
          font-weight bold
          padding-right 10px

       

  .compiled
    box-sizing border-box
    padding 10px 20px

  textarea
      height 100%
      width 100%
      border none
      padding 10px 20px
      box-sizing border-box
      &:focus
        outline none
  h3
    text-align center
    color #ccc
    margin-top 2em
    font-size 2em
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
    text-align center





// Toggle button
  .tgl {
    display: none;
  }
  .tgl, .tgl:after, .tgl:before, .tgl *, .tgl *:after, .tgl *:before, .tgl + .tgl-btn {
    box-sizing: border-box;
  }
  .tgl::-moz-selection, .tgl:after::-moz-selection, .tgl:before::-moz-selection, .tgl *::-moz-selection, .tgl *:after::-moz-selection, .tgl *:before::-moz-selection, .tgl + .tgl-btn::-moz-selection {
    background: none;
  }
  .tgl::selection, .tgl:after::selection, .tgl:before::selection, .tgl *::selection, .tgl *:after::selection, .tgl *:before::selection, .tgl + .tgl-btn::selection {
    background: none;
  }

  .tgl + .tgl-btn {
    outline: 0;
    display: block;
    width: 4em;
    height: 2em;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .tgl + .tgl-btn:after, .tgl + .tgl-btn:before {
    position: relative;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
  }
  .tgl + .tgl-btn:after {
    left: 0;
  }
  .tgl + .tgl-btn:before {
    display: none;
  }
  .tgl:checked + .tgl-btn:after {
    //left: 50%;
  }

  // theme
  .tgl-flat + .tgl-btn {
    padding: 2px;
    transition: all .2s ease;
    background: #fff;
    border: 4px solid #f2f2f2;
    border-radius: 2em;
  }
  .tgl-flat + .tgl-btn:after {
    transition: all .2s ease;
    background: #f2f2f2;
    //content: "";
    border-radius: 1em;
  }
  .tgl-flat:checked + .tgl-btn {
    border: 4px solid #7FC6A6;
  }
  .tgl-flat:checked + .tgl-btn:after {
    left: 50%;
    background: #7FC6A6;
  }

</style>


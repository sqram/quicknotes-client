<template>
  <div class="app">
    <nuxt />
  </div>
</template>
<script>
export default {
  head ()
    {
      return {
        // title: 'Notes',
        script: [
          { src: 'https://unpkg.com/marked@0.3.6'}
        ]
      }
    }
}
</script>
<style lang="stylus">
  body
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
    display flex
    flex-direction column    
       

  body, html, #__nuxt, #__layout, #__layout > .app, #__layout > .app > div
    padding 0
    margin 0
    height 100%
    display flex
    flex-direction column
</style>


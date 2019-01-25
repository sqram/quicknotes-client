<template>
  
  <div class="home">
    <div class="logo-wrap">
      <div class="brand">
        <span data-text='Spritz' class='dashed-shadow'>Spritz</span>
        <span data-text='&amp;' class='dashed-shadow'>&</span>
        <span data-text='Coffee' class='dashed-shadow'>Coffee</span>
      </div>
      <div class="desc">
        A super simple note-taking app. 100% free.
      </div>
      <a href="#/login" class="cta">START HERE!</a>
    </div>


    <div class="scroll">v</div>

    <div class="app-info">   
        <div class="features">
          It's simple. Create a new note and start typing.
          <br>
          You can write your notes in <strong>plain text</strong> or <strong>markdown</strong>,
          <br>
          and use the toggle switch to toggle between plain text and parsed markdown.
        </div>
        <div class="screenshot">
          <img src="/screenshot.png" alt="">      
        </div>
        <p>
          And it's 100% free, too.
        </p>
    </div>

    <footer>
      Created by <a href="https://github.com/sqram">sqram</a>
    </footer>

    
  </div>
</template>

<script>
export default {
  layout: 'clean'
}
</script>

<style lang="stylus" scoped>
  //@import url('https://fonts.googleapis.com/css?family=Sacramento');
  //@import url('https://fonts.googleapis.com/css?family=Niconne|Sacramento');
  @import url('https://fonts.googleapis.com/css?family=Niconne|Cookie');

    $color = #a03c3c
  .home    
    
    background #e8e3c7
    color #a03c3c
    
  .logo-wrap    
    height 80vh    
    overflow auto
  .brand
    font-size 12em
    text-align center
    color #b85b3f
    
    margin-top 30vh        
    //font-family: 'Dancing Script', cursive;
    //font-family: 'Niconne', cursive;
    font-family: 'Cookie', cursive
    //font-family: 'Sacramento', cursive;
    //font-family: 'Delius Swash Caps', cursive;
    span:nth-of-type(2)
      color #999
      transform skew(15deg, -5deg)
      //border-top 5px solid alpha($color, 40%)
      position relative
      //border-bottom 5px solid alpha($color, 40%)
      font-size 100px
      line-height 120px
      &:before
        color #fff
        content ''
        position absolute
        
        
  .desc
    text-align center
    font-size 120%
    margin-top 1em
  .cta
    width 300px
    padding 1em 0
    margin 0 auto
    background #b85b3f
    display block
    color #fff
    text-align center
    text-decoration none
    border-radius 5px
    margin-top 2em
    border 6px solid lighten(#b85b3f, 30%)
    transition all 0.2s
    font-weight bold
    color lighten(#b85b3f, 78%)
    &:hover
      border 6px solid darken(#b85b3f, 10%)
  .scroll
    height 6vh
    visibility hidden
  .app-info
    display flex
    justify-content center
    flex-direction column    
    align-items center  
  .features
    font-size 120%
    line-height 29px
    text-align center
    padding-bottom 3em
  footer
    background darken(#e8e3c7, 90%)    
    text-align center
    padding 3em 0
    color #fff
    a
      text-decoration none
      color #888
      font-weight bold


  .dashed-shadow {
  position: relative;
  top: 8px;
  left: 8px;
  display: inline-block;
  color: #ba9186;
}

.dashed-shadow:before {
  content: " ";
  display: block;
  position: absolute;
  top: -8px;
  left: -8px;
  bottom: -2px;
  right: -2px;
  z-index: 1;
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjEuMCIgeDI9IjEuMCIgeTI9IjAuMCI+PHN0b3Agb2Zmc2V0PSIxMi41JSIgc3RvcC1jb2xvcj0iI2U4ZTNjNyIvPjxzdG9wIG9mZnNldD0iMTIuNSUiIHN0b3AtY29sb3I9IiNlOGUzYzciIHN0b3Atb3BhY2l0eT0iMC4wIi8+PHN0b3Agb2Zmc2V0PSIzNy41JSIgc3RvcC1jb2xvcj0iI2U4ZTNjNyIgc3RvcC1vcGFjaXR5PSIwLjAiLz48c3RvcCBvZmZzZXQ9IjM3LjUlIiBzdG9wLWNvbG9yPSIjZThlM2M3Ii8+PHN0b3Agb2Zmc2V0PSI2Mi41JSIgc3RvcC1jb2xvcj0iI2U4ZTNjNyIvPjxzdG9wIG9mZnNldD0iNjIuNSUiIHN0b3AtY29sb3I9IiNlOGUzYzciIHN0b3Atb3BhY2l0eT0iMC4wIi8+PHN0b3Agb2Zmc2V0PSI4Ny41JSIgc3RvcC1jb2xvcj0iI2U4ZTNjNyIgc3RvcC1vcGFjaXR5PSIwLjAiLz48c3RvcCBvZmZzZXQ9Ijg3LjUlIiBzdG9wLWNvbG9yPSIjZThlM2M3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');
  background-size: 100%;
  background-image: -moz-linear-gradient(45deg, #e8e3c7 12.5%, rgba(232, 227, 199, 0) 12.5%, rgba(232, 227, 199, 0) 37.5%, #e8e3c7 37.5%, #e8e3c7 62.5%, rgba(232, 227, 199, 0) 62.5%, rgba(232, 227, 199, 0) 87.5%, #e8e3c7 87.5%);
  background-image: -webkit-linear-gradient(45deg, #e8e3c7 12.5%, rgba(232, 227, 199, 0) 12.5%, rgba(232, 227, 199, 0) 37.5%, #e8e3c7 37.5%, #e8e3c7 62.5%, rgba(232, 227, 199, 0) 62.5%, rgba(232, 227, 199, 0) 87.5%, #e8e3c7 87.5%);
  background-image: linear-gradient(45deg, #e8e3c7 12.5%, rgba(232, 227, 199, 0) 12.5%, rgba(232, 227, 199, 0) 37.5%, #e8e3c7 37.5%, #e8e3c7 62.5%, rgba(232, 227, 199, 0) 62.5%, rgba(232, 227, 199, 0) 87.5%, #e8e3c7 87.5%);
  background-size: 6px 6px;
}

.dashed-shadow:hover:before {
  animation: dash-animation 30s infinite linear;
}

.dashed-shadow:after {
  z-index: 2;
  content: attr(data-text);
  position: absolute;
  left: -8px;
  top: -8px;
  color: #b85b3f;
  text-shadow: 3px 3px #e8e3c7;
}

@keyframes dash-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}

</style>

<template>
  <section>
    <header>
      SIGN IN OR REGISTER
    </header>
    <p>
      A super simple note storage app.
    </p>
    <main>
      <div class="register">
        <header>Register</header>
        <form action="" @submit.prevent='handleRegister'>
          <input type="email" placeholder="email" v-model='registerEmail'>
          <input type="text" placeholder="password" v-model='registerPassword'>
          <input type="submit">
        </form>
      </div>
      <div class="signin">
        <header>Sign In</header>
        <form action="" @submit.prevent='handleSignin'>
          <input type="text" placeholder="email" v-model='signinEmail'>
          <input type="text" placeholder="password" v-model='signinPassword'>
          <input type="submit">
        </form>
      </div>      
    </main>
    <div class="result" v-if='$store.state.xhrMessages.auth'>{{ this.$store.state.xhrMessages.auth }}</div>
  </section>
</template>

<script>


export default {

  layout: 'clean',
  data ()
  {
    return {
      registerEmail: null,
      registerPassword: null,
      signinEmail: null,
      signinPassword: null,
    }
  },
  beforeMount ()
  {
    if (this.$store.state.user.jwt)
    {
      this.$router.push('/notes')
    }
  },
  methods: {
    handleRegister (e)
    {      
      //TODO validate 
      if (this.registerEmail && this.registerPassword) 
      {
        this.$store.dispatch('auth', {
          email: this.registerEmail,
          password: this.registerPassword,
          api: '/register'
        })
      }    
    },

    handleSignin (e)
    {      
      //TODO validate 
      if (this.signinEmail && this.signinPassword) 
      {
        this.$store.dispatch('auth', {
          email: this.signinEmail,
          password: this.signinPassword,
          api: '/signin'
        })
      }    
    }
  }

}
</script>

<style lang="stylus" scoped>
  p
    max-width 800px
    margin 2em auto
    background #eee
    padding 5px 0
    border 1px dotted #ccc
    visibility hidden
  header 
    background #bad1d699
    padding 1em 0
    text-align center
  main
    display flex
    width 80%
    max-width 800px
    margin 0 auto
    
    justify-content space-between
  .signin, .register
    display flex
    flex-basis 45%
    
    flex-direction column


  form
    margin-top 20px
    display flex
    flex-direction column
    & > *:not(:last-child)
      margin-bottom 14px
  input[type=text], input[type=email]
    padding 8px
  input[type=submit]
    background #666
    border 4px solid #888
    color #fff
    border-radius 5px
    padding 10px 0

  .result
    background alpha(pink, 30%)
    padding 1em
    margin-top 1em
    text-align center
    margin 2em auto  0
    border 2px solid pink
    max-width 800px
    box-sizing border-box
  
</style>


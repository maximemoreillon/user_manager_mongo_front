<template>
  <div class="home">
    <h1>Login</h1>

    <form
      v-if="!logged_in"
      class=""
      @submit.prevent="login()">
      <p>
        <input
          type="text"
          v-model="username"
          placeholder="username"
          autocomplete="username">
      </p>
      <p>
        <input
          type="password"
          v-model="password"
          placeholder="password"
          autocomplete="password">
      </p>
      <p>
        <input type="submit" value="Login">
      </p>
      <p
        class="error"
        v-if="error_message">
        {{error_message}}
      </p>
    </form>

    <form
      class=""
      v-else
      @submit.prevent="logout()">
      <input type="submit" value="Logout">
    </form>



  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Login',
  data(){
    return {
      logged_in: false,
      username: '',
      password: '',
      error_message: null,
    }
  },
  mounted(){
    this.login_check()
  },
  methods: {
    login(){
      this.error_message = null
      let url = `${process.env.VUE_APP_AUTHENTICATION_API_URL}/login`
      let body = {username: this.username, password: this.password}
      this.axios.post(url, body)
      .then( response => {
        const token = response.data.jwt
        // Set the authorization headers
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        this.$cookies.set('token', token, '14d', null, process.env.VUE_APP_COOKIE_DOMAIN, null, 'Strict')

        this.login_check()

        this.$router.push({name: 'users'})
      })
      .catch( error => {
        console.error(error)
        if(error.response) this.error_message = error.response.data
      })
    },
    logout(){
      this.$cookies.remove('token')
      this.login_check()
    },
    login_check(){
      this.logged_in =  !!this.$cookies.get('token')
    }
  }

}
</script>

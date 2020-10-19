<template>
  <div class="create_user">
    <h1>Create user</h1>

    <form class="" @submit.prevent="create_user()">
      <p>
        <input type="text" v-model="user_properties.username" placeholder="username">
      </p>
      <p>
        <input type="password" v-model="user_properties.password" placeholder="password">
      </p>
      <p>
        <input type="submit">
      </p>
    </form>

    <p
      class="error"
      v-if="error_message">
      {{error_message}}
    </p>

  </div>
</template>

<script>
export default {
  name: 'Users',
  data(){
    return {
      error_message: null,
      user_properties: {
        username: '',
        password: '',
      }
    }
  },

  methods: {
    create_user(){
      this.error_message = null

      let url = `${process.env.VUE_APP_USER_MANAGER_API_URL}/users`
      let method = 'post'
      let body = this.user_properties

      this.axios.[method](url, body)
      .then( response => {
        this.$router.push({name: 'user', params: {user_id: response.data.insertedId}})
      })
      .catch( error => {
        console.error(error)
        if(error.response) this.error_message = error.response.data
      })
    }
  }
}
</script>

<style>

</style>

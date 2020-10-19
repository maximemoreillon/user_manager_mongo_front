<template>
  <div class="home">
    <h1>User</h1>

    <p class="error">{{error_message}}</p>

    <table v-if="user">
      <tr>
        <td>ID</td>
        <td>{{user._id}}</td>
      </tr>
      <tr>
        <td>Username</td>
        <td>{{user.username}}</td>
      </tr>
      <tr>
        <td>Display name</td>
        <td v-if="true">
          <input type="text" v-model="user.display_name">
        </td>
        <td v-else>{{user.display_name}}</td>
      </tr>
      <tr>
        <td>Admin</td>
        <td>
          <input type="checkbox" v-model="user.admin">
        </td>
      </tr>
      <tr>
        <td>Update user</td>
        <td>
          <button
            type="button"
            @click="update_user()">
            Update user
          </button>
        </td>
      </tr>
      <tr>
        <td>Delete user</td>
        <td>
          <button
            type="button"
            @click="delete_user()">
            Delete user
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: 'User',
  data(){
    return {
      error_message: null,
      user: null,
    }
  },
  mounted(){
    this.get_user()
  },
  methods: {
    get_user(){
      this.error_message = null
      let user_id = this.$route.params.user_id || 'self'
      let url = `${process.env.VUE_APP_USER_MANAGER_API_URL}/users/${user_id}`
      this.axios.get(url)
      .then( response => { this.user = response.data })
      .catch( error => {
        console.error(error)
        if(error.response) this.error_message = error.response.data
        else this.error_message = `Error loading user`
      })
    },
    delete_user(){
      if(!confirm(`Delete user ${this.user.username}`))
      this.error_message = null
      let user_id = this.$route.params.user_id || 'self'
      let url = `${process.env.VUE_APP_USER_MANAGER_API_URL}/users/${user_id}`
      this.axios.delete(url)
      .then( () => { this.$router.push({name: 'users'}) })
      .catch( error => {
        console.error(error)
        if(error.response) this.error_message = error.response.data
        else this.error_message = `Error loading user`
      })
    },
    update_user(){

      const user_id = this.$route.params.user_id || 'self'
      const url = `${process.env.VUE_APP_USER_MANAGER_API_URL}/users/${user_id}`

      const {display_name, admin} = this.user

      const properties = {
        display_name: display_name,
        admin: admin
      }

      this.axios.patch(url,properties)
      .then( () => { this.get_user() })
      .catch( error => {
        console.error(error)
        if(error.response) this.error_message = error.response.data
        else this.error_message = `Error loading user`
      })

    },
  }

}
</script>

<template>
  <div class="users">
    <h1>Users</h1>

    <p>
      <router-link
        :to="{ name: 'create_user' }">
        Create user
      </router-link>
    </p>

    <p
      v-if="error_message">
      {{error_message}}
    </p>

    <p
      class=""
      v-if="loading">
      Loading
    </p>

    <table v-else-if="users.length > 0">
      <tr>
        <th>Display name</th>
        <th>Username</th>
      </tr>
      <tr
        class="user"
        v-for="user in users"
        :key="user._id"
        @click="$router.push({ name: 'user', params: {user_id: user._id} })">

        <td>
          {{user.display_name || '-'}}
        </td>
        <td>
          {{user.username}}
        </td>

      </tr>
    </table>

    <div
      class="error_message"
      v-else="">
      No user
    </div>

  </div>
</template>

<script>
export default {
  name: 'Users',
  data(){
    return {
      error_message: null,
      users: [],
      loading: false,
    }
  },
  mounted(){
    this.get_users()
  },
  methods: {
    get_users(){
      this.loading = true
      this.error_message = null
      let url = `${process.env.VUE_APP_USER_MANAGER_API_URL}/users`
      let method = 'get'
      this.axios.[method](url)
      .then( response => {
        this.users = []
        response.data.forEach((user) => {
          this.users.push(user)
        })

      })
      .catch( error => {
        console.error(error)
        if(error.response) this.error_message = error.response.data
      })
      .finally( () => {
        this.loading = false
      })
    }
  }
}
</script>

<style>
.user {
  cursor: pointer;
  transition: 0.25s;
}

.user:hover {
  background-color: #eeeeee;
}
</style>

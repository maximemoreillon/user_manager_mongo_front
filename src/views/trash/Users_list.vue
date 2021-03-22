<template>
<v-list>
  <v-list-item
    v-for="user in users"
    :key="user._id"
    :to="{name: 'user', params: {user_id: user._id}}">
    <v-list-item-title>
      {{user.username}}
    </v-list-item-title>
  </v-list-item>

</v-list>
</template>

<script>
// The table version of this component seems more appropriate with its loading and search features
export default {
  name: 'Users',
  data(){
    return {
      error_message: null,
      users: [],
      headers: [
        {text: 'Username', value:'username'},
        {text: 'Display name', value:'display_name'},
      ],
      loading: false,
      search: '',
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

</style>

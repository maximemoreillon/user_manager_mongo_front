<template>
  <div id="app">

    <nav>

      <router-link :to="{ name: 'users' }">Users</router-link>
      <template v-if="$route.name === 'user'">
        <span>></span>
        <span>{{$route.params.user_id}}</span>
      </template>

      <span class="spacer" />


      <span class="logout" @click="logout()">Logout</span>

    </nav>

    <main>
      <router-view/>
    </main>


  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'App',
  methods: {
    logout(){
      this.$cookies.remove('token')
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: sans-serif;
}

nav {
  display: flex;
  border-bottom: 1px solid #dddddd;
}

nav > * {
  margin: 0.5em;
}

nav a {
  color: currentcolor;
  text-decoration: none;
  transition: 0.25s;
}

nav a:hover {
  color: #c00000;
}

main {
  margin: 0.5em;
}

.error, .error_message {
  color: #c00000;
}

table {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}

th, td {
  padding: 0.25em;
}
tr:not(:last-child) {
  border-bottom: 1px solid #dddddd;
}

.spacer {
  flex-grow: 1;
}

.logout {
  cursor: pointer;
  transition: 0.25s;
}

.logout:hover {
  color: #c00000;
}

</style>

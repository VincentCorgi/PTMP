<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <navbar class="navbar" v-show="$route.name !== 'Login' && $route.name !== '404' && $route.name !== 'Vincent'" />
    <div class="sidebar" v-show="$route.name !== 'Login' && $route.name !== '404' && $route.name !== 'Vincent' && $route.name !== 'Register'">
      <sidebar/>
    </div>
    <div class="main-content open-content" >
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
  components: { Navbar, Sidebar }
}
</script>
<style>
#app {
  font-family: "Helvetica", "Arial", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar{
  z-index:2;
}
.sidebar{
  /* top: 55px; */
  position: fixed;
  background-color: #1d325f;
  height: 100%;
  width: 200px;
  float: left;
  z-index:1;
}
.main-content {
  top: 55px;
  background-color: rgb(255, 255, 255);
  height: 100%;
  width: calc(100vw - 200px);
  margin-left: 200px;
}
.open-content{
  top: 55px;
  overflow-y:scroll;
  height: calc(100vh - 55px);
  width: calc(100% - 200px);
}
/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>

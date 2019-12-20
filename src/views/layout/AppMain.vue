<template>
  <div>
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
// import { Navbar, Sidebar, AppMain } from 'views/layout'
export default {
  data: function() {
    return { }
  },
  mounted(){
//    console.log(this.$route.name);
//    console.log(this.key);
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style>

</style>

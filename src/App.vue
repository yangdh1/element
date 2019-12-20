<template>
  <div id="app">

    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return { }
  }
}
</script>

<style  scoped lang="scss" rel="stylesheet/scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  height: 100%;
}
</style>

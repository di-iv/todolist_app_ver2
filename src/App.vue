<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">List of notes</router-link>
      <router-link to="/new">New note</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Noto Sans HK', sans-serif;
  text-align: center;
  color: #34322a;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #aaaaaa;
    text-decoration: none;
    margin: 0 10px;

    &.router-link-exact-active {
      color: #34322a;
    }
  }
}
</style>
